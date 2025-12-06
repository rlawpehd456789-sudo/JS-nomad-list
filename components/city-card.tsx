import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { City } from "@/lib/types"
import { getUnsplashImage } from "@/lib/utils"
import Image from "next/image"

interface CityCardProps {
  city: City
}

export function CityCard({ city }: CityCardProps) {
  // placeholder 이미지인 경우 자동으로 Unsplash 이미지 생성
  const imageUrl = city.image?.includes('placeholder') 
    ? getUnsplashImage(`${city.name},${city.country}`)
    : city.image || "/placeholder.svg"

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <div className="aspect-video relative overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={`${city.name}, ${city.country}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Rank badge */}
          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
            #{city.rank}
          </div>
          {/* Badges */}
          {city.badges.length > 0 && (
            <div className="absolute top-3 right-3 flex gap-2">
              {city.badges.map((badge) => (
                <Badge key={badge} className={badge === "Popular" ? "bg-accent" : "bg-secondary"}>
                  {badge === "Hidden Gem" ? "💎 " : ""}
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* City name */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-balance">{city.name}</h3>
          <p className="text-sm text-muted-foreground">{city.country}</p>
        </div>

        {/* Weather info */}
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            {city.weather.icon} {city.weather.temperature}°C
          </span>
          {city.weather.aqi && (
            <span className="flex items-center gap-1 text-muted-foreground">😷 AQI {city.weather.aqi}</span>
          )}
        </div>

        {/* Key metrics */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">💵 월 생활비</span>
            <span className="font-semibold">${city.cost.monthly.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">📡 인터넷 속도</span>
            <span className="font-semibold">{city.internet.speed} Mbps</span>
          </div>
          {city.scores.overall && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">⭐ 종합 점수</span>
              <span className="font-semibold">{city.scores.overall.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Link to nomads.com */}
        <a
          href={city.nomadsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors text-sm font-medium"
        >
          자세히 보기 →
        </a>
      </CardContent>
    </Card>
  )
}
