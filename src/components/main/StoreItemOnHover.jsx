import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../common';
import Modal from '../common/Modal';

const Container = styled.main`
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HoverItemIcon = styled.img.attrs({
  src: '/images/fork-spoon.png',
})`
  width: 60px;
  display: none;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  width: 250px;
  display: none;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const RoundedButton = styled(Button)`
  width: 200px;
  height: 44px;
  margin: 6px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
`;

const StoreItemOnHover = ({ storeId }) => (
  <Container>
    <HoverItemIcon />
    <ButtonContainer>
      <Link to={`/store/${storeId}`}>
        <RoundedButton gray>상세보기</RoundedButton>
      </Link>
      <Modal withCloseButton={false} btnText="투표하기" btnBgColor="#d21312" btnColor="#fff" duration={300} />
    </ButtonContainer>
  </Container>
);

export default StoreItemOnHover;
