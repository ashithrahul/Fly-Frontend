import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useLazySearchSuggestionsQuery } from "./../../store/searchApi";
import { debounce } from "./../../utils/common.utils";
import DropDown from "../../components/DropdDown/DropDown";
import Button from "../../components/Button/Button";

const LandingPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [triggerSearch, { data: suggestions}] = useLazySearchSuggestionsQuery();
    const navigate = useNavigate();


    const onChange = (e) => {
        const query = e.target.value;
        setInputValue(query);
    };

    const debouncedOnChange = useMemo(
        () => debounce((value) => {
            triggerSearch(value);
        }, 300),
        [triggerSearch] 
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