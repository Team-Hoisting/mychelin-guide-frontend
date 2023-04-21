import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../components/auth/LoginForm';
import Modal from '../components/common/Modal';
import Vote from '../components/modal/Vote';

const LoginPage = () => (
  <AuthTemplate>
    <LoginForm />
    <Modal withCloseButton={false} btnText="투표하기" btnBgColor="#d21312" btnColor="#fff" duration={100}>
      <Vote />
    </Modal>
  </AuthTemplate>
);

export default LoginPage;
