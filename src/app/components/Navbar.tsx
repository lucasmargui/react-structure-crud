// components/Navbar.js
import Link from 'next/link';
import styles from './Navbar.module.css'; // Estilos CSS


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbarCustom}`}>
      <div className="container-fluid">
        <button
          data-mdb-collapse-init
          className="navbar-toggler"
          type="button"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon="bars" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <div className={styles.logo}>Logo</div>
          </a>
        </div>

        <div className="d-flex align-items-center">
        <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbarTextWhite}`}>
              <li className="nav-item">
                  <Link className="nav-link" href="/">Home</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" href="/materials">Material</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" href="/orders">Order</Link>
              </li>
          </ul>

          <a className="text-reset me-3" href="#">
          <FontAwesomeIcon icon="user" className={styles.iconWhite} />
          </a>


          <div className="dropdown">
            <a
              data-mdb-dropdown-init
              className="text-reset me-3 dropdown-toggle hidden-arrow"
              href="#"
              role="button"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon="user" className={styles.iconWhite} />
              <span className="badge rounded-pill badge-notification bg-danger">1</span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="#">Some news</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Another news</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Something else here</a>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </nav>

  );
};

export default Navbar;
