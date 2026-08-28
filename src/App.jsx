import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import Hero from "./pages/RealEstateLanding"
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero/>
          <ContactUs />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}