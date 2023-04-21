import styled from 'styled-components';

import { Divider } from '@mantine/core';

const ResultItemContainer = styled.div`
  padding: 10px;
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
