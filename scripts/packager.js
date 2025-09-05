const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const zipFileName = `a2-migrator-backend.zip`;
const outputPath = path.join(__dirname, zipFileName);

// Clean up old zip
try {
  fs.unlinkSync(outputPath);
  console.log(`Previous ${zipFileName} removed successfully.`);
} catch {
  console.log(`No previous zip to remove.`);
}

// Create new zip stream
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

// Log result
output.on('close', () => {
  console.log(`${zipFileName} created successfully. Total bytes: ${archive.pointer()}`);
});

// Handle errors
archive.on('error', (err) => { throw err; });

archive.pipe(output);

// Add individual files
archive.file('.env.prod', { name: '.env' });
archive.file('package.json', { name: 'package.json' });
archive.file('package-lock.json', { name: 'package-lock.json' });
archive.file('tsconfig.json', { name: 'tsconfig.json' });

// ✅ Keep `dist/` as-is in the zip
archive.directory('dist/', 'dist');
// archive.file('swagger-public.json', { name: 'dist/swagger-public.json' });
// archive.file('swagger-public.json', { name: 'dist/swagger-admin.json' });

// ✅ Keep `src/static/` as-is in the zip
//archive.directory('src/static/', 'src/static');

// Finalize
archive.finalize();
