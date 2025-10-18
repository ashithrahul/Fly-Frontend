const Input = ({ type = 'text', placeholder = '', value, onChange, ...props }) => {

    return (<div className="input__container">     
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>);
};

export default Input;