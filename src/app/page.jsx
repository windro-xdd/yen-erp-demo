import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PortalsSection from '../components/landing/PortalsSection';

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <PortalsSection />
                <FeaturesSection />
            </main>
            <Footer />
        </>
    );
}
