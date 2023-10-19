import * as path from 'path';
import { expect, test } from '@playwright/test';
import { build, getHrefByEntryName } from '@scripts/shared';
import { pluginSwc } from '@rsbuild/plugin-swc';

test('should run top level await correctly when using SWC', async ({
  page,
}) => {
  const builder = await build({
    cwd: __dirname,
    entry: {
      index: path.resolve(__dirname, './src/index.ts'),
    },
    plugins: [pluginSwc()],
    runServer: true,
  });

  await page.goto(getHrefByEntryName('index', builder.port));

  expect(await page.evaluate('window.foo')).toEqual('hello');

  builder.close();
});