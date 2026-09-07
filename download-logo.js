import fs from 'fs';
import https from 'https';

const url = "https://lh3.googleusercontent.com/aida/ADBb0ugBrQrvLho_R6FjOoZ0ooWr06AWhPhAC1kcomBqecPvcUWPux3R_jIQOwCC2mkvNz7caNVV2HgBtxdRwtIF0RUrvS46nYS6jZh80tW-vPMvjQqnJfxYFn5gia7mOOKdt23MN7jgOs77P_pezTAmWVgkAMCLjrpg9HhQ_WA8VIXHOqO0dAq7Z0KNs2-cmNxxcNvXF5fSF4N0wyTJJsxca7-Ro-xEVMD-uIh7co-F8HwJiOLwo1YAIBc5bFbVje7fF0fs_69tP-1fpg";

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
};

https.get(url, options, (res) => {
  if (res.statusCode === 200) {
    const file = fs.createWriteStream('./public/logo.png');
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded logo.png successfully');
    });
  } else if (res.statusCode === 301 || res.statusCode === 302) {
    // Handle redirect
    console.log(`Redirected to ${res.headers.location}`);
    // Recurse or follow redirect
    https.get(res.headers.location, options, (res2) => {
      if (res2.statusCode === 200) {
        const file = fs.createWriteStream('./public/logo.png');
        res2.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Downloaded logo.png from redirected URL');
        });
      } else {
        console.error('Failed to download from redirect: ' + res2.statusCode);
      }
    });
  } else {
    console.error('Failed to download: ' + res.statusCode);
  }
}).on('error', (err) => {
  console.error('Error: ' + err.message);
});

