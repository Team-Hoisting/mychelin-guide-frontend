import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userState from '../../recoil/atoms/userState';
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
  const { state } = useLocation();

  const onSubmit = async data => {
    try {
      const user = await signIn(data);

      console.log(user);

      setUser(user);

      if (state) {
        navigate(state);
      } else navigate('/');
    } catch (e) {
      setIsFailedLogin(true);
    }
  };

  return (
    <>
      <AuthForm type="login" formSchema={signinSchema} defaultValues={defaultValues} request={onSubmit} />
      {isFailedLogin && <LoginFailAlert close={() => setIsFailedLogin(false)} />}
    </>
  );
};

export default LoginForm;
