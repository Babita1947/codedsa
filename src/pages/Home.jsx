import React, { useEffect, useState } from 'react'
import Hero from '../components/ui/Hero'
import Feature from '../components/ui/Feature'
import Loading from '@/components/auth/Loading'

const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="pt-6 sm:pt-0 font-sans">
      <Hero />
      <Feature />
    </div>
  )
}

export default Home