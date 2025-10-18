const DropDown = ({ data, onClick, key }) => {

    return (
        <div>
            {data && (
                <ul>
                    {data.map((item, index) => (
                        <li key={index[key]} onClick={() => onClick(item)}>
                            {key ? item[key] : item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropDown;