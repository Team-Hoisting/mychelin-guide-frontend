import React from 'react';
import styled from 'styled-components';
import { useController } from 'react-hook-form';
import palette from '../../lib/palette';

const Label = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }

  & ~ ${Label} {
    margin-top: 2rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const InputField = ({ control, trigger, name, autoComplete, label, type }) => {
  const {
    field: { value, onChange },
    fieldState: { isDirty, error },
  } = useController({
    name,
    control,
  });

  const handleChange = e => {
    onChange(e.target.value);
    trigger(name);
    if (name === 'password') trigger('confirmPassword');
  };

  return (
    <>
      <Label>{label}</Label>
      <Input value={value} onChange={handleChange} name={name} autoComplete={autoComplete} type={type} />
      <ErrorMessage>{isDirty && error?.message}</ErrorMessage>
    </>
  );
};

export default InputField;
