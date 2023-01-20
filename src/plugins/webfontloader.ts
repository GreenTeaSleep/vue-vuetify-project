/**
 * plugins/webfontloader.ts
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import(
    /* webpackChunkName: "webfontloader" */ "webfontloader"
  );

  webFontLoader.load({
    google: {
      families: ["Noto Sans Thai:400", "sans-serif"],
    },
    custom: {
      families: ["Noto Sans Thai", "sans-serif"],
      urls: ["/src/style/main.css"],
    },
  });
}
