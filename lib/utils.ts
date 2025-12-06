import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Unsplash 이미지 URL을 생성합니다.
 * @param query - 검색 키워드 (도시 이름 등)
 * @param width - 이미지 너비 (기본값: 600)
 * @param height - 이미지 높이 (기본값: 400)
 * @returns Unsplash 이미지 URL
 */
export function getUnsplashImage(query: string, width: number = 600, height: number = 400): string {
  // Unsplash Source API 사용 (API 키 불필요)
  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}`
}

/**
 * 특정 Unsplash 이미지 ID를 사용합니다.
 * @param photoId - Unsplash 사진 ID
 * @param width - 이미지 너비 (기본값: 600)
 * @param height - 이미지 높이 (기본값: 400)
 * @returns Unsplash 이미지 URL
 */
export function getUnsplashImageById(photoId: string, width: number = 600, height: number = 400): string {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop`
}
