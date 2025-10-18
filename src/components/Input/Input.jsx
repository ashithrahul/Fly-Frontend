import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './Input.module.css';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onEnterPress,
  classes,
  icon,
  ...props
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!onEnterPress) return;
    const handleKeyPress = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        console.log('Enter key pressed');
        onEnterPress(event);
      }
    };

    const target = inputRef.current;
    if (target) {
      target.addEventListener('keydown', handleKeyPress);
    }
    return () => {
      if (target) {
        target.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [inputRef, onEnterPress]);

  return (
    <div
      className={classNames(classes['inputContainer'], styles.inputContainer)}
    >
      <input
        name="inputField"
        ref={inputRef}
        className={classNames(classes['input'], styles.input)}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {icon && (
        <div className={classNames(classes['icon'], styles.inputIcon)}>
          {icon}
        </div>
      )}
    </div>
  );
};

export default Input;
