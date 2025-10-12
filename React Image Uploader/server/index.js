import ImageKit from '@imagekit/nodejs';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile() {
  try {
    const result = await client.files.upload({
      file: fs.createReadStream('./gg.png'),
      fileName: 'girl.png',
      tags: ['tag1', 'tag2'],
    });
    // After upload, generate transformed URL for the uploaded image
    const transformedUrl = client.helper.buildSrc({
      urlEndpoint: 'https://ik.imagekit.io/hrishik89',
      src: result.filePath, // Using the uploaded file's path
      transformation: [
        { width: 400, height: 300, crop: 'maintain_ratio', quality: 80, format: 'webp' },
      ],
    });
    console.log('Transformed URL:', transformedUrl);
  } catch (error) {
    console.log('Upload error:', error);
  }
}
uploadFile();
