import styles from './Card.module.css';

const Card = ({ title, description, imageUrl }) => {
  return (
    <div>
      {imageUrl && (
        <img className={styles.cardImage} src={imageUrl} alt={title} />
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
