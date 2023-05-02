import React from 'react';
import styled from 'styled-components';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import NewModal from '../common/NewModal';
import userState from '../../recoil/atoms/userState';
import themeState from '../../recoil/atoms/themeState';
import ImgUploadModal from './ImgUploadModal';

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

const Star = styled.img`
  width: 32px;
  margin: 4px;
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
  scale: 1.6;
  cursor: pointer;

  :hover {
    color: #858585;
  }
`;

const FillBookMarkIcon = styled(BsFillBookmarkFill)`
  width: 40px;
  scale: 1.6;
  cursor: pointer;
  color: #fe9602;
`;

const Bookmark = styled.div`
  /* border: 1px solid red; */
  display: flex;
  margin: 0 20px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const ArchivedCntMsg = styled.p`
  margin: 0;
  font-size: 20px;
`;

const Title = ({ storeName, storeId, starCnt, addBookMark, deleteBookMark, archivedCntState }) => {
  const { id } = useParams();

  console.log(starCnt);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useRecoilValue(userState);

  const handleAddArchiveClick = () => {
    if (!user) {
      navigate('/signin', { state: pathname });
      return;
    }
    addBookMark({ storeId, email: user?.email });
  };

  const handleDeleteArchiveClick = () => {
    deleteBookMark({ email: user?.email, storeId: id });
  };

  const theme = useRecoilValue(themeState);

  return (
    <Container className="storetitle">
      <StoreTitle>
        <TitleText>{storeName}</TitleText>
        <StarContainer>
          {[...Array(starCnt).keys()].map(val => (
            <Star key={val} src={`/images/star-${theme}.png`} />
          ))}
        </StarContainer>
      </StoreTitle>
      <Side>
        <Bookmark>
          <ArchivedCntMsg>{archivedCntState}</ArchivedCntMsg>
          {user?.archived?.map(({ storeId }) => storeId).includes(id) ? (
            <FillBookMarkIcon onClick={handleDeleteArchiveClick} />
          ) : (
            <EmtpyBookmarkIcon onClick={handleAddArchiveClick} />
          )}
        </Bookmark>
        <ImgUploadModal />
        <NewModal storeId={storeId} width="120px" />
      </Side>
    </Container>
  );
};

export default Title;
