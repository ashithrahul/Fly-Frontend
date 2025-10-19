import styles from './Card.module.css';
import { Image, Shimmer } from 'react-shimmer';


const Card = ({ title, description, imageUrl }) => {
  return (
    <div>
      {imageUrl && (
        <Image
        className={styles.cardImage} 
        src={imageUrl} 
        alt={title}
        fallback={<Shimmer 
          height={300}
          width={400}
          />}
      />
      )}
      <div className={styles.cardContent}>
      <h4 title={title}>{title}</h4>
      <p className={styles.cardDescription} title={description}>
        {description}
      </p>
      </div>
    </div>
  );
};

export default Card;
