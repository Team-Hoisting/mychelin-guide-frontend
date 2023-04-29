import React from 'react';
import styled from 'styled-components';
import { BiErrorCircle } from 'react-icons/bi';
import { Alert } from '@mantine/core';

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Text = styled.span`
  padding: 0 2rem;
`;

const AlertContainer = ({ close, type }) => {
  React.useEffect(() => {
    setTimeout(close, 2000);
  }, [close]);

  return (
    <Container>
      <Alert
        icon={<BiErrorCircle size="1rem" />}
        color="gray"
        variant="filled"
        radius="md"
        styles={() => ({
          root: {
            // border: '1px solid #d21312',
          },
        })}>
        <Text>{type === 'login' ? '이메일 또는 비밀번호를 확인해주세요!' : '회원정보 수정이 완료되었습니다!'}</Text>
      </Alert>
    </Container>
  );
};

export default AlertContainer;
