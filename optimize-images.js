import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'src', 'assets');

const tasks = [
  { file: 'TASHKENT-MEDICAL-ACADEMY.webp', width: 600, quality: 75 },
  { file: 'BUKHARA-STATE-MEDICAL-UNIVERSITY.webp', width: 600, quality: 75 },
  { file: 'bgremovedlogo.webp', width: 256, quality: 80 },
  { file: 'andijan1.webp', width: 600, quality: 75 },
  { file: 'bgremovedlogo-small.webp', width: 128, quality: 80 },
  { file: 'fergana.webp', width: 600, quality: 75 },
  { file: 'samarkand-college.webp', width: 600, quality: 75 }
];

async function optimizeImages() {
  for (const task of tasks) {
    const filePath = path.join(assetsDir, task.file);
    const tempPath = path.join(assetsDir, `temp-${task.file}`);

    if (fs.existsSync(filePath)) {
      try {
        console.log(`Optimizing ${task.file}...`);
        const buffer = fs.readFileSync(filePath);
        await sharp(buffer)
          .resize({ width: task.width, withoutEnlargement: true })
          .webp({ quality: task.quality })
          .toFile(tempPath);

        // Replace original
        fs.unlinkSync(filePath); // Delete original
        fs.renameSync(tempPath, filePath); // Move temp to original
        console.log(`Successfully optimized ${task.file}`);
      } catch (err) {
        console.error(`Error optimizing ${task.file}:`, err);
        // cleanup temp if exists
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    } else {
      console.warn(`File not found: ${task.file}`);
    }
  }
}

optimizeImages();
