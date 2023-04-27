// import React from 'react';
// import styled from 'styled-components';
// import { useQuery } from '@tanstack/react-query';
// import { useRecoilValue } from 'recoil';
// import userState from '../../recoil/atoms/userState';
// import categoryInfo from '../../constants/categoryInfo';
// import categoryCodes from '../../constants/categoryCodes';
// import { fetchCategotySelectorData } from '../../api/votes';
// import ButtonGroup from './ButtonGroup';
// import { CategoryBox } from '../common/index';

// const Container = styled.div`
//   padding: 1rem;
//   border-radius: 8px;
// `;

// const StoreInfo = styled.div`
//   margin-bottom: 3.5rem;
// `;

// const StoreName = styled.h2`
//   margin-bottom: 0.4rem;
// `;

// const Selector = styled.div`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   gap: 10px;
//   font-size: 10px;
// `;

// const TextBox = styled.div`
//   margin-top: 5rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   p {
//     margin: 0;
//     margin-bottom: 1rem;
//   }

//   .em {
//     font-weight: 700;
//   }
// `;

// const Selected = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 50px;
//   margin-bottom: 5em;

//   img {
//     width: 20%;
//   }
// `;

// const CategorySelector = ({ storeId, categoryCode, setCategoryCode }) => {
//   const { nickname } = useRecoilValue(userState);

//   // 현재 투표할 매장, 이전에 동일 카테고리로 투표한 매장, 사용자 투표 리스트트
//   const { data, isLoading } = useQuery({
//     queryKey: ['categorySelectorData', storeId, nickname, categoryCode],
//     queryFn: fetchCategotySelectorData({ storeId, nickname, categoryCode }),
//     staleTime: 1000 * 3,
//   });

//   console.log('zz');

//   if (isLoading) return <></>;

//   console.log(data);

//   return (
//     <Container>
//       <StoreInfo>
//         {/* <StoreName>{store.storeName}</StoreName> */}
//         <StoreName>매장</StoreName>
//         {/* <span className="address">{store.address}</span> */}
//         <span className="address">주소</span>
//       </StoreInfo>
//       <Selected>
//         {categoryCode ? (
//           <CategoryBox
//             categoryName={categoryInfo[categoryCode].ko}
//             categoryImgFile={categoryInfo[categoryCode].imgFile}
//             changeOnHover={false}
//             colored
//           />
//         ) : (
//           <div>없음</div>
//         )}
//       </Selected>
//       <Selector>
//         {categoryCodes.map(code => {
//           if (code === 'AL00') return null;

//           return (
//             <CategoryBox
//               categoryName={categoryInfo[code].ko}
//               categoryImgFile={categoryInfo[code].imgFile}
//               colored={categoryCode === code}
//               key={categoryInfo[code].ko}
//               clickHandler={() => setCategoryCode(code)}
//             />
//           );
//         })}
//       </Selector>
//       <TextBox>
//         <p>카테고리당 1곳만 투표할 수 있습니다.</p>
//         <p>
//           정말 <span className="em">투표</span>하시겠습니까?
//         </p>
//       </TextBox>
//       <ButtonGroup
//         isDisable={categoryCode === null}
//         leftText="투표하기"
//         rightText="취소하기"
//         onNext={() => {}}
//         onClose={() => {}}
//       />
//     </Container>
//   );
// };

// export default CategorySelector;

import React from 'react';

const CategorySelector = () => <>CategorySelector</>;

export default CategorySelector;
