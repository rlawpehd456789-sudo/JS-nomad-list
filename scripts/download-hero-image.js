#!/usr/bin/env node

/**
 * Hero 섹션용 이미지를 다운로드하는 스크립트
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_URL = 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1920&h=1080&fit=crop';
const IMAGE_NAME = 'hero-airplane-travel.jpg';

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    console.log(`📥 이미지 다운로드 중: ${url}`);
    
    https.get(url, (response) => {
      // 리다이렉트 처리
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`다운로드 실패: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ 이미지 다운로드 완료: ${filePath}`);
        resolve(filePath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  try {
    // public 폴더 확인
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    const filePath = path.join(PUBLIC_DIR, IMAGE_NAME);
    
    // 이미지 다운로드
    await downloadImage(IMAGE_URL, filePath);
    
    console.log(`\n✨ 완료!`);
    console.log(`📁 파일 위치: ${filePath}`);
    console.log(`📝 hero-section.tsx에서 다음 경로로 사용하세요: /${IMAGE_NAME}`);
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

main();

