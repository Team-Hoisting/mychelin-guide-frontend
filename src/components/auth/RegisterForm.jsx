import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  const onSubmit = async data => {
    try {
      await signUp(data);

      navigate('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  return <AuthForm type="register" formSchema={signupSchema} defaultValues={defaultValues} request={onSubmit} />;
};

export default RegisterForm;
