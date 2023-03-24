export const metadata = {
  title: 'Algo Trading V0',
  description: 'Powered by Alphaca API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
