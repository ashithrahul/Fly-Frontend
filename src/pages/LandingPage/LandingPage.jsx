import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { debounce } from './../../utils/common.utils';
import DropDown from '../../components/DropdDown/DropDown';
import { fetchSuggestedList } from '../../store/Actions/suggest.actions';
import styles from './LandingPage.module.css';
import { IoIosSearch } from 'react-icons/io';
import Button from '../../components/Button/Button';

const LandingPage = () => {
  const [inputValue, setInputValue] = useState('');
  const { data: suggestions } = useSelector(state => state.suggested);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = e => {
    const query = e.target.value;
    setInputValue(query);
  };

  const debouncedOnChange = useMemo(
    () =>
      debounce(value => {
        dispatch(fetchSuggestedList(value));
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedOnChange(inputValue);
  }, [inputValue, debouncedOnChange]);

  const handleSuggestionClick = suggestion => {
    setInputValue(suggestion);
  };

  const onSearchClick = useCallback(() => {
    if (inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue)}`);
    }
  }, [inputValue, navigate]);

  return (
    <div className={styles.landingPageContainer}>
      <div className={styles.searchBox}>
        <div className={styles.searchContainer}>
          <Input
            onEnterPress={onSearchClick}
            placeholder="Search..."
            onChange={onChange}
            value={inputValue}
            classes={{
              input: styles.Input,
            }}
            icon={
              <Button
                icon={<IoIosSearch size={30} onClick={onSearchClick} />}
              />
            }
          />
        </div>

        {suggestions && inputValue && (
          <DropDown
            classes={{
              container: styles.DropContainer,
            }}
            data={suggestions}
            onClick={handleSuggestionClick}
          />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
