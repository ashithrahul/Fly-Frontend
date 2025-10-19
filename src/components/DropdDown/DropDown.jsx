import styles from './DropDown.module.css';
import useOutsideClick from '../../hooks/useOutSideClick.js';

const DropDown = ({ data, onClick, keyProp, classes={}, onClose, excludeRef }) => {
const dropdownRef = useOutsideClick(() => {
    if (onClose) onClose();
  }, excludeRef);
  return (
    <div className={classes.container} ref={dropdownRef}>
      {data && (
        <div>
          {data.map((item, index) => (
            <div
              className={styles.inputIcon}
              key={`${keyProp ? item[keyProp] : item}-${index}`}
              onClick={() => onClick && onClick(item)}
            >
              {keyProp ? item[keyProp] : item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
