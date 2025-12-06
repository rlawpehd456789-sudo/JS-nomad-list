"use client"

import { useState } from "react"
import { CONTINENTS, type Continent } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ContinentFilterProps {
  onFilterChange: (continent: Continent) => void
  cityCount: number
}

export function ContinentFilter({ onFilterChange, cityCount }: ContinentFilterProps) {
  const [selected, setSelected] = useState<Continent>("All")

  const handleSelect = (continent: Continent) => {
    setSelected(continent)
    onFilterChange(continent)
  }

  return (
    <section
      id="city-filter"
      className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b"
    >
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 py-4 min-w-max">
            {CONTINENTS.map((continent) => (
              <button
                key={continent.value}
                onClick={() => handleSelect(continent.value)}
                className={cn(
                  "px-4 py-3 rounded-lg whitespace-nowrap transition-all duration-300 flex items-center gap-2",
                  "hover:bg-primary/10",
                  selected === continent.value
                    ? "bg-primary text-primary-foreground font-semibold shadow-md"
                    : "bg-muted/50 text-foreground",
                )}
              >
                <span>{continent.emoji}</span>
                <span>{continent.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="pb-3 text-sm text-muted-foreground">
          {selected === "All"
            ? `전체 도시 (${cityCount})`
            : `${CONTINENTS.find((c) => c.value === selected)?.label} 도시 (${cityCount})`}
        </div>
      </div>
    </section>
  )
}
