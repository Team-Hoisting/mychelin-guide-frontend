import React from 'react';
import styled from 'styled-components';
import { Button } from '../common/index';
import { COMMENTS_FETCH_SIZE } from '../../constants/index';

const ButtonContainer = styled.div`
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 30%;
  justify-content: flex-start;
  margin: 0 auto;
`;

const PageButton = styled(Button)`
  width: 40px;
  height: 40px;
  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 17px;
  background: ${({ clicked }) => (clicked ? 'var(--button-click-color);' : 'none;')};
  color: var(--font-color);
  flex-wrap: nowrap;

  :hover {
    background: var(--border-primary);
  }
`;

const PrevButton = styled(PageButton)`
  width: 40px;
  margin: 0 10px;
  padding: 0 4px;
`;

const NextButton = styled(PageButton)`
  width: 40px;
  margin: 0 4px;
  padding: 0 4px;
`;

const CommentsButtons = ({ currentPage, setCurrentPage, commentsData, totalPages, bottomRef }) => {
  const page = Math.ceil(currentPage / COMMENTS_FETCH_SIZE);
  const startIndex = (page - 1) * COMMENTS_FETCH_SIZE;
  const endIndex = startIndex + +COMMENTS_FETCH_SIZE;

  const currentPages = Array.from(
    { length: totalPages < 5 ? totalPages : endIndex - startIndex },
    (_, i) => startIndex + 1 + i
  );

  const handlePageBtnClick = page => () => {
    setCurrentPage(page);
  };

  const handlePrevBtnClick = () => {
    setCurrentPage(startIndex);
  };

  const handleNextBtnClick = () => {
    setCurrentPage(endIndex + 1);
  };

  return (
    <ButtonContainer className="container">
      <ButtonGroup className="buttoncontainer">
        {commentsData?.length > 0 && page !== 1 && <PrevButton onClick={handlePrevBtnClick}>Prev</PrevButton>}
        {currentPages.map(
          pageNum =>
            pageNum <= totalPages && (
              <PageButton key={pageNum} onClick={handlePageBtnClick(pageNum)} clicked={pageNum === currentPage}>
                {pageNum}
              </PageButton>
            )
        )}
        {commentsData?.length > 0 && page !== Math.ceil(totalPages / COMMENTS_FETCH_SIZE) && (
          <NextButton onClick={handleNextBtnClick}>Next</NextButton>
        )}
      </ButtonGroup>
    </ButtonContainer>
  );
};

export default CommentsButtons;
