const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUlSRCtUbnMwMHVoWXA0SVV2bmN5YTBLckF4VTF0VXFjQWlxQkhOdHVGZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFI2L1BYdlJaSWVUZ25lcUVXcGRYWEtQTDRmZnprOXBiTkJXQlBVYStoOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSnpPUlIyL0N6dk1mclMyaEp0VW9XMWVpUmRLcTVqdngrdklqWEN0ZjJzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5K05ocXhHcUhQOU41UmlaTXlDN3kyWWczOEkyai9QK1NSczFxNFhjU1FZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhEaEZVbEozSXI3TGJXaTIyckRZeWlVMUNEVXlERzRCRFJFNGZvYVp2bG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdSMjByT1B5blVac2txOE9XM0cySE5rZVRWZVhNQUF0SUx5dEJmYWw4MUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU90cUZqNnY1ZmRCNGtBYlV2TTBzRmVJWld5bHdrbWRickM0eFhJN2gzUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidTh2blpsVnFLaisvS1BsQS8wMW1VeHhZOWVPdTc3TE9xdEo2QnVRVTBsbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJhYjhHQm43YzAxRDRGSDB4elZ3aW1Ja09TZ0RVVjlzUlJXVG5FdzZQS2ZlVGJoZkhNMG5pUWVtdlRyV3RRV2dMWVZBci9NRDBHVGdqR1ZWcTNJRUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE3LCJhZHZTZWNyZXRLZXkiOiJOK294QjhXanRlbDdVMVVTaGFZeFE5OGZIQzMwSnR1N2hhZ0ttV2hRSUlzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJuSUVBNkgwQ1RnMks0MnBUMHZmenpnIiwicGhvbmVJZCI6IjEwY2E5NzhlLTg3NjctNGRmMi1iNTE2LWEzYTEyYzk3YTNiYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6KzBqRUltU20xWkdiemNqaTcyOTZiTkJxSE09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTjRjZm5wak9jUlcrQXd3S0M3VkhRMXo2Nk9zPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNWSFJRNEtSIiwibWUiOnsiaWQiOiIyNjA5Njc4MzgxNDQ6NzRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tMQTdwZ0JFT3o4ckxnR0dCSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ind5UWVURjJTSE16b2NUVXBDTmMzOGJoYkxlbjU1SnFEaHpLT01VRDdaeUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ild2THYzSG0rd3JyK0F5b1pkZlkxNlk3eWhIMm9jTFhMaExQV0lXRmdVcmRRUksvamw2c2diTXQrV014SDFRS3NRRndXR29ZREhyNVJnbmhMeFE3TUJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJBeHZkL01TeXoreTltSkQweHFFSmZlanlJcmVFOEpqNFFLbW9tR1B0UVd6MlJYNjBaUTRDRHo5UHlNSEgrUm1BNU9WdXEzSTAvTnBXZmZUQ1N0RE5EZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MDk2NzgzODE0NDo3NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjTWtIa3hka2h6TTZIRTFLUWpYTi9HNFd5M3ArZVNhZzRjeWpqRkErMmNnIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4NzkwMTM3fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "JAVA BOY MR2K TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "MR2K TECH",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'JAVA BOY MR2K TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
