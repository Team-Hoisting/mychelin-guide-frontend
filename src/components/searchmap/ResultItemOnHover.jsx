import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Button } from '../common';
import NewModal from '../common/NewModal';

const Container = styled.main`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border-radius: 20px; */
  z-index: 9999;
`;

const ButtonContainer = styled.div`
  display: none;
  width: 250px;
  flex-direction: column;
  align-items: center;
`;

const RoundedButton = styled(Button)`
  margin: 5px;
  width: 120px;
  height: 45px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
`;

const InfoText = styled.p`
  font-size: 13px;
  color: white;
`;

const ResultItemOnHover = ({ storeId, isRegistered, storeName, address, phoneNumber, x, y }) => (
  <Container>
    <ButtonContainer>
      {isRegistered ? (
        <Link to={`/store/${storeId}`}>
          <RoundedButton gray>상세보기</RoundedButton>
        </Link>
      ) : (
        <InfoText>등록되지 않은 식당입니다.</InfoText>
      )}

      <NewModal
        store={{
          storeName,
          address,
          phoneNumber,
          x,
          y,
        }}
        storeId={storeId}
        width="120px">
        투표하기
      </NewModal>
    </ButtonContainer>
  </Container>
);

export default ResultItemOnHover;
