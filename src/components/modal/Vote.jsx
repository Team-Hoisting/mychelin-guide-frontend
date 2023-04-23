import React from 'react';
import styled from 'styled-components';
import Categories from '../main/Categories';
import Button from '../common/Button';

const Container = styled.div`
  padding: 2rem 1.2rem;
`;

const Info = styled.div`
  margin-bottom: 3rem;
`;

const Store = styled.h2`
  margin-bottom: 0.4rem;
`;

const Guidance = styled.div`
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

// const Wrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   grid-template-rows: repeat(2, 1fr);
// `;

const Vote = () => {
  console.log();

  return (
    <Container>
      <Info>
        <Store>오므토토마토 강남본점</Store>
        <span className="address">서울 강남구 테헤란로4길 29 1층 오므토토마토 강남본점</span>
      </Info>
      {/* <Wrapper>
        <Categories />
      </Wrapper> */}
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
        <Control thirty>취소하기</Control>
      </ButtonGroup>
    </Container>
  );
};

export default Vote;
