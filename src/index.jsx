import NavBar from './components/Layout/Navbar/Nav'
import Header from './components/Header/Header'
import About from './components/About/About'
import Experience from './components/experience/experience'
import Projects from './components/projects/projects'
import Education from './components/education/education'
import Hire from './components/hire/hire'
import Footer from './components/Layout/Footer/Footer'

function Index () {
  return (
    <>
      <NavBar />
      <Header />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Hire />
      <Footer />
    </>
  )
}

export default Index;