import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Button } from '../common';
import { fetchStore } from '../../api/stores';
import NewModal from '../common/NewModal';

const Container = styled.main`
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border-radius: 20px; */
`;

const ButtonContainer = styled.div`
  width: 250px;
  display: none;
  flex-direction: column;
  align-items: center;
`;

const RoundedButton = styled(Button)`
  margin: 5px;
  width: 130px;
  height: 34px;
  border: none;
  border-radius: 12px;
  font-size: 13px;
`;

const InfoText = styled.p`
  font-size: 13px;
  color: white;
`;

const ResultItemOnHover = ({ storeId, isRegistered, storeName, address, phoneNumber, x, y }) => (
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const storeInfo = await fetchStore(storeId)();

  //       setIsRegistered(!!storeInfo);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, []);

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
