import { Inter } from 'next/font/google'
import '@/app/ui/globals.css'
import Navbar from './ui/navbar/Navbar'
import Footer from './ui/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OleVasa Hub',
  description: 'Ole Miss Ole Vasa Club Site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
