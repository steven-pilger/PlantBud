import Container from './container'
import Hamburger from './hamburger'

export default function Header({ open, setOpen }) {
  return (
    <Container>
      <header className="pt-5">
        <section id="hamburger">
          <Hamburger open={open} setOpen={setOpen} />
        </section>
      </header>
    </Container>
  )
}
