import styles from './NoData.module.css';
import { Link } from 'react-router-dom';

const NoData = ({ message = 'No data available' }) => {
  return (
    <div className={styles.noData}>
      <p>{message}</p>
      <Link to="/" className={styles.homeLink}>
        Go to Home
      </Link>
    </div>
  );
};

export default NoData;
