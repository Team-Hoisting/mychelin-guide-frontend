import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;

  margin-top: ${props => props.mt};
`;

const Control = styled(Button)`
  width: 70%;
`;

const ButtonGroup = ({ onNext, onClose, leftText, rightText, mt, isDisable }) => {
  console.log('');

  return (
    <Container mt={mt}>
      <Control red thirty onClick={onNext} disabled={isDisable}>
        {leftText}
      </Control>
      <Control thirty onClick={onClose}>
        {rightText}
      </Control>
    </Container>
  );
};

export default ButtonGroup;
