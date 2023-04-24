import React from 'react';
import styled from 'styled-components';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { fetchSearchedStores } from '../../api/stores';
import useDebounce from '../../hooks/useDebounce';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Container = styled.div`
  position: relative;
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
`;

const Bar = styled.input`
  width: 500px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #ababab;
  padding: 15px;
  :focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  background-color: #d21312;
  position: relative;
  right: 35px;
  top: 5px;
  padding: 7px;
  height: 30px;
  width: 30px;
  border-radius: 30px;
`;

const SearchIcon = styled(AiOutlineArrowRight)`
  color: #fff;
`;

const Dropdown = styled.ul`
  list-style-type: none;
  padding: 5px;
  display: flex;
  width: 500px;
  max-height: 350px;
  flex-direction: column;
  position: absolute;
  top: 30px;
  border: 1px solid #ababab;
  border-radius: 15px;
  background-color: #fff;
  overflow-y: scroll;
`;

const DropdownResult = styled.li`
  padding: 10px;
  font-size: 18px;
  border-bottom: 0.5px solid #e8e8e8;

  :hover {
    color: var(--primary-color);
  }
`;

const SearchBar = ({ submitHandler = () => {}, placeholder = '맛집을 검색해보세요!', refName }) => {
  const [dropdownStores, setDropdownStores] = React.useState([]);
  const [renderDropdown, setRenderDropdown] = React.useState(false);
  const dropdownRef = useOnClickOutside(() => setRenderDropdown(false));

  const handleUserSearch = async e => {
    const userSearch = e.target.value.trim();

    if (!userSearch) {
      setRenderDropdown(false);
      return;
    }

    const toDisplay = await fetchSearchedStores(userSearch);
    if (toDisplay.length) setRenderDropdown(true);

    setDropdownStores(toDisplay);
  };

  const debouncedSearchHandler = useDebounce(handleUserSearch, 330);

  const handleRefocus = e => {
    if (e.target.value.trim()) debouncedSearchHandler(e);
  };

  return (
    <Container>
      <SearchForm onSubmit={submitHandler}>
        <Bar placeholder={placeholder} ref={refName} onChange={debouncedSearchHandler} onFocus={handleRefocus} />
        <SearchButton>
          <SearchIcon />
        </SearchButton>
      </SearchForm>
      {renderDropdown && (
        <Dropdown ref={dropdownRef}>
          {dropdownStores.map(({ storeName, storeId }) => (
            <DropdownResult key={storeName}>
              <Link to={`/store/${storeId}`}>
                <div>{storeName}</div>
              </Link>
            </DropdownResult>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

export default SearchBar;
