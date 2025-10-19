import styles from './Card.module.css';
import { Image, Shimmer } from 'react-shimmer';


const Card = ({ title, description, imageUrl }) => {
  return (
    <div className={styles.cardContainer}>
      {imageUrl && (
        <Image
        src={imageUrl} 
        alt={title}
        fallback={<Shimmer 
          height={230}
          width={330}
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
