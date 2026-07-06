import fs from 'fs';
import path from 'path';

let web3FormsKey = '1708fbae-37fe-498e-a7ad-07c1603159ca';

try {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('NEXT_PUBLIC_WEB3FORMS_KEY=')) {
        const value = trimmed.split('=')[1]?.trim();
        if (value && value !== 'YOUR_ACCESS_KEY_HERE') {
          web3FormsKey = value;
        }
      }
    }
  }
} catch (e) {
  console.error("Error reading .env.local in next.config.mjs:", e);
}

console.log("----------------------------------------");
console.log("Exposing NEXT_PUBLIC_WEB3FORMS_KEY to Client:", web3FormsKey);
console.log("----------------------------------------");

const nextConfig = {
  env: {
    NEXT_PUBLIC_WEB3FORMS_KEY: web3FormsKey,
  },
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ['192.168.1.4'],
  devIndicators: false,
};

export default nextConfig;
