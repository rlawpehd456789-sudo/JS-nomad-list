import { CityCard } from "./city-card"
import type { City } from "@/lib/types"

interface CityGridProps {
  cities: City[]
}

export function CityGrid({ cities }: CityGridProps) {
  if (cities.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-xl text-muted-foreground">해당 대륙에 등록된 도시가 없습니다.</p>
      </div>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </section>
  )
}
