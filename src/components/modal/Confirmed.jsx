import React from 'react';
import styled, { css } from 'styled-components';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import ButtonGroup from './ButtonGroup';

const Container = styled.div`
  padding: 2rem 2rem;
`;

const ChangeLog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
`;

const Box = styled.div`
  background: #ababab;
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  margin: 1rem 7rem;
  border-radius: 7px;
  font-size: 1.1rem;
  width: 50%;

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }
`;

const Text = styled.p`
  margin: 0;
  padding: 0;

  .bold {
    font-weight: 700;
  }

  .red {
    color: #d21312;
  }

  ${props =>
    props.center &&
    css`
      text-align: center;
    `}
`;

const ArrowIcon = styled(MdOutlineKeyboardDoubleArrowDown)`
  font-size: 1.5rem;
`;

const Confirmed = ({ onNext, onClose }) => {
  console.log('');

  return (
    <Container>
      <Text>
        현재 <span className="red">한식 카테고리</span>에서
      </Text>
      <ChangeLog>
        <Box>
          <span>오므토토마토 강남본점</span>
        </Box>
        <ArrowIcon />
        <Box>
          <span>오레노카츠</span>
        </Box>
      </ChangeLog>
      <Text center>
        <span className="bold">변경</span>하시겠습니까?
      </Text>
      <ButtonGroup leftText="확인" rightText="취소" onNext={onNext} onClose={onClose} mt="2rem" />
    </Container>
  );
};

export default Confirmed;
