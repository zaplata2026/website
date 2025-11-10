import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Калкулатор Заплата 2026 България';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '40px',
        }}
      >
        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#18181b',
            border: '2px solid #27272a',
            borderRadius: '24px',
            padding: '60px 80px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#fafafa',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            Калкулатор Заплата 2026
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 36,
              color: '#a1a1aa',
              marginBottom: '40px',
              display: 'flex',
            }}
          >
            Какво ми взима държавата?
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '40px',
              fontSize: 24,
              color: '#71717a',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#22c55e', marginRight: '8px' }}>✓</span>
              Данъци и осигуровки
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#22c55e', marginRight: '8px' }}>✓</span>
              Годишна загуба
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#22c55e', marginRight: '8px' }}>✓</span>
              Актуални ставки
            </div>
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 28,
              color: '#52525b',
              marginTop: '50px',
              display: 'flex',
            }}
          >
            zaplata2026.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
