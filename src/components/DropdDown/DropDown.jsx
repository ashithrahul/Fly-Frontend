import styles from './DropDown.module.css';
import useOutsideClick from '../../hooks/useOutSideClick.js';

const DropDown = ({ data, onClick, key, classes={}, onClose }) => {
const dropdownRef = useOutsideClick(() => {
    if (onClose) onClose();
  });
  return (
    <div className={classes.container} ref={dropdownRef}>
      {data && (
        <div>
          {data.map((item, index) => (
            <div
              className={styles.inputIcon}
              key={`${key ? item[key] : item}-${index}`}
              onClick={() => onClick(item)}
            >
              {key ? item[key] : item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
