import { atom } from 'recoil';

const searchedStoresState = atom({
  key: 'searchedStoresState',
  default: [],
});

export default searchedStoresState;
