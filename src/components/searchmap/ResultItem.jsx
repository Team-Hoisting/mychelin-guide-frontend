import styled from 'styled-components';

const ResultItemContainer = styled.div`
  padding: 10px;
`;

const Number = styled.span`
  color: var(--primary-color);
`;

const StoreName = styled.h5`
  margin: 5px 0;
  font-size: 18px;
`;

const AdditionalInfoWrapper = styled.div`
  margin-top: 15px;
  color: #353535;
  font-size: 14px;
`;

const Address = styled.span`
  display: block;
  margin: 5px 0;
`;

const PhoneNumber = styled.span`
  display: block;
  margin: 5px 0;
`;

const ResultItem = ({ storeName, address, phoneNumber, currentIdx }) => (
  <ResultItemContainer>
    <StoreName>
      <Number>{`${currentIdx}. `}</Number>
      {storeName}
    </StoreName>
    <AdditionalInfoWrapper>
      <Address>{address}</Address>
      <PhoneNumber>{phoneNumber}</PhoneNumber>
    </AdditionalInfoWrapper>
  </ResultItemContainer>
);

export default ResultItem;
