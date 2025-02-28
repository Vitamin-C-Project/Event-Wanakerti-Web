import { useState, useEffect } from "react";
import Nav from "./(components)/nav";
import Hero from "./(components)/hero";
import LineUp from "./(components)/line-up";
import Video from "./(components)/video";
import Ticket from "./(components)/ticket";
import Sponsor from "./(components)/sponsor";
import Footer from "./(components)/footer";

import "./App.css";
import ContactUs from "./(components)/contact/contact-us";

function App() {
  return (
    <div className="font-manrope">
      {/* Fixed Navigation */}
      <Nav />

      {/* Hero Section */}
      <Hero />

      {/* Lineup Section */}
      <LineUp />

      {/* Video Section */}
      <Video />

      {/* Tickets Section */}
      <Ticket />

      {/* Sponsors Section */}
      <Sponsor />

      {/* Contact Section */}
      <ContactUs />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
