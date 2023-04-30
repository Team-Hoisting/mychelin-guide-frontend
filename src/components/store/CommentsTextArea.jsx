import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Button } from '../common/index';
import userState from '../../recoil/atoms/userState';

const Container = styled.div`
  position: relative;
`;

const TextArea = styled.textarea.attrs(({ content }) => ({
  rows: 3,
  placeholder: '이 식당 어떠셨나요? 솔직한 후기를 알려주세요.',
  value: content,
}))`
  display: block;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border-radius: 12px;

  margin: 12px 0;
  resize: none;
  background-color: var(--bg-dark-color);
  color: var(--font-color);
  border: 2px solid var(--border-primary);

  :focus {
    border: 2px solid var(--border-primary);
    outline: none;
  }
`;

const CommentBtn = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const CommentsTextArea = ({ addComment }) => {
  const [content, setContent] = React.useState('');
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleCommentBtnClick = () => {
    if (!content) return;

    if (!user) {
      navigate('/signin', { state: pathname });
      return;
    }

    const newComment = {
      storeId: id,
      content,
      email: user?.email,
      isCertified: true,
      nickname: user?.nickname,
    };

    console.log('newcomment: ', newComment);

    addComment(newComment);
    setContent('');
  };

  return (
    <>
      <Container>
        <TextArea onChange={handleChange} content={content}></TextArea>
        <CommentBtn onClick={handleCommentBtnClick}>등록하기</CommentBtn>
      </Container>
    </>
  );
};

export default CommentsTextArea;