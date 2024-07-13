import React from 'react';
import NavBar from '../../components/layout/navbar/nav'
import Header from '../../components/header/header'
import About from '../../components/about/about'
import Experience from '../../components/experience/experience'
import Projects from '../../components/projects/projects'
import Education from '../../components/education/education'
import Hire from '../../components/hire/hire'
import Footer from '../../components/layout/footer/footer'

const Home = () => {
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

export default Home;
