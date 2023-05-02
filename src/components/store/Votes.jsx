import React from 'react';
import styled from 'styled-components';
import { categoryCodes } from '../../constants/index';
import { CategoryTag } from '../common/index';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const Votes = ({ voteCnt }) => (
  <Container>
    {categoryCodes.map(
      ctg => voteCnt[ctg] && <CategoryTag key={ctg} categoryCode={ctg} votedCnt={voteCnt[ctg]} renderName={true} />
    )}
  </Container>
);

export default Votes;
