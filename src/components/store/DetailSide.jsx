import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StorePositionMap } from './index';

const ImageContainer = styled.div`
  display: flex;
  height: 500px;
  min-width: 1000px;
`;

const DetailContainer = styled.div`
  width: 37%;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 4px;
`;

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  border-radius: 4px;
`;

const DetailTextContainer = styled.div`
  position: absolute;
  top: 83%;
  left: 0;
  width: 100%;
  font-size: 14px;
  padding: 5px;
  border-radius: 4px;
`;

const Address = styled.div`
  padding: 4px 0;
`;

const Phone = styled.div`
  padding: 4px 0;
`;

const AddressTitle = styled.span`
  font-weight: 700;
`;

const PhoneTitle = styled.span`
  font-weight: 700;
`;

const loading = keyframes`
  0% {
    transform: translateX(0);
  }

  50%,
  100% {
    transform: translateX(100%);
  }
`;

const ImageSkeleton = styled.div`
  width: 70%;
  height: 500px;
  margin-right: 24px;
  overflow: hidden;
  position: relative;
  background-color: #f2f2f2;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ccc, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

const Image = styled.img.attrs({
  alt: 'store',
})`
  display: ${({ isImgLoading }) => (isImgLoading ? 'none' : 'block')};
  width: 70%;
  height: 500px;
  margin-right: 24px;
  border-radius: 4px;
  object-fit: cover;
`;

const DetailSide = ({ store: { imgUrl, x, y, address, phoneNumber } }) => {
  const [isImgLoading, setisImgLoading] = React.useState(true);

  const handleLoad = () => {
    setisImgLoading(false);
  };

  return (
    <>
      <ImageContainer className="imagecontainer">
        {isImgLoading && <ImageSkeleton />}
        <Image src={imgUrl} onLoad={handleLoad} isImgLoading={isImgLoading} />
        <DetailContainer className="detail-container">
          <Map className="map">
            <StorePositionMap x={x} y={y} />
          </Map>
          <DetailTextContainer>
            <Address>
              <AddressTitle>주소</AddressTitle>: {address}
            </Address>
            <Phone>
              <PhoneTitle>전화번호</PhoneTitle>: {phoneNumber || '없음'}
            </Phone>
          </DetailTextContainer>
        </DetailContainer>
      </ImageContainer>
    </>
  );
};

export default DetailSide;
