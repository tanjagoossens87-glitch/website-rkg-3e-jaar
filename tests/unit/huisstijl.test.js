import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const tokens = JSON.parse(readFileSync(new URL('../../design-system/tokens.json', import.meta.url), 'utf8'));
const css = readFileSync(new URL('../../design-system/tokens.css', import.meta.url), 'utf8');

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map((channel) => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

for (const theme of ['light', 'dark']) {
  const colors = Object.fromEntries(tokens.color.tokens.map((token) => [token.name, token.value[theme]]));
  const pairs = [
    ...['bg', 'surface', 'surface-sunken'].flatMap((background) =>
      ['ink', 'ink-muted', 'forest', 'brand-text'].map((text) => [text, background, 4.5])),
    ['on-primary', 'primary', 4.5], ['on-primary', 'primary-hover', 4.5],
    ['on-brand', 'brand', 4.5], ['ai-text', 'ai-soft', 4.5],
    ['success', 'success-soft', 4.5], ['danger', 'danger-soft', 4.5],
    ['warning', 'warning-soft', 4.5],
    ...['bg', 'surface'].flatMap((background) =>
      ['focus', 'line-strong'].map((color) => [color, background, 3])),
  ];
  for (const [foreground, background, minimum] of pairs) {
    test(`${theme}: ${foreground} op ${background} blijft leesbaar`, () => {
      const values = [luminance(colors[foreground]), luminance(colors[background])].sort((a, b) => a - b);
      expect((values[1] + 0.05) / (values[0] + 0.05)).toBeGreaterThanOrEqual(minimum);
    });
  }

  test(`${theme}: CSS en kleurdata komen overeen`, () => {
    const block = theme === 'light' ? css.split('[data-theme="dark"]')[0] : css.split('[data-theme="dark"]')[1];
    for (const [name, value] of Object.entries(colors)) expect(block).toContain(`--${name}: ${value};`);
  });
}
