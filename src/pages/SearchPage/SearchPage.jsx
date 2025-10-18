import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchList } from '../../store/Actions/search.actions';
import Card from '../../components/Card/Card';
import styles from './SearchPage.module.css';
import NoData from '../../components/NoData/NoData';

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const dispatch = useDispatch();
  const {
    data: { results, pagination, totalPages },
    isLoading,
    error,
  } = useSelector(state => state.searchResults);

  useEffect(() => {
    dispatch(fetchSearchList({ searchTerm: query, currentPage }));
  }, [currentPage, dispatch, query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>

      <Pagination
        pagination={pagination}
        currentPage={currentPage}
        totalNumberPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error occurred while fetching results.</p>}
      {results && results.length === 0 && (
        <NoData message="No results found." />
      )}
      {results && (
        <div className={styles.cardContainer}>
          {results.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              imageUrl={item.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
