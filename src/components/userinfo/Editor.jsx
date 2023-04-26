import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const Container = styled.div`
  padding-top: 1.5rem;
  position: relative;
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
`;

const Input = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  border: none;
  outline: none;
  border-bottom: 1px solid #000;
  font-size: 1rem;

  & + & {
    margin-top: 0.5rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;

  Button + Button {
    margin-left: 1rem;
  }
`;

const Editor = ({ type, onClose }) => {
  console.log('');

  return (
    <Container>
      <Title>{type === 'nickname' ? '새로운 닉네임' : '새로운 비밀번호'}</Title>
      <Input placeholder={type === 'nickname' ? '닉네임 입력' : '비밀번호 입력'} />
      {type === 'password' && <Input placeholder="비밀번호 확인" />}
      <Buttons>
        <Button red>확인</Button>
        <Button onClick={onClose}>취소</Button>
      </Buttons>
    </Container>
  );
};

export default Editor;
