import satori from 'satori';
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load fonts
const fontData = readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf');
const fontBoldData = readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf');

// Lucide icon SVG paths
const icons = {
  clipboard: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z',
  trophy: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0V2Z',
  medal: 'M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15 M11 12 5.12 2.2 M13 12l5.88-9.8 M8 7h8 M12 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 18v-2 M12 14h.01',
  flask: 'M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2 M8.5 2h7 M7 16h10',
  bot: 'M12 8V4H8 M4.93 4.93l4.24 4.24 M2 12h4 M4.93 19.07l4.24-4.24 M12 20v-4 M19.07 19.07l-4.24-4.24 M22 12h-4 M19.07 4.93l-4.24 4.24 M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  newspaper: 'M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2 M18 14h-8 M15 18h-5 M10 6h8v4h-8V6Z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  award: 'M12 15l-3.5 2.1.67-3.9L6 10.3l3.92-.57L12 6l2.08 3.73 3.92.57-2.83 2.9.67 3.9z M8.21 13.89L7 23l5-3 5 3-1.21-9.12',
};

// Helper to create an SVG icon element
function createIcon(pathData, color = '#12756A', size = 16) {
  return {
    type: 'svg',
    props: {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      children: {
        type: 'path',
        props: { d: pathData },
      },
    },
  };
}

