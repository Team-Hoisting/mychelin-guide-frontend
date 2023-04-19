import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { z } from 'zod';
import userState from '../../recoil/atoms/userState';
import queryKey from '../../constants/userQueryKey';
import { signIn } from '../../api/auth';
import AuthForm from './AuthForm';

const formSchema = z.object({
  userid: z.string().email({ message: '이메일 형식에 맞게 입력해주세요.' }),
  password: z.string().regex(/^[A-Za-z0-9]{6,12}$/, { message: '영문 또는 숫자를 6~12자 입력하세요.' }),
});

const defaultValues = {
  userid: '',
  password: '',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const { mutate } = useMutation({
    queryKey,
    mutationFn: signIn,
    onSuccess(data) {
      setUser(data);
      navigate('/');
    },
    onError(err) {
      console.log(err);
    },
  });

  return <AuthForm type="login" formSchema={formSchema} defaultValues={defaultValues} request={mutate} />;
};

export default LoginForm;