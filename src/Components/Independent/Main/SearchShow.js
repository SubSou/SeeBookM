import SearchFail from './SearchFail';
import SearchSuccess from './SearchSuccess';

const SearchShow = ({ data, isClick }) => {
  return data.length < 1 ? (
    <SearchFail isClick={isClick} />
  ) : (
    <SearchSuccess data={data} />
  );
};

export default SearchShow;
