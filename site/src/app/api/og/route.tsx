import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Extraction parameters
    const title = searchParams.get('title') || 'Local Disposal Guide';
    const subtitle = searchParams.get('subtitle') || 'DisposalGrid Database';
    const highlight = searchParams.get('highlight') || '';

    // Standard Next.js OG generation using native SVG structures mimicking Uber aesthetics
    return new ImageResponse(
      (
         <div
           style={{
             backgroundColor: '#000000',
             backgroundSize: '150px 150px',
             width: '100%',
             height: '100%',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'flex-start',
             padding: '80px',
             position: 'relative',
             fontFamily: 'Inter, sans-serif'
           }}
         >
           {/* Geometric Pattern Background */}
           <div
             style={{
               position: 'absolute',
               inset: 0,
               backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
               backgroundSize: '40px 40px',
             }}
           />

           {/* Brand Bar */}
           <div
             style={{
               display: 'flex',
               alignItems: 'center',
               position: 'absolute',
               top: '60px',
               left: '80px',
               color: '#FFFFFF'
             }}
           >
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#276EF1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
             </svg>
             <span style={{ fontSize: '32px', fontWeight: 800, marginLeft: '16px', letterSpacing: '-0.03em' }}>
               DisposalGrid
             </span>
           </div>

           {/* Main Content */}
           <div style={{ display: 'flex', flexDirection: 'column', zIndex: 10, marginTop: '40px' }}>
             
             {highlight && (
               <div
                 style={{
                   display: 'flex',
                   background: '#276EF1',
                   color: '#ffffff',
                   padding: '8px 20px',
                   borderRadius: '40px',
                   fontSize: '24px',
                   fontWeight: 700,
                   letterSpacing: '0.05em',
                   textTransform: 'uppercase',
                   marginBottom: '24px',
                   width: 'max-content'
                 }}
               >
                 {highlight}
               </div>
             )}

             <div
               style={{
                 fontSize: '76px',
                 fontWeight: 800,
                 color: 'white',
                 lineHeight: 1.1,
                 letterSpacing: '-0.04em',
                 marginBottom: '20px',
                 maxWidth: '900px'
               }}
             >
               {title}
             </div>

             <div
               style={{
                 fontSize: '36px',
                 fontWeight: 500,
                 color: '#A8A8A8',
                 letterSpacing: '-0.01em',
               }}
             >
               {subtitle}
             </div>
           </div>

           {/* Bottom Trim */}
           <div
             style={{
               position: 'absolute',
               bottom: '0',
               left: '0',
               right: '0',
               height: '8px',
               backgroundColor: '#276EF1',
             }}
           />
         </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
