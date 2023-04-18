import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import userState from '../../recoil/atoms/userState';
import { logout } from '../../api/auth';
import Responsive from './Responsive';
import Button from './Button';

const Container = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 9999;
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = () => {
  const [user, setUser] = useRecoilState(userState);

  console.log('[Header]', user);

  return (
    <>
      <Container>
        <Wrapper>
          <div className="logo">logo</div>
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button
                to="/login"
                onClick={async () => {
                  await logout();
                  setUser(null);
                }}>
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </Container>
      <Spacer />
    </>
  );
};

export default Header;
