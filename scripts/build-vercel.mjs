import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, '.vercel/output');
const functionRoot = resolve(output, 'functions/index.func');

rmSync(output, { force: true, recursive: true });
mkdirSync(functionRoot, { recursive: true });

cpSync(resolve(root, 'dist/client'), resolve(output, 'static'), { recursive: true });
cpSync(resolve(root, 'dist/server'), resolve(functionRoot, 'server'), { recursive: true });

writeFileSync(resolve(functionRoot, 'package.json'), JSON.stringify({ type: 'module' }, null, 2));
writeFileSync(resolve(functionRoot, '.vc-config.json'), JSON.stringify({
  runtime: 'nodejs22.x',
  handler: 'handler.cjs',
  launcherType: 'Nodejs',
  shouldAddHelpers: true,
  supportsResponseStreaming: false,
  maxDuration: 30,
}, null, 2));

writeFileSync(resolve(functionRoot, 'handler.cjs'), `
const { Readable } = require('node:stream');

let runtime;

function requestUrl(req) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const incoming = new URL(req.url || '/', \`${'${protocol}'}://${'${host}'}\`);
  const originalPath = incoming.searchParams.get('__path');

  if (originalPath) {
    incoming.pathname = originalPath;
    incoming.searchParams.delete('__path');
  }

  return incoming;
}

module.exports = async function handler(req, res) {
  try {
    runtime ||= import('./server/index.js');
    const { default: worker } = await runtime;
    const method = req.method || 'GET';
    const init = { method, headers: new Headers() };

    for (const [name, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) value.forEach((item) => init.headers.append(name, item));
      else if (value != null) init.headers.set(name, String(value));
    }

    if (method !== 'GET' && method !== 'HEAD') {
      init.body = Readable.toWeb(req);
      init.duplex = 'half';
    }

    const response = await worker.fetch(new Request(requestUrl(req), init), {}, {
      waitUntil(promise) {
        Promise.resolve(promise).catch(console.error);
      },
    });

    res.statusCode = response.status;
    response.headers.forEach((value, name) => res.setHeader(name, value));

    if (!response.body || method === 'HEAD') {
      res.end();
      return;
    }

    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end('Something went wrong while loading Claraverse.');
  }
};
`);

writeFileSync(resolve(output, 'config.json'), JSON.stringify({
  version: 3,
  routes: [
    { handle: 'filesystem' },
    { src: '/(.*)', dest: '/index?__path=/$1' },
  ],
}, null, 2));

console.log('Created Vercel Build Output API bundle.');
