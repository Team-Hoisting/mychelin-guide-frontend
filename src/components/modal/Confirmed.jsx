import React from 'react';
import styled from 'styled-components';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';

const Container = styled.div`
  padding: 2rem 2rem;

  .em {
    color: #d21312;
  }
`;

const ChangeLog = styled.div``;

const Box = styled.div`
  background: #ababab;
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  margin-left: 7rem;
  margin-right: 7rem;
  border-radius: 7px;
  font-size: 1.3rem;
`;

const Confirmed = () => {
  console.log('');

  return (
    <Container>
      <p>
        현재 <span className="em">한식 카테고리</span>에서
      </p>
      <ChangeLog>
        <Box>오므토토마토 강남본점</Box>
        <MdOutlineKeyboardDoubleArrowDown />
        <Box>오레노카츠</Box>
      </ChangeLog>
    </Container>
  );
};

export default Confirmed;
