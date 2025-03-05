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
import Hook from "./(components)/hook";

function App() {
  const { state, handler } = Hook();

  return (
    <div className="font-manrope">
      {/* Fixed Navigation */}
      <Nav />

      {/* Hero Section */}
      <Hero contents={state.contents} />

      {/* Lineup Section */}
      <LineUp contents={state.contents} />

      {/* Video Section */}
      <Video contents={state.contents} />

      {/* Tickets Section */}
      <Ticket contents={state.contents} />

      {/* Sponsors Section */}
      <Sponsor contents={state.contents} />

      {/* Contact Section */}
      <ContactUs contents={state.contents} />

      {/* Footer */}
      <Footer contents={state.contents} />
    </div>
  );
}

export default App;
