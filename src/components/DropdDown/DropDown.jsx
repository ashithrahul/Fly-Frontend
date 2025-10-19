import { useCallback } from 'react';
import styles from './DropDown.module.css';
import useOutsideClick from '../../hooks/useOutSideClick.js';

const DropDown = ({ 
  data = [], 
  onClick, 
  keyProp, 
  classes = {}, 
  onClose, 
  excludeRef,
  role = 'menu',
  'aria-label': ariaLabel = 'Dropdown menu'
}) => {
  const dropdownRef = useOutsideClick(() => {
    if (onClose) onClose();
  }, excludeRef);

  const handleItemClick = useCallback((item, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (onClick) {
      onClick(item);
    }
  }, [onClick]);

  const handleKeyDown = useCallback((event, item) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleItemClick(item, event);
    }
  }, [handleItemClick]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div 
      className={`${styles.dropdown} ${classes.container || ''}`} 
      ref={dropdownRef}
      role={role}
      aria-label={ariaLabel}
    >
      <div className={styles.dropdownContent}>
        {data.map((item, index) => {
          const displayValue = keyProp ? item[keyProp] : item;
          const itemId = keyProp ? item.id || item[keyProp] : item;
          
          return (
            <div
              key={`dropdown-item-${itemId}-${index}`}
              className={styles.dropdownItem}
              onClick={(event) => handleItemClick(item, event)}
              onKeyDown={(event) => handleKeyDown(event, item)}
              role="menuitem"
              tabIndex={0}
              aria-label={`Select ${displayValue}`}
            >
              <span className={styles.itemText}>
                {displayValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropDown;
