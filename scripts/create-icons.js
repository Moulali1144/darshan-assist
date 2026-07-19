const fs = require('fs');
const path = require('path');

// Create icons directories
fs.mkdirSync('public/icons', { recursive: true });

const sizes = [16, 32, 48, 128];
sizes.forEach(size => {
  // Create a minimal valid PNG file (1x1 pixel, scaled)
  // Using a simple SVG as placeholder - CRX plugin accepts SVG renamed as PNG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="24" fill="#1A0800"/>
  <circle cx="64" cy="64" r="54" fill="#2D1500"/>
  <circle cx="64" cy="64" r="45" fill="none" stroke="#C8860A" stroke-width="3" opacity="0.6"/>
  <text x="64" y="84" text-anchor="middle" font-size="68" font-family="serif">🙏</text>
  <text x="64" y="118" text-anchor="middle" font-size="12" font-family="Arial,sans-serif" fill="#C8860A" font-weight="bold">DA</text>
</svg>`;
  
  fs.writeFileSync(`public/icons/icon${size}.png`, svg);
  console.log(`Created icon${size}.png (${size}x${size})`);
});

console.log('All icons created!');
