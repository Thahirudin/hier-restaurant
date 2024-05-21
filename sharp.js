const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

// Daftar ekstensi file gambar yang didukung oleh sharp
const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif', '.svg'];

// Membuat direktori tujuan jika belum ada
if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
}

fs.readdirSync(target).forEach(image => {
    const ext = path.extname(image).toLowerCase();

    // Hanya memproses file dengan ekstensi yang valid
    if (validExtensions.includes(ext)) {
        // Mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
        sharp(`${target}/${image}`)
            .resize(800)
            .toFile(path.resolve(destination, `${path.parse(image).name}-large${ext}`), (err, info) => {
                if (err) {
                    console.error(`Error processing ${image} to large size:`, err.message);
                } else {
                    console.log(`Successfully processed ${image} to large size:`, info);
                }
            });

        // Mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
        sharp(`${target}/${image}`)
            .resize(480)
            .toFile(path.resolve(destination, `${path.parse(image).name}-small${ext}`), (err, info) => {
                if (err) {
                    console.error(`Error processing ${image} to small size:`, err.message);
                } else {
                    console.log(`Successfully processed ${image} to small size:`, info);
                }
            });
    } else {
        console.warn(`Unsupported file format: ${image}`);
    }
});
