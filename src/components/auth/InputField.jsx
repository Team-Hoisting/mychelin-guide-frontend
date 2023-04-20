import React from 'react';
import styled from 'styled-components';
import { useController } from 'react-hook-form';
import palette from '../../lib/palette';
import Button from '../common/Button';
import { checkEmail, checkNickname } from '../../api/auth';

const Hint = styled.span`
  margin-left: 1rem;
  font-size: 0.5rem;
  color: ${props => (props.isValid ? 'green' : 'red')};
`;

const Label = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const FlexBox = styled.div`
  display: flex;
  width: 100%;

  & ~ ${Label} {
    margin-top: 2rem;
  }
`;

const Input = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: ${[props => (props.full ? '100%' : '80%')]};
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[9]};
  }

  & ~ ${Label} {
    margin-top: 2rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.5rem;
  margin-top: 0.5rem;
  height: 3px;
`;

const DoubleCheckButton = styled(Button)`
  width: 20%;
`;

const InputField = ({ control, trigger, name, autoComplete, label, type, doubleCheck, setIsValidField }) => {
  const {
    field: { value, onChange },
    fieldState: { isDirty, error },
  } = useController({
    name,
    control,
  });

  const [isValid, setIsValid] = React.useState(null);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleChange = e => {
    onChange(e.target.value);
    setIsValid(null);
    if (doubleCheck) setIsValidField(false);
    setIsDisabled(false);
    trigger(name);
    if (name === 'password') trigger('confirmPassword');
  };

  const confirm = async () => {
    const request = name === 'email' ? checkEmail : checkNickname;

    try {
      const { status } = await request(value);

      console.log(status);

      if (status === 200) {
        setIsValid(true);
        if (doubleCheck) setIsValidField(true);
        console.log('성공');
      }
    } catch (e) {
      setIsValid(false);
      setIsDisabled(true);
      if (doubleCheck) setIsValidField(false);
    }
  };

  return (
    <>
      <Label>
        {label}
        {doubleCheck && isDirty && !error && (
          <Hint isValid={isValid}>{isValid === null ? '확인 필요' : isValid ? '사용 가능' : '중복'}</Hint>
        )}
      </Label>
      {doubleCheck ? (
        <FlexBox>
          <Input value={value} onChange={handleChange} name={name} autoComplete={autoComplete} type={type} />
          <DoubleCheckButton
            type="button"
            small
            red
            disabled={!isDirty || error || isValid || isDisabled}
            onClick={confirm}>
            중복 확인
          </DoubleCheckButton>
        </FlexBox>
      ) : (
        <FlexBox>
          <Input full value={value} onChange={handleChange} name={name} autoComplete={autoComplete} type={type} />
        </FlexBox>
      )}

      <ErrorMessage>{isDirty && error?.message}</ErrorMessage>
    </>
  );
};

export default InputField;
