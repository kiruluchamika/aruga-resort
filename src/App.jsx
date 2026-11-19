import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { EnquiryProvider } from './context/EnquiryContext.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import FloatingActions from './components/layout/FloatingActions.jsx';
import Hero from './components/sections/Hero.jsx';
import EnquiryBar from './components/sections/EnquiryBar.jsx';
import Welcome from './components/sections/Welcome.jsx';
import Cabanas from './components/sections/Cabanas.jsx';
import BeachfrontLiving from './components/sections/BeachfrontLiving.jsx';
import Facilities from './components/sections/Facilities.jsx';
import Experiences from './components/sections/Experiences.jsx';
import About from './components/sections/About.jsx';
import Gallery from './components/sections/Gallery.jsx';
import Location from './components/sections/Location.jsx';
import Faq from './components/sections/Faq.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <EnquiryProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main" className="flex-grow" tabIndex={-1}>
              <Hero />
              <EnquiryBar />
              <Welcome />
              <Cabanas />
              <BeachfrontLiving />
              <Facilities />
              <Experiences />
              <About />
              <Gallery />
              <Location />
              <Faq />
              <Contact />
            </main>
            <Footer />
            <FloatingActions />
          </div>
        </EnquiryProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
