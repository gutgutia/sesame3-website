import satori from 'satori';
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load a font (we'll use a system font or embed one)
const fontData = readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf');
const fontBoldData = readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf');

async function generateImage() {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          padding: '24px',
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
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
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
                    padding: '20px 24px',
                    borderBottom: '1px solid #f0f0f0',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', alignItems: 'center', gap: '12px' },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: {
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#e8f5f3',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                              },
                              children: '📋',
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
                                    style: { fontSize: '16px', fontWeight: 600, color: '#1a1a1a' },
                                    children: 'Your Profile',
                                  },
                                },
                                {
                                  type: 'div',
                                  props: {
                                    style: { fontSize: '13px', color: '#12756A' },
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
                        style: { display: 'flex', gap: '20px' },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
                              children: [
                                { type: 'div', props: { style: { fontSize: '18px', fontWeight: 700, color: '#12756A' }, children: '8' } },
                                { type: 'div', props: { style: { fontSize: '10px', color: '#888', textTransform: 'uppercase' }, children: 'Activities' } },
                              ],
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
                              children: [
                                { type: 'div', props: { style: { fontSize: '18px', fontWeight: 700, color: '#12756A' }, children: '5' } },
                                { type: 'div', props: { style: { fontSize: '10px', color: '#888', textTransform: 'uppercase' }, children: 'Awards' } },
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
                  style: { display: 'flex', flexDirection: 'column', padding: '20px 24px', gap: '20px' },
                  children: [
                    // Awards Section
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', flexDirection: 'column', gap: '12px' },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '8px' },
                              children: [
                                { type: 'span', props: { style: { fontSize: '14px' }, children: '🏆' } },
                                { type: 'span', props: { style: { fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }, children: 'Awards & Honors' } },
                              ],
                            },
                          },
                          // Award item 1
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '10px' },
                              children: [
                                { type: 'div', props: { style: { width: '36px', height: '36px', backgroundColor: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }, children: '🥇' } },
                                {
                                  type: 'div',
                                  props: {
                                    style: { display: 'flex', flexDirection: 'column', flex: 1 },
                                    children: [
                                      { type: 'div', props: { style: { fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }, children: 'USAMO Qualifier' } },
                                      { type: 'div', props: { style: { fontSize: '12px', color: '#666' }, children: 'Top 250 nationally · Junior year' } },
                                    ],
                                  },
                                },
                                { type: 'div', props: { style: { padding: '3px 8px', backgroundColor: '#fef3c7', color: '#92400e', fontSize: '11px', fontWeight: 500, borderRadius: '4px' }, children: 'National' } },
                              ],
                            },
                          },
                          // Award item 2
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '10px' },
                              children: [
                                { type: 'div', props: { style: { width: '36px', height: '36px', backgroundColor: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }, children: '🔬' } },
                                {
                                  type: 'div',
                                  props: {
                                    style: { display: 'flex', flexDirection: 'column', flex: 1 },
                                    children: [
                                      { type: 'div', props: { style: { fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }, children: 'Science Olympiad — 2nd Place' } },
                                      { type: 'div', props: { style: { fontSize: '12px', color: '#666' }, children: 'State championship · Chemistry' } },
                                    ],
                                  },
                                },
                                { type: 'div', props: { style: { padding: '3px 8px', backgroundColor: '#e8f5f3', color: '#12756A', fontSize: '11px', fontWeight: 500, borderRadius: '4px' }, children: 'State' } },
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
                        style: { display: 'flex', flexDirection: 'column', gap: '12px' },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '8px' },
                              children: [
                                { type: 'span', props: { style: { fontSize: '14px' }, children: '⭐' } },
                                { type: 'span', props: { style: { fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }, children: 'Activities & Leadership' } },
                              ],
                            },
                          },
                          // Activity item 1
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '10px' },
                              children: [
                                { type: 'div', props: { style: { width: '36px', height: '36px', backgroundColor: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }, children: '🤖' } },
                                {
                                  type: 'div',
                                  props: {
                                    style: { display: 'flex', flexDirection: 'column', flex: 1 },
                                    children: [
                                      { type: 'div', props: { style: { fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }, children: 'Robotics Club President' } },
                                      { type: 'div', props: { style: { fontSize: '12px', color: '#666' }, children: '4 years · 15 hrs/week' } },
                                    ],
                                  },
                                },
                                { type: 'div', props: { style: { padding: '3px 8px', backgroundColor: '#ede9fe', color: '#6b21a8', fontSize: '11px', fontWeight: 500, borderRadius: '4px' }, children: 'Leadership' } },
                              ],
                            },
                          },
                          // Activity item 2
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '10px' },
                              children: [
                                { type: 'div', props: { style: { width: '36px', height: '36px', backgroundColor: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }, children: '📰' } },
                                {
                                  type: 'div',
                                  props: {
                                    style: { display: 'flex', flexDirection: 'column', flex: 1 },
                                    children: [
                                      { type: 'div', props: { style: { fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }, children: 'School Newspaper Editor' } },
                                      { type: 'div', props: { style: { fontSize: '12px', color: '#666' }, children: '3 years · Op-ed section' } },
                                    ],
                                  },
                                },
                                { type: 'div', props: { style: { padding: '3px 8px', backgroundColor: '#ede9fe', color: '#6b21a8', fontSize: '11px', fontWeight: 500, borderRadius: '4px' }, children: 'Leadership' } },
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
      width: 520,
      height: 520,
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

  // Convert SVG to PNG using sharp
  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  const outputPath = join(__dirname, '../public/assets/feature-profile.png');
  writeFileSync(outputPath, pngBuffer);
  console.log('Image generated:', outputPath);
}

generateImage().catch(console.error);
