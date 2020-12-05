import Link from 'next/link'

function buttonize(handlerFn) {
  return {
    role: 'button',
    onClick: handlerFn,
    onKeyDown: (event) => {
      if (event.keycode === 13) handlerFn(event)
    },
  }
}

export default function Menu({ open, setOpen }) {
  return (
    <div
      id="menu"
      style={{ transform: open ? 'translateY(0)' : 'translateY(-100%)' }}
      className="absolute top-0 left-0 h-screen w-screen bg-red-50 flex flex-col justify-center text-center font-bold text-6xl transition-transform duration-700"
    >
      <Link href="/">
        <a {...buttonize(() => setOpen(!open))}>Home</a>
      </Link>
      <Link href="/highlights">
        <a {...buttonize(() => setOpen(!open))}>Highlights</a>
      </Link>
      <Link href="/blog">
        <a {...buttonize(() => setOpen(!open))}>Blog</a>
      </Link>
      <Link href="/projects">
        <a {...buttonize(() => setOpen(!open))}>Projects</a>
      </Link>
    </div>
  )
}
