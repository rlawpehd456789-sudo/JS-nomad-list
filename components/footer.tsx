"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // 여기에 실제 구독 로직을 추가할 수 있습니다
      console.log("구독 이메일:", email)
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-background via-secondary/5 to-primary/5 border-t border-border">
      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%233B82F6' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              🌍 노마드 리스트
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              디지털 노마드와 원격 근무자를 위한 심플하고 직관적인 도시 탐색 플랫폼입니다.
            </p>
            <p className="text-xs text-muted-foreground/70">
              이 사이트는 Nomads.com 데이터를 기반으로 제작되었습니다.
            </p>
            <div className="pt-4 space-y-2 border-t border-border/50">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span>📧</span>
                <span>
                  <span className="font-medium">이메일:</span>{" "}
                  <a
                    href="mailto:rlawpehd456789@gmail.com"
                    className="text-primary hover:underline"
                  >
                    rlawpehd456789@gmail.com
                  </a>
                </span>
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span>📍</span>
                <span>
                  <span className="font-medium">위치:</span> 대한민국
                </span>
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span>📞</span>
                <span>
                  <span className="font-medium">전화번호:</span>{" "}
                  <a
                    href="tel:+821029292929"
                    className="text-primary hover:underline"
                  >
                    +82-10-2929-2929
                  </a>
                </span>
              </p>
            </div>
            
            {/* 소셜 미디어 버튼 */}
            <div className="pt-4 space-y-3">
              <p className="text-sm font-medium text-foreground">소셜 미디어</p>
              <div className="flex gap-2">
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-lg",
                    "bg-muted/50 hover:bg-gradient-to-br hover:from-[#E4405F] hover:to-[#F56040]",
                    "text-muted-foreground hover:text-white",
                    "border border-border hover:border-transparent",
                    "transition-all duration-200 hover:scale-110",
                    "shadow-sm hover:shadow-md"
                  )}
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-lg",
                    "bg-muted/50 hover:bg-[#1877F2]",
                    "text-muted-foreground hover:text-white",
                    "border border-border hover:border-transparent",
                    "transition-all duration-200 hover:scale-110",
                    "shadow-sm hover:shadow-md"
                  )}
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-lg",
                    "bg-muted/50 hover:bg-[#1DA1F2]",
                    "text-muted-foreground hover:text-white",
                    "border border-border hover:border-transparent",
                    "transition-all duration-200 hover:scale-110",
                    "shadow-sm hover:shadow-md"
                  )}
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-lg",
                    "bg-muted/50 hover:bg-[#0A66C2]",
                    "text-muted-foreground hover:text-white",
                    "border border-border hover:border-transparent",
                    "transition-all duration-200 hover:scale-110",
                    "shadow-sm hover:shadow-md"
                  )}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-lg",
                    "bg-muted/50 hover:bg-[#FF0000]",
                    "text-muted-foreground hover:text-white",
                    "border border-border hover:border-transparent",
                    "transition-all duration-200 hover:scale-110",
                    "shadow-sm hover:shadow-md"
                  )}
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">링크</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://nomads.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Nomads.com</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span>GitHub Repository</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:rlawpehd456789@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span>문의하기</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">법적 고지</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span>이용약관</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span>개인정보처리방침</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <a
                  href="https://nomads.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  <span>데이터 출처</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 구독하기 섹션 */}
        <Card className="bg-card/50 backdrop-blur border-2 border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="pt-6 pb-6 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-2">📧 최신 소식 받아보기</h3>
                <p className="text-sm text-muted-foreground">
                  새로운 도시 정보와 노마드 생활 팁을 이메일로 받아보세요
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-[280px] sm:min-w-[240px]"
                  required
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? "✓ 구독 완료!" : "구독하기"}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 노마드 리스트. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
