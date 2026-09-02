import { useEffect, useState } from 'react'
import Features from "./Features";
import Footer from "../componants/Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Reviews from "./Reviews";
import Subject from "./Subjects";
import Transform from "./Transform";
import Reveal from './Reveal';

function Home() {
    return (
        <div style={{
            background: '#050816',
            minHeight: '100vh',
            color: 'white',
            overflowX: 'hidden',
            fontFamily: 'Inter, sans-serif',
        }}>
            <Navbar />
            <Reveal>
                <Hero />
            </Reveal>
            <Reveal>
                <Features />
            </Reveal>
            <Reveal>
                <Subject />
            </Reveal>
            <Reveal>
                <Transform />
            </Reveal>
            <Reveal>
                <Reviews />
            </Reveal>
            <Footer />
        </div>
    );
}

export default Home;
