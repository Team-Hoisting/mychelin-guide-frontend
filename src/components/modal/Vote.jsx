import React from 'react';
import styled from 'styled-components';
import categoryCodes from '../../constants/categoryCodes';
import categoryInfo from '../../constants/categoryInfo';
import ButtonGroup from './ButtonGroup';
import { CategoryBox } from '../common/index';

const Container = styled.div`
  padding: 1rem;
  border-radius: 8px;
`;

const Info = styled.div`
  margin-bottom: 3.5rem;
`;

const Store = styled.h2`
  margin-bottom: 0.4rem;
`;

const Selector = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  font-size: 10px;
`;

const Guidance = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0;
    margin-bottom: 1rem;
  }

  .em {
    font-weight: 700;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 5em;

  img {
    width: 20%;
  }
`;

const Vote = ({ selectedCode, setSelectedCode, store, onClose, onNext }) => {
  console.log('');

  return (
    <Container>
      <Info>
        <Store>{store.storeName}</Store>
        <span className="address">{store.address}</span>
      </Info>
      <ImageContainer>
        {selectedCode ? (
          <CategoryBox
            categoryName={categoryInfo[selectedCode].ko}
            categoryImgFile={categoryInfo[selectedCode].imgFile}
            changeOnHover={false}
            colored
          />
        ) : (
          <div>없음</div>
        )}
      </ImageContainer>
      <Selector>
        {categoryCodes.map(code => {
          if (code === 'AL00') return null;

          return (
            <CategoryBox
              categoryName={categoryInfo[code].ko}
              categoryImgFile={categoryInfo[code].imgFile}
              colored={selectedCode === code}
              key={categoryInfo[code].ko}
              clickHandler={() => setSelectedCode(code)}
            />
          );
        })}
      </Selector>
      <Guidance>
        <p>카테고리당 1곳만 투표할 수 있습니다.</p>
        <p>
          정말 <span className="em">투표</span>하시겠습니까?
        </p>
      </Guidance>
      <ButtonGroup
        isDisable={selectedCode === null}
        leftText="투표하기"
        rightText="취소하기"
        onNext={onNext}
        onClose={onClose}
      />
    </Container>
  );
};

export default Vote;
