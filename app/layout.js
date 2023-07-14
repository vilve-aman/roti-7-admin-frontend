import { AppContextProvider } from "@/context/AppContext.js";
import { RouteContextProvider } from "@/context/routeContext";
import './globals.css'
import { Inter, Kanit } from 'next/font/google'
import Head from 'next/head'





const inter = Inter({ subsets: ['latin'] })
const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300']
})

export const metadata = {
  title: 'Admin',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <AppContextProvider>
        <RouteContextProvider>
        <body className={kanit.className} style={{ height: "100%" }}>{children}</body>
        </RouteContextProvider>
      </AppContextProvider>
    </html>
  )
}
