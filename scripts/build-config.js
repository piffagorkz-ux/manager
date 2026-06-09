const fs = require("fs");
const path = require("path");

const config = {
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
};

const content = `window.APP_CONFIG = ${JSON.stringify(config, null, 2)};\n`;
fs.writeFileSync(path.resolve(__dirname, "../config.js"), content);
console.log("config.js generated");
