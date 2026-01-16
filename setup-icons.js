import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'assets', 'icons');
const destDir = path.join(__dirname, 'public', 'assets', 'icons');

try {
  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.log('Source icons directory not found. Icons are already in public/assets/icons - skipping setup.');
    process.exit(0);
  }

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copy all files from source to destination
  fs.readdirSync(sourceDir).forEach(file => {
    const sourceFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);
    
    if (fs.statSync(sourceFile).isFile()) {
      fs.copyFileSync(sourceFile, destFile);
      console.log(`Copied: ${file}`);
    }
  });

  console.log('Icons setup complete!');
} catch (error) {
  console.error('Error setting up icons:', error.message);
  process.exit(1);
}
