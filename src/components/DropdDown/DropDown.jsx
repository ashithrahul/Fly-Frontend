import styles from './DropDown.module.css';
const DropDown = ({ data, onClick, key }) => {
  return (
    <div style={{}}>
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
