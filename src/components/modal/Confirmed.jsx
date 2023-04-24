import React from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import styled, { css } from 'styled-components';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import userState from '../../recoil/atoms/userState';
import { checkCategory } from '../../api/votes';
import ButtonGroup from './ButtonGroup';

const Container = styled.div`
  padding: 2rem 2rem;
`;

const ChangeLog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;

  .red {
    color: red;
  }

  .blue {
    color: green;
  }
`;

const Box = styled.div`
  background: #ababab;
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  margin: 1rem 7rem;
  border-radius: 7px;
  font-size: 1.1rem;
  font-weight: 500;
  width: 50%;

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }
`;

const Text = styled.p`
  margin: 0;
  padding: 0;

  .bold {
    font-weight: 700;
  }

  .red {
    color: #d21312;
  }

  ${props =>
    props.center &&
    css`
      text-align: center;
    `}
`;

const ArrowIcon = styled(MdOutlineKeyboardDoubleArrowDown)`
  font-size: 1.5rem;
`;

const CategoryConfirmed = ({ selectedCode, category, data, store, onNext, onClose }) => {
  const { nickname } = useRecoilValue(userState);
  const { storeId } = store;

  const handleVote = () => {};

  return (
    <Container>
      <Text>
        현재 <span className="red">{category} 카테고리</span>에서
      </Text>
      <ChangeLog>
        <Box>
          <span className="red">{data.storeName}</span>
        </Box>
        <ArrowIcon />
        <Box>
          <span className="blue">{store.storeName}</span>
        </Box>
      </ChangeLog>
      <Text center>
        <span className="bold">변경</span>하시겠습니까?
      </Text>
      <ButtonGroup leftText="확인" rightText="취소" onNext={onNext} onClose={onClose} mt="2rem" />
    </Container>
  );
};

const StoreConfirmed = () => {
  console.log('');

  return (
    <Container>
      <Text>
        현재 <span className="red">카테고리</span>에서
      </Text>
    </Container>
  );
};

const Confirmed = ({ selectedCode, category, onNext, onClose, store }) => {
  const { nickname } = useRecoilValue(userState);
  const { data, isLoading, error } = useQuery({
    queryKey: ['votes'],
    queryFn: checkCategory(nickname, selectedCode),
    staleTime: 1000,
  });

  if (isLoading) return <div></div>;
  if (error) return <pre>{error}</pre>;

  return data ? (
    <CategoryConfirmed
      selectedCode={selectedCode}
      category={category}
      data={data}
      store={store}
      onNext={onNext}
      onClose={onClose}
    />
  ) : (
    <div>zz</div>
  );
};

export default Confirmed;
