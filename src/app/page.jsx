import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main>
                <HeroSection />
                <FeaturesSection />
            </main>
            <Footer />
        </div>
    );
}
