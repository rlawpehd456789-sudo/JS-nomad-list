#!/usr/bin/env node

/**
 * 모든 도시의 Unsplash 이미지를 다운로드하여 public/city/ 폴더에 저장하는 스크립트
 * 
 * 사용법:
 *   node scripts/download-unsplash-images.js
 *   또는
 *   npm run download-images
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CITIES_DATA_PATH = path.join(__dirname, '../lib/cities-data.json');
const CITY_IMAGES_DIR = path.join(__dirname, '../public/city');
const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 400;

// city 폴더가 없으면 생성
if (!fs.existsSync(CITY_IMAGES_DIR)) {
  fs.mkdirSync(CITY_IMAGES_DIR, { recursive: true });
}

/**
 * Unsplash Source API URL 생성 (대안: Picsum Photos 사용)
 * @param {string} cityName - 도시 이름
 * @param {string} country - 국가 이름
 * @param {number} seed - 시드 값 (일관된 이미지를 위해)
 * @returns {string} 이미지 URL
 */
function getUnsplashImageUrl(cityName, country, seed = null) {
  // Unsplash Source API는 불안정할 수 있으므로, Picsum Photos를 대안으로 사용
  // seed를 사용하여 일관된 이미지 제공
  if (seed === null) {
    // 도시 이름과 국가를 기반으로 시드 생성
    seed = cityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) +
           country.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }
  
  // Picsum Photos 사용 (더 안정적)
  return `https://picsum.photos/seed/${seed}/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`;
  
  // 원래 Unsplash Source API (선택사항)
  // const query = `${cityName},${country}`;
  // return `https://source.unsplash.com/${IMAGE_WIDTH}x${IMAGE_HEIGHT}/?${encodeURIComponent(query)}`;
}

/**
 * 파일명을 안전하게 생성 (특수문자 제거)
 */
function sanitizeFileName(name) {
  return name
    .replace(/[^a-zA-Z0-9가-힣\s-]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .toLowerCase();
}

/**
 * 이미지 다운로드 함수 (재시도 로직 포함)
 */
function downloadImage(url, filePath, retries = 3) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    };

    const attemptDownload = (attempt = 1) => {
      protocol.get(url, options, (response) => {
        // 리다이렉트 처리
        if (response.statusCode === 301 || response.statusCode === 302) {
          return downloadImage(response.headers.location, filePath, retries)
            .then(resolve)
            .catch(reject);
        }

        // 503 에러인 경우 재시도
        if (response.statusCode === 503 && attempt < retries) {
          console.log(`   ⚠️  서버 일시적 오류 (503), ${attempt + 1}초 후 재시도...`);
          return setTimeout(() => {
            attemptDownload(attempt + 1);
          }, (attempt + 1) * 1000);
        }

        if (response.statusCode !== 200) {
          reject(new Error(`이미지 다운로드 실패: ${response.statusCode}`));
          return;
        }

        // Content-Type 확인
        const contentType = response.headers['content-type'];
        let extension = 'jpg'; // 기본값
        
        if (contentType) {
          if (contentType.includes('jpeg') || contentType.includes('jpg')) {
            extension = 'jpg';
          } else if (contentType.includes('png')) {
            extension = 'png';
          } else if (contentType.includes('webp')) {
            extension = 'webp';
          }
        }

        // 확장자가 없으면 추가
        let finalFilePath = filePath;
        if (!filePath.match(/\.(jpg|jpeg|png|webp)$/i)) {
          finalFilePath = `${filePath}.${extension}`;
        }

        const fileStream = fs.createWriteStream(finalFilePath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          resolve(finalFilePath);
        });

        fileStream.on('error', (err) => {
          fs.unlink(finalFilePath, () => {}); // 실패한 파일 삭제
          if (attempt < retries) {
            console.log(`   ⚠️  파일 쓰기 오류, ${attempt + 1}초 후 재시도...`);
            setTimeout(() => {
              attemptDownload(attempt + 1);
            }, (attempt + 1) * 1000);
          } else {
            reject(err);
          }
        });
      }).on('error', (err) => {
        if (attempt < retries) {
          console.log(`   ⚠️  연결 오류, ${attempt + 1}초 후 재시도...`);
          setTimeout(() => {
            attemptDownload(attempt + 1);
          }, (attempt + 1) * 1000);
        } else {
          reject(err);
        }
      });
    };

    attemptDownload(1);
  });
}

/**
 * 모든 도시의 이미지를 다운로드
 */
async function downloadAllCityImages() {
  try {
    // cities-data.json 읽기
    const data = fs.readFileSync(CITIES_DATA_PATH, 'utf8');
    const cities = JSON.parse(data);

    console.log(`📸 ${cities.length}개 도시의 이미지를 다운로드 중...\n`);

    const results = {
      success: [],
      skipped: [],
      failed: []
    };

    // 각 도시의 이미지 다운로드
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const cityId = city.id;
      const cityName = city.name;
      const country = city.country;

      // 이미 로컬 이미지가 있는 경우 스킵 (선택사항)
      const existingImage = city.image?.startsWith('/city/');
      if (existingImage && !city.image.includes('placeholder')) {
        console.log(`⏭️  [${i + 1}/${cities.length}] ${cityName} (${country}): 이미 로컬 이미지 존재 - ${city.image}`);
        results.skipped.push({ city: cityName, reason: '이미 로컬 이미지 존재' });
        continue;
      }

      try {
        // 파일명 생성
        const fileName = sanitizeFileName(`${cityName}-${country}`);
        const filePath = path.join(CITY_IMAGES_DIR, `${fileName}.jpg`);

        // Unsplash URL 생성
        const unsplashUrl = getUnsplashImageUrl(cityName, country);

        console.log(`⬇️  [${i + 1}/${cities.length}] ${cityName} (${country}) 다운로드 중...`);

        // 이미지 다운로드
        await downloadImage(unsplashUrl, filePath);

        // 상대 경로 생성
        const relativePath = `/city/${path.basename(filePath)}`;

        // cities-data.json 업데이트
        city.image = relativePath;

        console.log(`✅ ${cityName} (${country}): ${relativePath}`);
        results.success.push({ city: cityName, path: relativePath });

        // API 제한을 피하기 위해 지연 (Unsplash Source API는 느릴 수 있음)
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`❌ ${cityName} (${country}): ${error.message}`);
        results.failed.push({ city: cityName, error: error.message });
      }
    }

    // 업데이트된 데이터를 파일에 저장
    fs.writeFileSync(
      CITIES_DATA_PATH,
      JSON.stringify(cities, null, 2) + '\n',
      'utf8'
    );

    // 결과 요약
    console.log(`\n✨ 다운로드 완료!`);
    console.log(`✅ 성공: ${results.success.length}개`);
    console.log(`⏭️  스킵: ${results.skipped.length}개`);
    console.log(`❌ 실패: ${results.failed.length}개`);
    console.log(`📁 이미지 저장 위치: ${CITY_IMAGES_DIR}`);
    console.log(`📄 JSON 파일 업데이트: ${CITIES_DATA_PATH}`);

    if (results.failed.length > 0) {
      console.log(`\n실패한 도시:`);
      results.failed.forEach(({ city, error }) => {
        console.log(`  - ${city}: ${error}`);
      });
    }

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
downloadAllCityImages();

