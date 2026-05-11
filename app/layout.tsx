import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hiring Bias Word Scanner – Detect Biased Language in Job Descriptions',
  description: 'Scan job postings for gender-biased, ageist, and exclusionary language with instant suggestions. Used by HR managers, recruiters, and startup founders.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script defer src="https://umami.microtool.dev/script.js" data-website-id="17f68566-abb4-4f24-896e-05c38d2d2b77"></script>
      </head>
      <body className="bg-[#0d1117] text-[#c9d1d9] min-h-screen">{children}</body>
    </html>
  )
}
