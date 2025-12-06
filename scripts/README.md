# 이미지 자동화 스크립트

이 폴더에는 도시 썸네일 이미지를 자동으로 업데이트하는 스크립트가 포함되어 있습니다.

## 사용 방법

### 방법 1: 스크립트로 JSON 파일 자동 업데이트

모든 도시의 이미지를 Unsplash URL로 일괄 업데이트합니다.

```bash
npm run update-images
```

또는 직접 실행:

```bash
node scripts/update-unsplash-images.js
```

**동작 방식:**
- `cities-data.json`의 모든 도시를 읽습니다
- 각 도시의 `name`과 `country`를 조합하여 Unsplash 검색 쿼리를 생성합니다
- 이미지 URL을 `https://source.unsplash.com/600x400/?{도시이름},{국가}` 형식으로 업데이트합니다
- 로컬 이미지가 있는 경우 (예: `/city/도쿄.jpeg`)는 유지합니다

**예시:**
- Bangkok, Thailand → `https://source.unsplash.com/600x400/?Bangkok,Thailand`
- Lisbon, Portugal → `https://source.unsplash.com/600x400/?Lisbon,Portugal`

### 방법 2: 런타임 자동 생성 (권장)

코드가 자동으로 Unsplash 이미지를 생성합니다. `city-card.tsx` 컴포넌트가 placeholder 이미지를 감지하면 자동으로 Unsplash URL을 생성합니다.

**장점:**
- JSON 파일을 수정할 필요가 없습니다
- 항상 최신 이미지를 사용합니다
- 코드 변경 없이 자동으로 작동합니다

**동작 방식:**
- `city.image`가 `placeholder`를 포함하면 자동으로 Unsplash URL 생성
- 도시 이름과 국가를 조합하여 검색

## Unsplash 이미지 사용 방법

### 직접 URL 사용

`cities-data.json`에서 직접 Unsplash URL을 지정할 수 있습니다:

```json
{
  "name": "Bangkok",
  "country": "Thailand",
  "image": "https://source.unsplash.com/600x400/?bangkok,thailand"
}
```

### 특정 사진 ID 사용

Unsplash에서 원하는 사진을 찾아 ID를 사용할 수 있습니다:

```json
{
  "image": "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=400&fit=crop"
}
```

## 유틸리티 함수

`lib/utils.ts`에 다음 함수들이 포함되어 있습니다:

- `getUnsplashImage(query, width, height)` - 검색어로 Unsplash 이미지 URL 생성
- `getUnsplashImageById(photoId, width, height)` - 사진 ID로 Unsplash 이미지 URL 생성

## 참고사항

- Unsplash Source API는 API 키가 필요 없습니다
- 이미지는 매번 랜덤하게 선택됩니다 (같은 쿼리라도 다른 이미지가 나올 수 있음)
- 특정 이미지를 고정하려면 사진 ID를 사용하세요
- Next.js의 Image 컴포넌트가 Unsplash 도메인을 허용하도록 `next.config.mjs`에 설정되어 있습니다

