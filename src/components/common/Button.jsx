import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/palette';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${props =>
    props.full &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props =>
    props.$cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

  &:disabled {
    background-color: transparent;
    border: 3px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;
  }
`;

const CommonButton = styled.button`
  ${buttonStyle}
`;

const CommonLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => (props.to ? <CommonLink {...props} $cyan={props.cyan} /> : <CommonButton {...props} />);

export default Button;
