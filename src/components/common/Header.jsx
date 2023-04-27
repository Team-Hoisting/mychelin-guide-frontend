import React from 'react';
import styled from 'styled-components';
import { BiMoon, BiSun } from 'react-icons/bi';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, searchInputState, categoryState } from '../../recoil/atoms';
import { logout } from '../../api/auth';
import Responsive from './Responsive';
import { SearchBar } from './index';
import { useTheme } from '../../hooks/index';

const Container = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 10;
  background-color: var(--bg-secondary-color);
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

const LightModeIcon = styled(BiSun)`
  font-size: 30px;
  color: #fff;
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

  background: none;
  color: var(--font-color);
`;

const RegisterButton = styled.button`
  background: none;
  border: none;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const setSearchInput = useSetRecoilState(searchInputState);
  const setCategoryState = useSetRecoilState(categoryState);
  const searchBarRef = React.useRef(null);

  // const isDark = false;
  const [theme, toggleTheme] = useTheme();
  const handleThemeIconClick = () => {
    toggleTheme();
  };
  console.log('theme: ', theme);

  const { pathname } = useLocation();
  const { id } = useParams();
  const searchBarStatus = pathname === '/' || pathname === `/store/${id}`;

  return (
    <>
      <Container>
        <Wrapper>
          <div>
            <Link to="/">
              <LogoImage
                src={`/images/mychelin-guide-logo-${theme}.png`}
                alt="마이슐랭 가이드 로고"
                onClick={() => {
                  setSearchInput('');
                  searchBarRef.current.value = '';

                  setCategoryState('AL00');
                }}
              />
            </Link>
          </div>
          {searchBarStatus && <SearchBar hasDropdown inputRef={searchBarRef} />}
          <ConfigsContainer>
            {/* <RegisterButton>당신의 최애 식당을 등록해보세요!</RegisterButton> */}
            <Link to={user ? `/profile/${user.nickname}` : '/signin'}>MY</Link>
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

            {theme === 'dark' ? (
              <LightModeIcon onClick={handleThemeIconClick} />
            ) : (
              <DarkModeIcon onClick={handleThemeIconClick} />
            )}
          </ConfigsContainer>
        </Wrapper>
      </Container>
      <Spacer />
    </>
  );
};

export default Header;
