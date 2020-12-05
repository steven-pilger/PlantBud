const SVG = ({ children }) => (
  <svg
    className="w-12"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {children}
  </svg>
)

const HamburgerIcon = ({ open }) => (
  <SVG>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16"
      className="transition-transform duration-500"
      style={{
        transform: open ? 'rotate(45deg)' : 'rotate(0)',
        transformOrigin: '25% 50%',
      }}
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 12h16"
      className={`transition-opacity ${
        open ? 'duration-200' : 'duration-1000'
      }`}
      style={{ opacity: open ? 0 : 1 }}
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 18h16"
      className="transition-transform duration-500"
      style={{
        transform: open ? 'rotate(-45deg)' : 'rotate(0)',
        transformOrigin: '25% 50%',
      }}
    />
  </SVG>
)

export default function Hamburger({ open, setOpen }) {
  return (
    <div className="flex justify-between z-50 sticky">
      <div />
      <button type="button" onClick={() => setOpen(!open)}>
        <HamburgerIcon open={open} />
      </button>
    </div>
  )
}
