// components/Navbar.js
import Link from 'next/link';
import styles from './Navbar.module.css'; // Estilos CSS

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoText}>MyLogo</Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/materials">Material</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/orders">Order</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
