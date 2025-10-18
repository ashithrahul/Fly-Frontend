import { useSearchResultQuery } from '../../store/searchApi';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    
    const { data: suggestions, error, isLoading } = useSearchResultQuery(query, {
        skip: !query
    });
    console.log(suggestions);
    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error occurred while fetching results.</p>}
            {suggestions && (
                <ul>
                    {suggestions.map((item, index) => (
                        <li key={index}>{item.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
    }   

export default SearchPage;