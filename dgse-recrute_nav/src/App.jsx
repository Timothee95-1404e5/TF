
import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Mission from './components/Mission';
import RecrutementForm from './components/RecrutementForm';
import Footer from './components/Footer';
import PageTransitionWrapper from './components/PageTransitionWrapper';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && (
        <PageTransitionWrapper>
          <Navigation />
          <section id="hero"><Hero /></section>
          <section id="mission"><Mission /></section>
          <section id="recrutement"><RecrutementForm /></section>
          <Footer />
        </PageTransitionWrapper>
      )}
    </div>
  );
}

export default App;
