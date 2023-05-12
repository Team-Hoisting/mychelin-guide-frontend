import styled from 'styled-components';
import { BsBookmark } from 'react-icons/bs';
import { MdOutlineWhereToVote } from 'react-icons/md';

const Container = styled.div`
  width: 100%;
  border-top: 1px solid #ababab;
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 30px;
`;

const Tab = styled.div`
  width: 250px;
  border-top: ${({ selected }) => (selected ? '2px solid var(--border-tertiary)' : '2px solid rgba(0,0,0,0)')};
  color: ${({ selected }) => (selected ? 'var(--font-color)' : '#ababab')};
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const TabName = styled.p`
  margin: 0;
`;

const ArchiveIcon = styled(BsBookmark)`
  width: 30px;
`;

const VoteIcon = styled(MdOutlineWhereToVote)`
  width: 30px;
`;

const Tabs = ({ changeToVotedStores, changeToArchivedStores, renderStatus }) => (
  <Container>
    <Tab onClick={changeToVotedStores} selected={renderStatus === 'votedStores'}>
      <VoteIcon selected={renderStatus === 'votedStores'} />
      <TabName selected={renderStatus === 'votedStores'}>Voted Stores</TabName>
    </Tab>
    <Tab onClick={changeToArchivedStores} selected={renderStatus === 'archivedStores'}>
      <ArchiveIcon selected={renderStatus === 'archivedStores'} />
      <TabName selected={renderStatus === 'archivedStores'}>Archived Stores</TabName>
    </Tab>
  </Container>
);

export default Tabs;
