import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Editor from './Editor';

const Container = styled.div`
  padding: 25px 0 18px 0;
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

const Content = styled.div`
  color: rgba(34, 34, 34, 0.5);
  padding-top: 6px;
  font-size: 16px;
  letter-spacing: -0.16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonWithPosition = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 16px;
`;

const Unit = ({ type, title }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Container>
      <Title>{title}</Title>
      {!isOpen ? (
        <>
          <Content>{title}</Content>
          <ButtonWithPosition onClick={() => setIsOpen(true)}>변경</ButtonWithPosition>
        </>
      ) : (
        <Editor type={type} onClose={() => setIsOpen(false)} />
      )}
    </Container>
  );
};

export default Unit;
