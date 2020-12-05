export default function Menu({ open }) {
  return (
    <div
      id="menu"
      style={{ transform: open ? 'translateY(0)' : 'translateY(-100%)' }}
      className="absolute top-0 left-0 h-screen w-screen bg-red-50 flex flex-col justify-center text-center font-bold text-6xl transition-transform duration-700"
    >
      <a href="/">Home</a>
      <a href="/">Highlights</a>
      <a href="/">Blog</a>
      <a href="/">Projects</a>
    </div>
  )
}
