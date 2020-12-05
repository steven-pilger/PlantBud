import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Container from '../components/container'
import Highlight from '../components/highlight'
import Hamburger from '../components/hamburger'
import Menu from '../components/menu'
import { getAllPostsForHome } from '../lib/api'

export default function Index({
  preview,
  // allPosts
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>stevenpilger.com</title>
        </Head>

        <Container>
          <header className="pt-5">
            <section id="hamburger">
              <Hamburger open={menuOpen} setOpen={setMenuOpen} />
            </section>
          </header>
        </Container>

        <Container>
          <main className="mt-10">
            <section
              id="greeting-1"
              className="font-sans text-4xl font-extrabold"
            >
              Hi!
            </section>
            <section id="greeting-2" className="font-sans text-2xl font-medium">
              I'm Steven 👋
            </section>
            <section id="highlights" className="my-20">
              <Highlight />
            </section>
          </main>
        </Container>

        <Menu open={menuOpen} />
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  return {
    props: { preview, allPosts },
  }
}
