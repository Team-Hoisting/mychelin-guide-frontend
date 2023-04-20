import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import palette from '../../lib/palette';
import InputField from './InputField';
import Button from '../common/Button';

const Container = styled.div`
  h3 {
    display: flex;
    justify-content: center;
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 2rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const formTitle = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type, formSchema, defaultValues, request }) => {
  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const title = formTitle[type];

  const onSubmit = e => {
    console.log('event 객체:', e);
    console.log('getValues:', getValues());
    request(getValues());
  };

  return (
    <Container>
      <h3>{title}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          control={control}
          trigger={trigger}
          autoComplete="off"
          name="email"
          label="이메일 주소"
          type="text"
        />
        <InputField
          control={control}
          trigger={trigger}
          autoComplete="new-password"
          name="password"
          label="비밀번호"
          type="password"
        />
        {type === 'register' && (
          <>
            <InputField
              control={control}
              trigger={trigger}
              autoComplete="new-password"
              name="confirmPassword"
              label="비밀번호 확인"
              type="password"
            />
            <InputField
              control={control}
              trigger={trigger}
              autoComplete="off"
              name="nickname"
              label="닉네임"
              type="text"
            />
          </>
        )}
        <ButtonWithMarginTop disabled={!isValid} full>
          {title}
        </ButtonWithMarginTop>
      </form>
      <Footer>{type === 'register' ? <Link to="/signin">로그인</Link> : <Link to="/signup">회원가입</Link>}</Footer>
    </Container>
  );
};

export default AuthForm;
