"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function HeroSection() {
  const stats = [
    {
      icon: "📍",
      label: "등록된 도시",
      value: "12개 도시",
    },
    {
      icon: "💰",
      label: "평균 생활비",
      value: "$2,119/월",
    },
    {
      icon: "📡",
      label: "평균 인터넷 속도",
      value: "57 Mbps",
    },
  ]

  const scrollToCities = () => {
    document.getElementById("city-filter")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4 py-20">
      {/* World map pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%233B82F6' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance">🌍 노마드 리스트</h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            전 세계 디지털 노마드를 위한 최고의 도시를 찾아보세요
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 space-y-2">
                <div className="text-4xl">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div>
          <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90" onClick={scrollToCities}>
            도시 탐색하기
          </Button>
        </div>
      </div>
    </section>
  )
}
