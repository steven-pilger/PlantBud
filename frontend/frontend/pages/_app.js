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
