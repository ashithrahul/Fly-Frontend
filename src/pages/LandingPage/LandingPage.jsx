import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { debounce } from "./../../utils/common.utils";
import DropDown from "../../components/DropdDown/DropDown";
import Button from "../../components/Button/Button";
import { fetchSuggestedList } from "../../store/Actions/suggest.actions";

const LandingPage = () => {
    const [inputValue, setInputValue] = useState('');
      const { data: suggestions, loading, error } = useSelector((state) => state.suggested);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onChange = (e) => {
        const query = e.target.value;
        setInputValue(query);
    };

    const debouncedOnChange = useMemo(
        () => debounce((value) => {
            dispatch(fetchSuggestedList(value));
        }, 300),
        [dispatch] 
    );

    useEffect(() => {
        debouncedOnChange(inputValue);
    }, [inputValue, debouncedOnChange]);

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);

    }

    const onSearchClick = useCallback(() => {
        if (inputValue.trim()) {
            navigate(`/search?q=${encodeURIComponent(inputValue)}`);
        }
    }, [inputValue, navigate]);

    return (
        <div>
            <Input placeholder="Search..." onChange={onChange} value={inputValue} />
            <Button onClick={onSearchClick}>Search</Button>
            {suggestions && inputValue && <DropDown data={suggestions} onClick={handleSuggestionClick}  />}
            
        </div>
    );
}

export default LandingPage;