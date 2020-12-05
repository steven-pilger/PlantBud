import Highlight from '../components/highlight'

export default function Index() {
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)
  // const [open, toggleOpen] = useContext(MenuContext)
  return (
    <main className="mt-10">
      <section id="greeting-1" className="font-sans text-6xl font-extrabold">
        Hi!
      </section>
      <section id="greeting-2" className="font-sans text-3xl font-medium">
        I'm Steven 👋
      </section>
      <section id="highlights" className="py-10">
        <Highlight />
      </section>
    </main>
  )
}
