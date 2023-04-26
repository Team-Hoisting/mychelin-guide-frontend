import styled from 'styled-components';
import { AiOutlineLine } from 'react-icons/ai';

const EachCategoryBox = styled.div`
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease-in;
  position: relative;

  ${({ changeOnHover }) =>
    changeOnHover &&
    `
      :hover::after {
          content: ;
        }

        :hover > img {
          scale: 1.1;
          transition: 0.1s ease-in-out;
        }

        :hover > p {
          font-weight: 600;
          transition: 0.1s ease-in-out;
        }
    `}
`;

const CategoryIcon = styled.img`
  width: 50%;
  transition: 0.1s ease-in-out;
`;

const CategoryName = styled.p`
  margin: 0;
  font-weight: ${({ selected }) => selected && '600'};
`;

const SelectedIcon = styled(AiOutlineLine)`
  color: var(--primary-color);
  position: absolute;
  font-size: 20px;
  top: 90%;
  left: 40%;
  display: ${({ selected }) => (selected ? 'block' : 'none')};
`;

/**
 *
 * @param {} Props: Required: { categoryImgFile, categoryName, colored }, Optional: { selected, clickHandler, changeOnHover }
 * @returns Component that contains the appropriate icon and name of the category
 */
const CategoryBox = ({ clickHandler, categoryImgFile, categoryName, colored, selected, changeOnHover = true }) => {
  const imgSrc = `/categoryIcons/${colored ? '' : 'noColor/'}${categoryImgFile}.png`;

  return (
    <EachCategoryBox onClick={clickHandler} changeOnHover={changeOnHover}>
      <SelectedIcon selected={selected} />
      <CategoryIcon src={imgSrc} alt={`${categoryName}`} />
      <CategoryName selected={selected}>{categoryName}</CategoryName>
    </EachCategoryBox>
  );
};

export default CategoryBox;
