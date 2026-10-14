import { ImageResponse } from 'next/og';

export const alt = 'Claraverse — Your Shopify store. Working better.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '62px 76px', background: '#faf7f1', color: '#292b26' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 32, letterSpacing: '-1.7px' }}>Claraverse</span><span style={{ fontSize: 15, color: '#85796c' }}>YOUR ONGOING SHOPIFY TEAM</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 82, letterSpacing: '-4px', lineHeight: 1.12 }}><span>Your Shopify store.</span><span style={{ color: '#a66e55' }}>Working better.</span></div>
      <div style={{ display: 'flex', borderTop: '1px solid #dddcd2', paddingTop: 25, fontSize: 17, color: '#70736b' }}>Development · Optimization · Management</div>
    </div>,
    size,
  );
}
