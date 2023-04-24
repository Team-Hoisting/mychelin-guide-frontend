import React from 'react';
import styled, { css } from 'styled-components';
import { CategoryBox } from '../common/index';
import categoryCodes from '../../constants/categoryCodes';
import categoryInfo from '../../constants/categoryInfo';
import ButtonGroup from './ButtonGroup';

const Container = styled.div`
  padding: 2rem 1.2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;

  ${props =>
    props.notFixed &&
    css`
      position: static;
      top: 0;
      left: 0;
      transform: none;
      background: transparent;
      border-radius: 0;
      box-shadow: none;
    `}
`;

const Info = styled.div`
  margin-bottom: 6rem;
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

const Vote = ({ onClose, onNext, notFixed }) => {
  const [selectedCode, setSelectedCode] = React.useState(null);

  return (
    <Container notFixed={notFixed}>
      <Info>
        <Store>오므토토마토 강남본점</Store>
        <span className="address">서울 강남구 테헤란로4길 29 1층 오므토토마토 강남본점</span>
      </Info>
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
