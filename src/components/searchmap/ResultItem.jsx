import styled from 'styled-components';

import { Divider } from '@mantine/core';

const ResultItemContainer = styled.div`
  margin: 15px 0;
  padding: 10px;
  width: 250px;
  height: 100px;
  background-color: white;
  opacity: 0.9;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #ababab;
`;

const StoreName = styled.h5`
  margin: 5px 0;
`;

const Address = styled.span`
  display: block;
  margin: 5px 0;
  font-size: 12px;
`;

const PhoneNumber = styled.span`
  display: block;
  margin: 5px 0;
  font-size: 10px;
  font-style: italic;
`;

const ResultItem = ({ storeName, address, phoneNumber }) => (
  <ResultItemContainer>
    <StoreName>{storeName}</StoreName>
    <Divider size="sm" />
    <Address>{address}</Address>
    <PhoneNumber>{phoneNumber}</PhoneNumber>
  </ResultItemContainer>
);

export default ResultItem;
