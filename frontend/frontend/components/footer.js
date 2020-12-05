import Container from './container'
import GitHub from './github'
import LinkedIn from './linkedin'
import Twitter from './twitter'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="flex flex-col lg:flex-row items-center mb-2 lg:justify-between">
          <div className="flex flex-col lg:flex-row lg:justify-start items-center">
            <h3 className="text-2xl mt-2 font-bold tracking-tighter leading-tight text-center mb-2 ">
              Connect with me on:
            </h3>
            <div className="flex flex-row justify-center lg:justify-start items-center lg:pl-4 lg:w-1/2">
              <a
                href="https://www.linkedin.com/in/steven-pilger/"
                className="mx-3 py-3"
              >
                <LinkedIn />
              </a>
              <a href="https://twitter.com/steven_pilger" className="mx-3 py-3">
                <Twitter />
              </a>
              <a href="https://github.com/steven-pilger" className="mx-3 py-3">
                <GitHub />
              </a>
            </div>
          </div>
          <div className="flex flex-row">
            <h3 className="text-xl mt-2 mr-6 font-semibold tracking-tighter leading-tight text-center mb-2 ">
              <a href="#">Impressum</a>
            </h3>
            <h3 className="text-xl mt-2 font-semibold tracking-tighter leading-tight text-center mb-2 ">
              <a href="#">Contact</a>
            </h3>
          </div>
        </div>
      </Container>
    </footer>
  )
}
