'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();


  useEffect(()=>{
    router.push('/app');
  })
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
