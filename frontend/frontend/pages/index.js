import Highlight from '../components/highlight'

export default function Index() {
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)
  return (
    <main className="mt-10">
      <section id="greeting-1" className="text-6xl">
        <span className="font-sans font-extrabold">Hi!</span>
      </section>
      <section id="greeting-2" className="text-3xl">
        <span className="font-sans font-medium">I'm Steven 👋</span>
      </section>
      <section id="highlights">
        <Highlight />
      </section>
    </main>
  )
}
