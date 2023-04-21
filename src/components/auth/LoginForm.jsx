import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import userState from '../../recoil/atoms/userState';
import queryKey from '../../constants/userQueryKey';
import { signIn } from '../../api/auth';
import { signinSchema } from '../../schema';
import AuthForm from './AuthForm';
import LoginFailAlert from './LoginFailAlert';

const defaultValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [isFailedLogin, setIsFailedLogin] = React.useState(false);
  const { mutate } = useMutation({
    queryKey,
    mutationFn: signIn,
    onSuccess(data) {
      setUser(data);
      navigate('/');
    },
    onError() {
      setIsFailedLogin(true);
    },
  });

  return (
    <>
      <AuthForm type="login" formSchema={signinSchema} defaultValues={defaultValues} request={mutate} />
      {isFailedLogin && <LoginFailAlert close={() => setIsFailedLogin(false)} />}
    </>
  );
};

export default LoginForm;
