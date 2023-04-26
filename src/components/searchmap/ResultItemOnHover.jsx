import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Button } from '../common';
import { fetchStore } from '../../api/stores';

const Container = styled.main`
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
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

const ResultItemOnHover = ({ storeId }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storeInfo = await fetchStore(storeId)();

        setIsRegistered(!!storeInfo);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Container>
      <ButtonContainer>
        {isRegistered ? (
          <Link to={`/store/${storeId}`}>
            <RoundedButton gray>상세보기</RoundedButton>
          </Link>
        ) : (
          <InfoText>등록되지 않은 식당입니다.</InfoText>
        )}

        <RoundedButton red>투표하기</RoundedButton>
      </ButtonContainer>
    </Container>
  );
};

export default ResultItemOnHover;
