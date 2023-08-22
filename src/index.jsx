import NavBar from './components/layout/navbar/nav'
import Header from './components/header/header'
import About from './components/about/about'
import Experience from './components/experience/experience'
import Contact from './components/contact/contact'
import Footer from './components/layout/footer/footer'

function Index () {
  return (
    <>
      <NavBar />
      <Header />
      <About />
      <Experience />
      <Contact />
      <Footer />
    </>
  )
}

export default Index;