async function generateImage() {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          padding: '32px',
          width: '100%',
          height: '100%',
        },
        children: {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            },
            children: [
              // Header
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '24px 28px',
                    borderBottom: '1px solid #f0f0f0',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', alignItems: 'center', gap: '14px' },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: {
                                width: '48px',
                                height: '48px',
                                backgroundColor: '#e8f5f3',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              },
                              children: createIcon(icons.clipboard, '#12756A', 24),
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', flexDirection: 'column' },
                              children: [
                                {
                                  type: 'div',
                                  props: {
                                    style: { fontSize: '18px', fontWeight: 700, color: '#1a1a1a' },
                                    children: 'Your Profile',
                                  },
                                },
                                {
                                  type: 'div',
                                  props: {
                                    style: { fontSize: '14px', color: '#12756A', fontWeight: 500 },
                                    children: 'Everything in one place',
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', gap: '24px' },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
                              children: [
                                { type: 'div', props: { style: { fontSize: '22px', fontWeight: 700, color: '#12756A' }, children: '8' } },
                                { type: 'div', props: { style: { fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }, children: 'Activities' } },
                              ],
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
                              children: [
                                { type: 'div', props: { style: { fontSize: '22px', fontWeight: 700, color: '#12756A' }, children: '5' } },
                                { type: 'div', props: { style: { fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }, children: 'Awards' } },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              // Content
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', padding: '24px 28px', gap: '24px' },
                  children: [
                    // Awards Section
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', flexDirection: 'column', gap: '14px' },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '10px' },
                              children: [
                                createIcon(icons.trophy, '#666', 16),
                                { type: 'span', props: { style: { fontSize: '13px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }, children: 'Awards & Honors' } },
                              ],
                            },
                          },
                          // Award item 1
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', backgroundColor: '#fafafa', borderRadius: '12px' },
                              children: [
                                {
                                  type: 'div',
                                  props: {
                                    style: { width: '42px', height: '42px', backgroundColor: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
                                    children: createIcon(icons.award, '#f59e0b', 22),
                                  },
                                },
                                {
                                  type: 'div',
                                  props: {
                                    style: { display: 'flex', flexDirection: 'column', flex: 1 },
                                    children: [
                                      { type: 'div', props: { style: { fontSize: '15px', fontWeight: 600, color: '#1a1a1a' }, children: 'USAMO Qualifier' } },
                                      { type: 'div', props: { style: { fontSize: '13px', color: '#666' }, children: 'Top 250 nationally · Junior year' } },
                                    ],
                                  },
                                },
                                { type: 'div', props: { style: { padding: '4px 10px', backgroundColor: '#fef3c7', color: '#92400e', fontSize: '12px', fontWeight: 600, borderRadius: '6px' }, children: 'National' } },
                              ],
                            },
                          },
                          // Award item 2
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', backgroundColor: '#fafafa', borderRadius: '12px' },
                              children: [
                                {
                                  type: 'div',
                                  props: {
                                    style: { width: '42px', height: '42px', backgroundColor: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
                                    children: createIcon(icons.flask, '#12756A', 22),
                                  },
                                },
                                {
                                  type: 'div',
                                  props: {
                                    style: { display: 'flex', flexDirection: 'column', flex: 1 },
                                    children: [
                                      { type: 'div', props: { style: { fontSize: '15px', fontWeight: 600, color: '#1a1a1a' }, children: 'Science Olympiad — 2nd Place' } },
                                      { type: 'div', props: { style: { fontSize: '13px', color: '#666' }, children: 'State championship · Chemistry' } },
                                    ],
                                  },
                                },
                                { type: 'div', props: { style: { padding: '4px 10px', backgroundColor: '#e8f5f3', color: '#12756A', fontSize: '12px', fontWeight: 600, borderRadius: '6px' }, children: 'State' } },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    // Activities Section
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', flexDirection: 'column', gap: '14px' },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '10px' },
                              children: [
                                createIcon(icons.star, '#666', 16),
                                { type: 'span', props: { style: { fontSize: '13px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }, children: 'Activities & Leadership' } },
                              ],
                            },
                          },
                          // Activity item 1
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', backgroundColor: '#fafafa', borderRadius: '12px' },
                              children: [
                                {
                                  type: 'div',
                                  props: {
                                    style: { width: '42px', height: '42px', backgroundColor: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
                                    children: createIcon(icons.bot, '#6b21a8', 22),
                                  },
                                },
                                {
                                  type: 'div',
                                  props: {
                                    style: { display: 'flex', flexDirection: 'column', flex: 1 },
                                    children: [
                                      { type: 'div', props: { style: { fontSize: '15px', fontWeight: 600, color: '#1a1a1a' }, children: 'Robotics Club President' } },
                                      { type: 'div', props: { style: { fontSize: '13px', color: '#666' }, children: '4 years · 15 hrs/week' } },
                                    ],
                                  },
                                },
                                { type: 'div', props: { style: { padding: '4px 10px', backgroundColor: '#ede9fe', color: '#6b21a8', fontSize: '12px', fontWeight: 600, borderRadius: '6px' }, children: 'Leadership' } },
                              ],
                            },
                          },
                          // Activity item 2
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', backgroundColor: '#fafafa', borderRadius: '12px' },
                              children: [
                                {
                                  type: 'div',
                                  props: {
                                    style: { width: '42px', height: '42px', backgroundColor: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
                                    children: createIcon(icons.newspaper, '#6b21a8', 22),
                                  },
                                },
                                {
                                  type: 'div',
                                  props: {
                                    style: { display: 'flex', flexDirection: 'column', flex: 1 },
                                    children: [
                                      { type: 'div', props: { style: { fontSize: '15px', fontWeight: 600, color: '#1a1a1a' }, children: 'School Newspaper Editor' } },
                                      { type: 'div', props: { style: { fontSize: '13px', color: '#666' }, children: '3 years · Op-ed section' } },
                                    ],
                                  },
                                },
                                { type: 'div', props: { style: { padding: '4px 10px', backgroundColor: '#ede9fe', color: '#6b21a8', fontSize: '12px', fontWeight: 600, borderRadius: '6px' }, children: 'Leadership' } },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
    {
      width: 600,
      height: 600,
      fonts: [
        {
          name: 'DejaVu Sans',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'DejaVu Sans',
          data: fontBoldData,
          weight: 600,
          style: 'normal',
        },
        {
          name: 'DejaVu Sans',
          data: fontBoldData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  // Convert SVG to PNG using sharp at 2x resolution for retina
  const pngBuffer = await sharp(Buffer.from(svg))
    .resize(1200, 1200) // 2x for high DPI
    .png({ quality: 100 })
    .toBuffer();

  const outputPath = join(__dirname, '../public/assets/feature-profile.png');
  writeFileSync(outputPath, pngBuffer);
  console.log('High-res image generated:', outputPath);
}

generateImage().catch(console.error);
