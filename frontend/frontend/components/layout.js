import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="flex flex-col min-h-screen">
        <Alert preview={preview} />
        <main className='flex-grow'>{children}</main>
      <Footer />
      </div>
    </>
  )
}
