
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer} >
      <div className={styles.card} >
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;