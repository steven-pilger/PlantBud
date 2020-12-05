import Alert from './alert'
import Footer from './footer'
import Meta from './meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen">
        <Alert preview={preview} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}
