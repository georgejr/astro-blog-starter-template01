// Build-time OG/share-image generator. Renders a 1200x630 branded card per
// article with satori (HTML -> SVG) and resvg (SVG -> PNG). When an article
// declares `ogStat`, the card highlights that figure as a mini-infographic;
// otherwise it is a clean title card. Runs only at build time (static output).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';

const fontBold = readFileSync(join(process.cwd(), 'src/assets/fonts/Poppins-Bold.ttf'));
const fontRegular = readFileSync(join(process.cwd(), 'src/assets/fonts/Poppins-Regular.ttf'));

export interface OgStat {
  value: string;
  label: string;
}

export interface OgOptions {
  title: string;
  category: string;
  stat?: OgStat;
}

// satori-html's parser does NOT decode HTML entities, so escaping would show
// the entity literally. Instead just drop angle brackets (which would be
// misparsed as tags); '&', quotes, dashes, etc. render fine as literal text.
function esc(value: string): string {
  return value.replace(/[<>]/g, '');
}

export async function renderOgPng({ title, category, stat }: OgOptions): Promise<Buffer> {
  const titleSize = title.length > 78 ? 46 : title.length > 52 ? 54 : 64;

  // satori-html escapes interpolations when used as a tagged template, so we
  // build one plain HTML string (normal string concatenation, no escaping of
  // markup) and hand it to html() as a function call. Only the dynamic text
  // is entity-escaped; the HTML parser decodes those entities back to text.
  const footer = stat
    ? `<div style="display:flex;align-items:flex-end;justify-content:space-between;width:100%;">
         <div style="display:flex;flex-direction:column;">
           <div style="font-size:96px;font-weight:700;color:#ffd23f;line-height:1;">${esc(stat.value)}</div>
           <div style="font-size:30px;margin-top:12px;color:#d7f5e8;">${esc(stat.label)}</div>
         </div>
         <div style="font-size:26px;color:#bfe9d6;">sunmetriclab.com</div>
       </div>`
    : `<div style="display:flex;justify-content:flex-end;width:100%;">
         <div style="font-size:26px;color:#bfe9d6;">sunmetriclab.com</div>
       </div>`;

  const markupString = `
    <div style="height:100%;width:100%;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(135deg,#0b3d2e 0%,#12694a 55%,#1f9d6b 100%);padding:64px;font-family:Poppins;color:#ffffff;">
      <div style="display:flex;align-items:center;justify-content:space-between;width:100%;">
        <div style="display:flex;align-items:center;">
          <div style="width:56px;height:56px;border-radius:14px;background:#ffd23f;display:flex;align-items:center;justify-content:center;font-size:34px;color:#0b3d2e;font-weight:700;">S</div>
          <div style="margin-left:20px;font-size:34px;font-weight:700;">SunMetricLab</div>
        </div>
        <div style="font-size:24px;font-weight:700;background:rgba(255,255,255,0.16);padding:10px 24px;border-radius:999px;">${esc(category)}</div>
      </div>
      <div style="display:flex;">
        <div style="font-size:${titleSize}px;font-weight:700;line-height:1.12;">${esc(title)}</div>
      </div>
      ${footer}
    </div>
  `;

  const svg = await satori(html(markupString), {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Poppins', data: fontBold, weight: 700, style: 'normal' },
      { name: 'Poppins', data: fontRegular, weight: 400, style: 'normal' },
    ],
  });

  return Buffer.from(new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng());
}
