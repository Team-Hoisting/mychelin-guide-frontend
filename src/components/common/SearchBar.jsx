import styled from 'styled-components';
import { AiOutlineArrowRight } from 'react-icons/ai';

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

const SearchBar = ({
  submitHandler = () => {},
  changeHandler = () => {},
  placeholder = '맛집을 검색해보세요!',
  refName,
}) => (
  <SearchForm onSubmit={e => submitHandler(e)}>
    <Bar placeholder={placeholder} ref={refName} onChange={e => changeHandler(e)} />
    <SearchButton>
      <SearchIcon />
    </SearchButton>
  </SearchForm>
);

export default SearchBar;
