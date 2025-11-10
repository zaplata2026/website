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
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          padding: '60px',
        }}
      >
        {/* Main content container with red accent border */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #1f1f1f 0%, #141414 100%)',
            border: '4px solid #ef4444',
            borderRadius: '32px',
            padding: '70px 90px',
            boxShadow: '0 0 80px rgba(239, 68, 68, 0.4), 0 30px 60px rgba(0, 0, 0, 0.8)',
            width: '100%',
            maxWidth: '1080px',
          }}
        >
          {/* Badge */}
          <div
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontSize: 28,
              fontWeight: 'bold',
              padding: '12px 32px',
              borderRadius: '50px',
              marginBottom: '30px',
              display: 'flex',
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)',
            }}
          >
            НОВИ ДАНЪЦИ 2026
          </div>

          {/* Main Title with red accent */}
          <div
            style={{
              fontSize: 82,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '16px',
              letterSpacing: '-0.03em',
              display: 'flex',
              lineHeight: 1.1,
            }}
          >
            Калкулатор Заплата
          </div>

          {/* Year in bold red */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: '#ef4444',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
              display: 'flex',
              textShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
            }}
          >
            2026
          </div>

          {/* Subtitle with emphasis */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              color: '#fafafa',
              marginBottom: '50px',
              display: 'flex',
              letterSpacing: '-0.01em',
            }}
          >
            Какво ми взима държавата?
          </div>

          {/* Stats/Features in horizontal layout */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '50px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: '#ef4444',
                  display: 'flex',
                }}
              >
                📊
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: '#d1d5db',
                  display: 'flex',
                }}
              >
                Данъци
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: '#ef4444',
                  display: 'flex',
                }}
              >
                💰
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: '#d1d5db',
                  display: 'flex',
                }}
              >
                Осигуровки
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: '#ef4444',
                  display: 'flex',
                }}
              >
                📉
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: '#d1d5db',
                  display: 'flex',
                }}
              >
                Загуба
              </div>
            </div>
          </div>

          {/* URL with red accent */}
          <div
            style={{
              fontSize: 34,
              fontWeight: 'bold',
              color: '#ef4444',
              marginTop: '20px',
              display: 'flex',
              letterSpacing: '0.02em',
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
