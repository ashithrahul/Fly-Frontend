import styles from './DropDown.module.css';
import useOutsideClick from '../../hooks/useOutSideClick.js';
import classNames from 'classnames';

const DropDown = ({
  data,
  onClick,
  keyProp,
  classes = {},
  onClose,
  excludeRef,
}) => {
  const dropdownRef = useOutsideClick(() => {
    if (onClose) onClose();
  }, excludeRef);
  return (
    <div className={classNames(classes.container, styles.inputIconValue)} ref={dropdownRef}>
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
