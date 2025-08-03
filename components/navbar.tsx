"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpRight, Home, Users, Search, User, Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const isMobile = useIsMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (isMobile) {
    return <MobileBottomBar />
  }

  return (
    <>
      <DesktopNavbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <AnimatePresence>
        {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function DesktopNavbar({
  mobileMenuOpen,
  setMobileMenuOpen
}: {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}) {
  return (
    <nav className="fixed top-3 md:top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-3 md:px-6">
      <div className="navbar-glass rounded-full shadow-2xl">
        <div className="flex items-center justify-between px-3 md:px-6 py-2.5 md:py-3">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                FOUNDEV
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:flex items-center gap-8"
          >
            <div className="flex items-center gap-8">
              <Link
                href="#how-it-works"
                className="nav-link text-white/80 hover:text-white text-sm font-medium"
              >
                How It Works
              </Link>
              <Link
                href="/match"
                className="nav-link text-white/80 hover:text-white text-sm font-medium"
              >
                Explore
              </Link>
              <Link
                href="#features"
                className="nav-link text-white/80 hover:text-white text-sm font-medium"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="nav-link text-white/80 hover:text-white text-sm font-medium"
              >
                Community
              </Link>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="hidden lg:block">
              <Link href="/create-profile">
                <Button className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold rounded-full px-6 py-2.5 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 flex items-center gap-2 text-sm">
                  Connect Wallet
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </motion.div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-16 md:top-24 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-sm px-3 md:px-6"
    >
      <div className="navbar-glass rounded-2xl p-6">
        <div className="flex flex-col gap-4">
          <Link 
            href="#how-it-works" 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
          >
            How It Works
          </Link>
          <Link 
            href="/match" 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
          >
            Explore
          </Link>
          <Link 
            href="#features" 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
          >
            Features
          </Link>
          <Link 
            href="#testimonials" 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
          >
            Community
          </Link>
          <div className="pt-4 border-t border-white/10">
            <Link href="/create-profile" onClick={onClose}>
              <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-900 font-semibold rounded-full py-2 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 flex items-center justify-center gap-2">
                Connect Wallet
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MobileBottomBar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-3 mb-3 md:mx-4 md:mb-4">
        <div className="navbar-glass rounded-2xl">
          <div className="flex items-center justify-around px-1 py-2.5 md:py-3">
            <Link href="/" className={`bottom-nav-item flex flex-col items-center gap-1 p-2 min-w-0 flex-1 ${
              isActive("/") ? "bottom-nav-active" : ""
            }`}>
              <Home className={`h-5 w-5 transition-colors ${
                isActive("/") ? "text-cyan-400" : "text-white/80 hover:text-cyan-400"
              }`} />
              <span className={`text-xs truncate ${
                isActive("/") ? "text-cyan-400" : "text-white/60"
              }`}>Home</span>
            </Link>

            <Link href="/match" className={`bottom-nav-item flex flex-col items-center gap-1 p-2 min-w-0 flex-1 ${
              isActive("/match") ? "bottom-nav-active" : ""
            }`}>
              <Search className={`h-5 w-5 transition-colors ${
                isActive("/match") ? "text-cyan-400" : "text-white/80 hover:text-cyan-400"
              }`} />
              <span className={`text-xs truncate ${
                isActive("/match") ? "text-cyan-400" : "text-white/60"
              }`}>Explore</span>
            </Link>

            <Link href="/matches" className={`bottom-nav-item flex flex-col items-center gap-1 p-2 min-w-0 flex-1 ${
              isActive("/matches") ? "bottom-nav-active" : ""
            }`}>
              <Users className={`h-5 w-5 transition-colors ${
                isActive("/matches") ? "text-cyan-400" : "text-white/80 hover:text-cyan-400"
              }`} />
              <span className={`text-xs truncate ${
                isActive("/matches") ? "text-cyan-400" : "text-white/60"
              }`}>Matches</span>
            </Link>

            <Link href="/create-profile" className={`bottom-nav-item flex flex-col items-center gap-1 p-2 min-w-0 flex-1 ${
              isActive("/create-profile") ? "bottom-nav-active" : ""
            }`}>
              <User className={`h-5 w-5 transition-colors ${
                isActive("/create-profile") ? "text-cyan-400" : "text-white/80 hover:text-cyan-400"
              }`} />
              <span className={`text-xs truncate ${
                isActive("/create-profile") ? "text-cyan-400" : "text-white/60"
              }`}>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
