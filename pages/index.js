import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from 'react'

export default function Home() {

  const [page, setPage] = useState('Home')

  const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="logo">
          Metahattan
        </div>
        <div className="links">
          <button onClick={() => setPage('Home')}>Home</button>
          <button onClick={() => setPage('Virtual Property Deeds')}>Virtual Property Deeds</button>
          <button onClick={() => setPage('Experience Metahattan')}>Experience Metahattan</button>
          <button onClick={() => setPage('About Us')}>About Us</button>
          <button onClick={() => setPage('Monetize')}>Monetize</button>
          <button onClick={() => setPage('Our Team')}>Our Team</button>
          <button onClick={() => setPage('Press And Twitter')}>Press & Twitter</button>
          <button onClick={() => setPage('Partnerships')}>Partnerships</button>
          <button onClick={() => setPage('FAQs')}>FAQs</button>
          <button onClick={() => setPage('Contact')}>Contact</button>
        </div>
      </div>
    );
  };

  const Home = () => {
    return (
      <div className="home">
      </div>
    )
  }
  const VirtualPropertyDeeds = () => {
    return (
      <div className="page virtual-property-deeds">
        <iframe width='100%' height='100%' src="https://experience.arcgis.com/experience/215881dc1f594f6da5e566efbdc5d7d4/"></iframe>
      </div>
    )
  }
  const ExperienceMetahattan = () => {
    return (
      <div className="page experience-metahattan">
      </div>
    )
  }
  const AboutUs = () => {
    return (
      <div className="page about-us">
      </div>
    )
  }
  const Monetize = () => {
    return (
      <div className="page monetize">
      </div>
    )
  }
  const OurTeam = () => {
    return (
      <div className="page our-team">
      </div>
    )
  }
  const PressAndTwitter = () => {
    return (
      <div className="page press-and-twitter">
      </div>
    )
  }
  const Partnerships = () => {
    return (
      <div className="page partnerships">
      </div>
    )
  }
  const FAQs = () => {
    return (
      <div className="page faqs">
      </div>
    )
  }
  const Contact = () => {
    return (
      <div className="page contact">
      </div>
    )
  }

  const HandleMainContent = () => {
    if (page === 'Home') {
      return <Home />
    } else if (page === 'Virtual Property Deeds') {
      return <VirtualPropertyDeeds />
    } else if (page === 'Experience Metahattan') {
      return <ExperienceMetahattan />
    } else if (page === 'About Us') {
      return <AboutUs />
    } else if (page === 'Monetize') {
      return <Monetize />
    } else if (page === 'Our Team') {
      return <OurTeam />
    } else if (page === 'Press And Twitter') {
      return <PressAndTwitter />
    } else if (page === 'Partnerships') {
      return <Partnerships />
    } else if (page === 'FAQs') {
      return <FAQs />
    } else if (page === 'Contact') {
      return <Contact />
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
      <HandleMainContent />

    </div>
  )
}
