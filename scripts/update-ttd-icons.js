const fs = require('fs');
const path = require('path');

const srcIcon = 'C:/Users/sree/.gemini/antigravity/brain/e4c352cd-3bbe-4a6a-9494-0659006ce750/ttd_darshan_icon_1784478842914.png';
const publicDir = 'public/icons';
const storeDir = 'store_assets';

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(storeDir, { recursive: true });

const sizes = [16, 32, 48, 128];
sizes.forEach(size => {
  fs.copyFileSync(srcIcon, path.join(publicDir, `icon${size}.png`));
  console.log(`Updated public/icons/icon${size}.png`);
});

fs.copyFileSync(srcIcon, path.join(storeDir, 'store_icon_512.png'));
console.log('Created store_assets/store_icon_512.png for Chrome Web Store upload');
