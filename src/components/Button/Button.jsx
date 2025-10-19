import styles from './Button.module.css';

const Button = ({ children, icon, onClick, disabled = false, ...props }) => {
  return (
    <button onClick={onClick} disabled={disabled} {...props}>
      {icon && <span className={styles.btn__icon}>{icon}</span>}
      {children && <span className={styles.btn__text}>{children}</span>}
    </button>
  );
};

export default Button;
