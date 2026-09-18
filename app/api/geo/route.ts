export async function GET(request: Request) {
  const country =
    request.headers.get('cf-ipcountry') ??
    request.headers.get('x-vercel-ip-country') ??
    request.headers.get('x-country-code') ??
    null;

  return Response.json(
    { country },
    { headers: { 'Cache-Control': 'private, max-age=3600' } },
  );
}
