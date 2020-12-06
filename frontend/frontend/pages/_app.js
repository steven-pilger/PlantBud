import '../styles/index.css'
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Menu from '../components/menu'
import Header from '../components/header'
import Container from '../components/container'
import { getAllPostsForHome } from '../lib/api'

function MyApp({ Component, pageProps, preview }) {
  const [open, setOpen] = useState(false)
  return (
    <Layout preview={preview}>
      <Head>
        <title>stevenpilger.com</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2250%22 fill=%22%23d2c3a2%22></rect><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2280%22>⌨️</text></svg>"
        />
      </Head>

      <Header open={open} setOpen={setOpen} />
      <Container>
        <Component open={open} setOpen={setOpen} {...pageProps} />
      </Container>
      <Menu open={open} setOpen={setOpen} />
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  return {
    props: { preview, allPosts },
  }
}

export default MyApp
