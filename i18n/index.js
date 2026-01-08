const en = require("./en/common.json");
const zh = require("./zh/common.json");
const zhHK = require("./zhTW/common.json");

const i18n = {
  translations: {
    en,
    zh,
    "zh-TW": zhHK,
    "zh-HK": zhHK,
    "zh-MO": zhHK,
    "zh-SG": zh,
  },
  lng: "zh-HK",
  defaultLang: "zh-HK",
  fallbackLng: "zh-HK",
  useBrowserDefault: false,
};

module.exports = i18n;