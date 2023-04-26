import React from 'react';
import styled from 'styled-components';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Modal } from '../common/index';
import useStoreDetailMutations from '../../hooks/useStoreDetailMutations';
import userState from '../../recoil/atoms/userState';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
`;

const StoreTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.h2`
  margin-right: 12px;
`;

const Star = styled.img.attrs({
  src: '/images/fork-spoon.png',
})`
  width: 36px;
  height: 36px;
  display: block;
`;

const StarContainer = styled.div`
  display: flex;
`;

const Side = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EmtpyBookmarkIcon = styled(BsBookmark)`
  width: 40px;
  cursor: pointer;
`;

const FillBookMarkIcon = styled(BsFillBookmarkFill)`
  width: 40px;
  cursor: pointer;
`;

const Bookmark = styled.div`
  margin: 0 20px;
  position: relative;
`;

const ArchivedCnt = styled.span`
  position: absolute;
  top: -1.5px;
  left: 36px;
`;

const Title = ({ storeName, storeId, addBookMark, deleteBookMark, archivedCntState }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useRecoilValue(userState);

  const handleAddArchiveClick = () => {
    // 로그인 안 된 상태면 login page로
    if (!user) {
      navigate('/signin', { state: pathname });
      return;
    }
    addBookMark({ storeId, email: user?.email });
  };

  const handleDeleteArchiveClick = () => {
    deleteBookMark({ email: user?.email, storeId: id });
  };

  return (
    <>
      <Container className="storetitle">
        <StoreTitle>
          <TitleText>{storeName}</TitleText>
          <StarContainer>
            <Star />
            <Star />
            <Star />
          </StarContainer>
        </StoreTitle>
        <Side>
          <Bookmark>
            {user?.archived?.map(({ storeId }) => storeId).includes(id) ? (
              <FillBookMarkIcon onClick={handleDeleteArchiveClick} />
            ) : (
              <EmtpyBookmarkIcon onClick={handleAddArchiveClick} />
            )}
            <ArchivedCnt>{archivedCntState}</ArchivedCnt>
          </Bookmark>
          <Modal storeId={storeId} width="120px" />
        </Side>
      </Container>
    </>
  );
};

export default Title;
