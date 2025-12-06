"use client"

import { BackgroundPaths } from "@/components/ui/background-paths"

export function HeroSection() {
  const scrollToCities = () => {
    document.getElementById("city-filter")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <BackgroundPaths
      title="노마드 리스트"
      buttonText="도시 탐색하기"
      onButtonClick={scrollToCities}
    />
  )
}
