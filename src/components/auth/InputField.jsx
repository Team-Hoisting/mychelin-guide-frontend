import React from 'react';
import styled from 'styled-components';
import { useController } from 'react-hook-form';
import { useDebounce } from '../../hooks';
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
  background-color: var(--ba-color);
  color: var(--font-color);

  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid var(--border-tertiary);
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

  :disabled {
    background-color: var(--button-disabled-color);
    color: #fff;
  }
`;

const InputField = ({ control, trigger, name, autoComplete, label, type, doubleCheck, setIsDuplicateField }) => {
  const {
    field: { value, onChange },
    fieldState: { isDirty, error },
  } = useController({
    name,
    control,
  });

  const [isDuplicate, setIsDuplicate] = React.useState(null);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const debounceOnChange = useDebounce(() => {
    trigger(name);
  }, 200);
  const debounceOnChangeForCP = useDebounce(() => trigger('confirmPassword'), 200);

  const handleChange = e => {
    onChange(e.target.value);

    setIsDuplicate(null);
    setIsDisabled(false);
    if (doubleCheck) setIsDuplicateField(false);

    debounceOnChange();

    if (name === 'password') debounceOnChangeForCP();
  };

  const confirm = async () => {
    const request = name === 'email' ? checkEmail : checkNickname;

    try {
      const { status } = await request(value);

      if (status === 200) {
        setIsDuplicate(true);
        if (doubleCheck) setIsDuplicateField(true);
      }
    } catch (e) {
      setIsDuplicate(false);
      setIsDisabled(true);
      if (doubleCheck) setIsDuplicateField(false);
    }
  };

  return (
    <>
      <Label>
        {label}
        {doubleCheck && isDirty && !error && (
          <Hint isValid={isDuplicate}>{isDuplicate === null ? '확인 필요' : isDuplicate ? '사용 가능' : '중복'}</Hint>
        )}
      </Label>
      {doubleCheck ? (
        <FlexBox>
          <Input value={value} onChange={handleChange} name={name} autoComplete={autoComplete} type={type} />
          <DoubleCheckButton
            type="button"
            small
            red
            disabled={!isDirty || error || isDuplicate || isDisabled}
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
