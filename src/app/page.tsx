
import styles from "./page.module.css";

import Hero from "./components/home/Hero";

import Cards from "./components/home/Cards";

import ContactForm from "./components/home/ContactForm";



import Info from "./components/home/Info";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
       
      <Hero />

      <Info />

      <Cards />

      <ContactForm />
    

      </div>
    </main>
  );
}
