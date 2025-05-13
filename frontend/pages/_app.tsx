"use client"

import "../styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { useRouter } from "next/router"
import { getCookie } from "../lib/auth"

function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = getCookie("auth_token")
    setIsAuthenticated(!!token)
  }, [router.pathname])

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <Component {...pageProps} isAuthenticated={isAuthenticated} />
    </Layout>
  )
}

export default MyApp
