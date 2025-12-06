#!/usr/bin/env node

/**
 * cities-data.json의 모든 도시 이미지를 Unsplash URL로 자동 업데이트하는 스크립트
 * 
 * 사용법:
 *   node scripts/update-unsplash-images.js
 *   또는
 *   npm run update-images
 */

const fs = require('fs');
const path = require('path');

const CITIES_DATA_PATH = path.join(__dirname, '../lib/cities-data.json');
const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 400;

/**
 * Unsplash Source API URL 생성
 * @param {string} cityName - 도시 이름
 * @param {string} country - 국가 이름
 * @returns {string} Unsplash 이미지 URL
 */
function getUnsplashImageUrl(cityName, country) {
  // 도시 이름과 국가를 조합하여 검색 키워드 생성
  const query = `${cityName},${country}`;
  return `https://source.unsplash.com/${IMAGE_WIDTH}x${IMAGE_HEIGHT}/?${encodeURIComponent(query)}`;
}

/**
 * cities-data.json을 읽어서 모든 도시의 이미지를 Unsplash URL로 업데이트
 */
function updateCityImages() {
  try {
    // cities-data.json 읽기
    const data = fs.readFileSync(CITIES_DATA_PATH, 'utf8');
    const cities = JSON.parse(data);

    console.log(`📸 ${cities.length}개 도시의 이미지를 Unsplash로 업데이트 중...\n`);

    let updatedCount = 0;
    let skippedCount = 0;

    // 각 도시의 이미지 업데이트
    const updatedCities = cities.map((city, index) => {
      // 이미 Unsplash URL이거나 로컬 이미지가 있는 경우 스킵 (선택사항)
      const isLocalImage = city.image.startsWith('/city/');
      const isAlreadyUnsplash = city.image.includes('unsplash.com');
      
      if (isLocalImage && !isAlreadyUnsplash) {
        // 로컬 이미지가 있으면 유지 (도쿄 같은 경우)
        console.log(`⏭️  ${city.name} (${city.country}): 로컬 이미지 유지 - ${city.image}`);
        skippedCount++;
        return city;
      }

      // Unsplash URL 생성
      const unsplashUrl = getUnsplashImageUrl(city.name, city.country);
      const updatedCity = {
        ...city,
        image: unsplashUrl
      };

      console.log(`✅ ${city.name} (${city.country}): ${unsplashUrl}`);
      updatedCount++;

      return updatedCity;
    });

    // 업데이트된 데이터를 파일에 저장
    fs.writeFileSync(
      CITIES_DATA_PATH,
      JSON.stringify(updatedCities, null, 2) + '\n',
      'utf8'
    );

    console.log(`\n✨ 완료! ${updatedCount}개 도시 업데이트, ${skippedCount}개 도시 스킵`);
    console.log(`📁 파일 저장 위치: ${CITIES_DATA_PATH}`);

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
updateCityImages();

