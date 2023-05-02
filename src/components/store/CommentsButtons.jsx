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
  padding: 0;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};

  align-items: center;
  justify-content: center;

  font-size: 17px;
  background-color: ${({ clicked }) => (clicked ? 'var(--button-click-color)' : 'var(--bg-color)')};
  color: var(--font-color);

  :hover {
    background-color: var(--button-click-color);
    color: var(--font-color);
  }
`;

const PrevButton = styled(PageButton)`
  width: 50px;
  margin: 0 10px;
  padding: 0 4px;
`;

const NextButton = styled(PageButton)`
  width: 50px;
  margin: 0 4px;
  padding: 0 4px;
`;

const CommentsButtons = ({ currentPage, setCurrentPage, commentsData, totalPages }) => {
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
        <PrevButton onClick={handlePrevBtnClick} show={commentsData?.length > 0 && page !== 1}>
          Prev
        </PrevButton>
        {currentPages.map(pageNum => (
          <PageButton
            key={pageNum}
            onClick={handlePageBtnClick(pageNum)}
            clicked={pageNum === currentPage}
            show={pageNum <= totalPages}>
            {pageNum}
          </PageButton>
        ))}

        <NextButton
          onClick={handleNextBtnClick}
          show={commentsData?.length > 0 && page !== Math.ceil(totalPages / COMMENTS_FETCH_SIZE)}>
          Next
        </NextButton>
      </ButtonGroup>
    </ButtonContainer>
  );
};

export default CommentsButtons;
