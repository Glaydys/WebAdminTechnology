import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Benefit from '../components/Benefit';
import Category from '../components/Category';
import category_details from '../components/category_details';

function HomePage() {
  return (
    <div>
      <Navbar />
   <Header/>
   <Category/>
   <category_details/>
      <Benefit />
      <Footer />
    </div>
  );
}

export default HomePage;
