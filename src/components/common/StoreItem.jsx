import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StoreItemOnHover from './StoreItemOnHover';

const Container = styled.div`
  max-width: 240px;
  height: 200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 12px;
  padding: 12px;
  margin: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Content = styled.div`
  padding: 5px;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const Name = styled(Link)`
  padding: 8px 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 100px;
  overflow: hidden;
`;

const StarContainer = styled.div``;

const Star = styled.img.attrs({
  src: '/images/star.png',
})`
  width: 28px;
`;

const StoreItem = ({ storeName = '', imgUrl = '', starCnt = 0 }) => {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  return (
    <>
      {!hover ? (
        <Container onMouseEnter={handleMouseOver}>
          <Link>
            <Img src={imgUrl} alt="store image" />
          </Link>
          <Content>
            <Name>{storeName}</Name>
            <StarContainer>
              {[...Array(starCnt).keys()].map(val => (
                <Star key={val} />
              ))}
            </StarContainer>

            {/* 카테고리 라벨 */}
          </Content>
        </Container>
      ) : (
        <StoreItemOnHover handleMouseOut={handleMouseOut} />
      )}
    </>
  );
};

export default StoreItem;
