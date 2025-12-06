"use client"

import { useState, useMemo } from "react"
import { HeroSection } from "@/components/hero-section"
import { ContinentFilter } from "@/components/continent-filter"
import { CityGrid } from "@/components/city-grid"
import { Footer } from "@/components/footer"
import type { City, Continent } from "@/lib/types"
import citiesData from "@/lib/cities-data.json"

export default function HomePage() {
  const [selectedContinent, setSelectedContinent] = useState<Continent>("All")
  const cities = citiesData as City[]

  const filteredCities = useMemo(() => {
    if (selectedContinent === "All") {
      return cities
    }
    return cities.filter((city) => city.continent === selectedContinent)
  }, [selectedContinent, cities])

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ContinentFilter onFilterChange={setSelectedContinent} cityCount={filteredCities.length} />
      <CityGrid cities={filteredCities} />
      <Footer />
    </main>
  )
}
