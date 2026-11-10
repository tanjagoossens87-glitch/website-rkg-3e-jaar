import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Layout from '../../src/layouts/Layout.astro';

test('gebruikt de opgegeven paginatitel', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Layout, {
    props: { title: 'Voorbeeldoefening' },
  });

  expect(html).toContain('<title>Voorbeeldoefening</title>');
});
