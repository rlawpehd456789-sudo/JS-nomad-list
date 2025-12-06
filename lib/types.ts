export interface City {
  id: string
  rank: number
  name: string
  country: string
  continent: string
  weather: {
    icon: string
    temperature: number
    feelsLike: number
    aqi?: number
  }
  cost: {
    monthly: number
    currency: string
  }
  internet: {
    speed: number
  }
  scores: {
    overall?: number
    liked?: number
    safety?: number
  }
  image: string
  badges: string[]
  nomadsUrl: string
}

export type Continent =
  | "All"
  | "North America"
  | "Latin America"
  | "Europe"
  | "Africa"
  | "Middle East"
  | "Asia"
  | "Oceania"

export const CONTINENTS: { label: string; value: Continent; emoji: string }[] = [
  { label: "전체", value: "All", emoji: "✅" },
  { label: "북미", value: "North America", emoji: "🌎" },
  { label: "남미", value: "Latin America", emoji: "💃" },
  { label: "유럽", value: "Europe", emoji: "🇪🇺" },
  { label: "아프리카", value: "Africa", emoji: "🌍" },
  { label: "중동", value: "Middle East", emoji: "🕌" },
  { label: "아시아", value: "Asia", emoji: "⛩️" },
  { label: "오세아니아", value: "Oceania", emoji: "🏄" },
]
