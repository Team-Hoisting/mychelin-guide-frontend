import styled from 'styled-components';

import { AiOutlineArrowRight } from 'react-icons/ai';

const SearchContainer = styled.form`
  display: flex;
  margin: 30px auto 0;
  width: 500px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #ababab;
  box-shadow: 2px 2px 2px #ababab;
`;

const SearchBar = styled.input.attrs({ type: 'text' })`
  margin: auto 20px;
  width: 100%;
  border: none;

  :focus {
    outline: none;
  }
`;

const SearchIconContainer = styled.button`
  position: relative;
  margin: auto 5px;
  background-color: #d21312;
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  outline: 0;
  border-color: #d21312;
`;

const SearchIcon = styled(AiOutlineArrowRight)`
  color: #fff;
`;

const InputSearch = ({
  placeholder = '맛집을 검색해보세요!',
  defaultValue = '',
  inputRef = null,
  submitHandler = () => {},
}) => (
  <SearchContainer
    onSubmit={e => {
      e.preventDefault();
      submitHandler();
    }}>
    <SearchBar placeholder={placeholder} defaultValue={defaultValue} ref={inputRef} />
    <SearchIconContainer>
      <SearchIcon />
    </SearchIconContainer>
  </SearchContainer>
);

export default InputSearch;
