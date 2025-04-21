const https = require('https');
const fs = require('fs');
const path = require('path');

// Luxury interior design image collection from Unsplash
const images = {
  'project1-main.jpg': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
  'project1-kitchen.jpg': 'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7',
  'project1-bedroom.jpg': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
  'project1-pool.jpg': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7',
  
  'project2-main.jpg': 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f',
  'project2-room.jpg': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
  'project2-spa.jpg': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
  'project2-restaurant.jpg': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
};

const downloadImage = (url, filename) => {
  const filepath = path.join(__dirname, '../public/portfolio', filename);
  
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
};

async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  try {
    await Promise.all(
      Object.entries(images).map(([filename, url]) => 
        downloadImage(url, filename)
      )
    );
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
    process.exit(1);
  }
}

downloadAllImages(); 