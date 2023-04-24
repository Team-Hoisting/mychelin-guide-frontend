import React from 'react';
import styled from 'styled-components';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiMoon, BiSun } from 'react-icons/bi';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, searchInputState } from '../../recoil/atoms';
import { logout } from '../../api/auth';
import Responsive from './Responsive';

const Container = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 10;
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoImage = styled.img`
  width: 150px;
  cursor: pointer;
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
`;

const SearchBar = styled.input`
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

const LightModeIcon = styled(BiSun)`
  font-size: 30px;
  color: black;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const DarkModeIcon = styled(BiMoon)`
  font-size: 25px;
  color: black;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const ConfigsContainer = styled.div`
  width: 10rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-style: italic;
`;

const SignInOutButton = styled.button`
  font-style: italic;
  background-color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const setSearchInput = useSetRecoilState(searchInputState);
  const searchBarRef = React.useRef(null);
  const navigate = useNavigate();

  const isDark = false;

  const { pathname } = useLocation();
  const { id } = useParams();
  const searchBarStatus = pathname === '/' || pathname === `/store/${id}`;

  console.log('[Header]', user);

  const applySearchResult = e => {
    e.preventDefault();

    const searchedContent = searchBarRef.current.value.trim();

    if (!searchedContent) return;
    if (pathname !== '/') navigate('/');

    setSearchInput(searchedContent);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <div>
            <Link to="/">
              <LogoImage
                src="../public/images/mychelin-guide-logo-light.png"
                alt="마이슐랭 가이드 로고"
                to="/"></LogoImage>
            </Link>
          </div>
          {searchBarStatus && (
            <SearchForm onSubmit={e => applySearchResult(e)}>
              <SearchBar
                placeholder="맛집을 검색해보세요!"
                ref={searchBarRef}
                // onChange={e => setSearchInput(e.target.value)}
              />
              <SearchButton>
                <SearchIcon />
              </SearchButton>
            </SearchForm>
          )}
          <ConfigsContainer>
            <Link to={user ? '/user' : '/signin'}>MY</Link>
            {user ? (
              <SignInOutButton
                onClick={async () => {
                  await logout();

                  setUser(null);
                }}>
                SIGN OUT
              </SignInOutButton>
            ) : (
              <Link to="/signin">
                <SignInOutButton>SIGN IN</SignInOutButton>
              </Link>
            )}
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </ConfigsContainer>
        </Wrapper>
      </Container>
      <Spacer />
    </>
  );
};

export default Header;
