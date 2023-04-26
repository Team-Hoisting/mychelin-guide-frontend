import React from 'react';
import styled from 'styled-components';
import { BiMoon, BiSun } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, searchInputState, categoryState } from '../../recoil/atoms';
import { logout } from '../../api/auth';
import Responsive from './Responsive';
import { SearchBar } from './index';

const Container = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 10;
`;

const Wrapper = styled(Responsive)`
  height: 5rem;
  /* background-color: #a1a1a1; */
  /* display: flex;
  justify-content: space-between; */
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const LogoImage = styled.img`
  width: 150px;
  cursor: pointer;
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

const UserIcon = styled(FaUserCircle)`
  font-size: 24px;
  color: black;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const ConfigsContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: end;
  gap: 15px;
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

const RegisterButton = styled.button`
  background: none;
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;

  :hover {
    background-color: #f0f0f0;
  }
`;

const Spacer = styled.div`
  height: 5rem;
`;

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const setSearchInput = useSetRecoilState(searchInputState);
  const setCategoryState = useSetRecoilState(categoryState);
  const searchBarRef = React.useRef(null);

  const isDark = false;

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
                src="/images/mychelin-guide-logo-light.png"
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
            <RegisterButton>당신의 맛집을 알려주세요!</RegisterButton>
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            <UserIcon />
            {/* <Link to={user ? `/profile/${user.nickname}` : '/signin'}>MY</Link>
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
            )} */}
          </ConfigsContainer>
        </Wrapper>
      </Container>
      <Spacer />
    </>
  );
};

export default Header;
