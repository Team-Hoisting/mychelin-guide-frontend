import React from 'react';
import styled from 'styled-components';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BiMoon, BiSun } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom/dist/index';
import userState from '../../recoil/atoms/userState';
import { logout } from '../../api/auth';
import Responsive from './Responsive';

const Container = styled.div`
  position: fixed;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 9999;
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

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  right: 60px;
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

const SearchIconContainer = styled.div`
  background-color: #d21312;
  position: relative;
  cursor: pointer;
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

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const isDark = false;
  // const user = false;
  console.log('[Header]', user);

  return (
    <>
      <Container>
        <Wrapper>
          <div>
            <Link to="/">
              <LogoImage src="../public/mychelin-guide-logo-light.png" alt="mychelin guide logo" to="/main"></LogoImage>
            </Link>
          </div>
          <SearchContainer>
            <SearchBar placeholder="맛집을 검색해보세요!" />
            <SearchIconContainer>
              <SearchIcon />
            </SearchIconContainer>
          </SearchContainer>
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
    </>
  );
};

export default Header;
