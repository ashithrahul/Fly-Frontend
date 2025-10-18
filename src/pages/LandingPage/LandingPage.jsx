import { useState, useEffect, useMemo } from "react";
import Input from "../../components/Input/Input";
import { useLazySearchSuggestionsQuery } from "./../../store/searchApi";
import { debounce } from "./../../utils/common.utils";
import DropDown from "../../components/DropdDown/DropDown";

const LandingPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [triggerSearch, { data: suggestions}] = useLazySearchSuggestionsQuery();

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
    return (
        <div>
            <Input placeholder="Search..." onChange={onChange} value={inputValue}/>
            {suggestions && inputValue && <DropDown data={suggestions} onClick={handleSuggestionClick}  />}
            
        </div>
    );
}

export default LandingPage;