import React from 'react';
import styled from 'styled-components';
import { BiMoon, BiSun } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, searchInputState, categoryState } from '../../recoil/atoms';
import { logout } from '../../api/auth';
import Responsive from './Responsive';
import { SearchBar } from './index';
import themeState from '../../recoil/atoms/theme';
import { useOnClickOutside } from '../../hooks';

const Container = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 10;
  background-color: var(--bg-secondary-color);
`;

const Wrapper = styled(Responsive)`
  height: 5rem;
  align-items: center;
  ${({ hasSearchBar }) =>
    hasSearchBar
      ? `
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    `
      : `
      display: flex;
      justify-content: space-between;
    `}
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
  font-size: 30px;
  color: #3c3c3c;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 30px;
  color: #3c3c3c;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const ConfigsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  gap: 15px;
  padding-right: 5px;
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
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;

  :hover {
    background-color: #f7f7f7;
  }
`;

const UserDropdown = styled.nav`
  display: ${({ opened }) => (opened ? 'block' : 'none')};
  border: 1px solid #ababab;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  padding: 5px;
  min-height: 10rem;
  width: 12rem;
  top: 105%;
`;

const DropdownButton = styled.div`
  font-style: normal;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;

  :hover {
    background-color: #f7f7f7;
  }
`;

const SignoutButton = styled(DropdownButton)`
  border-top: 1px solid #e0e0e0;
`;

const Spacer = styled.div`
  height: 5rem;
`;

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const setSearchInput = useSetRecoilState(searchInputState);
  const setCategoryState = useSetRecoilState(categoryState);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const searchBarRef = React.useRef(null);
  const [theme, setTheme] = useRecoilState(themeState);
  const navigate = useNavigate();

  React.useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);
  };

  const handleThemeIconClick = () => {
    toggleTheme();
  };

  console.log('theme: ', theme);

  const { pathname } = useLocation();
  const { id } = useParams();
  const hasSearchBar = pathname === '/' || pathname === `/store/${id}`;

  const userDropdownRef = useOnClickOutside(() => setOpenDropdown(false));

  return (
    <>
      <Container>
        <Wrapper hasSearchBar={hasSearchBar}>
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
          {hasSearchBar && <SearchBar hasDropdown inputRef={searchBarRef} />}
          <ConfigsContainer>
            <Link to="/searchmap">
              <RegisterButton>당신만의 맛집을 알려주세요</RegisterButton>
            </Link>
            {theme === 'dark' ? (
              <LightModeIcon onClick={handleThemeIconClick} />
            ) : (
              <DarkModeIcon onClick={handleThemeIconClick} />
            )}
            <UserIcon
              onClick={e => {
                e.stopPropagation();

                if (user) setOpenDropdown(!openDropdown);
                else navigate('/signin');
              }}
            />
            <UserDropdown opened={openDropdown} ref={userDropdownRef}>
              <Link to={`/profile/${user?.nickname}`}>
                <DropdownButton onClick={() => setOpenDropdown(false)}>마이페이지</DropdownButton>
              </Link>
              <Link to="/info">
                <DropdownButton onClick={() => setOpenDropdown(false)}>회원정보 수정</DropdownButton>
              </Link>
              <Link to="/searchmap">
                <DropdownButton onClick={() => setOpenDropdown(false)}>맛집 등록</DropdownButton>
              </Link>
              <SignoutButton
                onClick={async () => {
                  await logout();

                  setUser(null);
                  setOpenDropdown(false);

                  navigate('/');
                }}>
                Sign Out
              </SignoutButton>
            </UserDropdown>
          </ConfigsContainer>
        </Wrapper>
      </Container>
      <Spacer />
    </>
  );
};

export default Header;
