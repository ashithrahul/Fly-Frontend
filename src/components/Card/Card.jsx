import styles from './Card.module.css';

const Card = ({title, description, imageUrl}) => {
    return <div className="card">
        {imageUrl && <img className={styles.cardImage} src={imageUrl} alt={title} />}
        <h2>{title}</h2>
        <p>{description}</p>
    </div>;
    }   

    export default Card;