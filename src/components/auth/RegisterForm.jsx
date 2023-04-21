import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import userState from '../../recoil/atoms/userState';
import queryKey from '../../constants/userQueryKey';
import { signUp } from '../../api/auth';
import { signupSchema } from '../../schema';
import AuthForm from './AuthForm';

const defaultValues = {
  email: '',
  password: '',
  confirmPassword: '',
  nickname: '',
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const { mutate } = useMutation({
    queryKey,
    mutationFn: signUp,
    onSuccess(data) {
      setUser(data);
      navigate('/');
    },
  });

  return <AuthForm type="register" formSchema={signupSchema} defaultValues={defaultValues} request={mutate} />;
};

export default RegisterForm;
