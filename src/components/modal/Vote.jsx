import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { CategoryBox } from '../common/index';
import categoryCodes from '../../constants/categoryCodes';
import categoryInfo from '../../constants/categoryInfo';

const Container = styled.div`
  padding: 2rem 1.2rem;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

const Control = styled(Button)`
  width: 70%;
`;

const Vote = ({ onClose }) => {
  const [selectedCode, setSelectedCode] = React.useState(null);

  return (
    <Container>
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
      <ButtonGroup>
        <Control red thirty>
          투표하기
        </Control>
        <Control thirty onClick={onClose}>
          취소하기
        </Control>
      </ButtonGroup>
    </Container>
  );
};

export default Vote;
