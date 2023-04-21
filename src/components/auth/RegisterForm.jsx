import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userState from '../../recoil/atoms/userState';
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

  const onSubmit = async data => {
    try {
      const user = await signUp(data);

      console.log(user);

      setUser(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <AuthForm type="register" formSchema={signupSchema} defaultValues={defaultValues} request={onSubmit} />;
};

export default RegisterForm;
