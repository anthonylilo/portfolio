import React from 'react';
import NavBar from '../../components/home/layout/navbar/nav'
import Header from '../../components/home/header/header'
import About from '../../components/home/about/about'
import Experience from '../../components/home/experience/experience'
import Projects from '../../components/home/projects/projects'
import Education from '../../components/home/education/education'
import Hire from '../../components/home/hire/hire'
import Footer from '../../components/home/layout/footer/footer'

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
