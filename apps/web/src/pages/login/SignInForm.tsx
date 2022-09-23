import React from 'react';
import { useAuth } from 'context/auth';
import { useForm } from 'react-hook-form';
import { Flex, styled } from '@crypto/design-system';
import { FaEye, FaEyeSlash } from '@crypto/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const Form = styled('form', {
  width: '300px',
  padding: '$10',
  background: '$white',
});

const fieldStyle = {
  width: '100%',
  height: '$10',
  fontSize: '$1',
  display: 'block',
  padding: '0 10px',
  borderRadius: '5px',
  marginBottom: '10px',
  boxSizing: 'border-box',
  border: '1px solid #ccc',
};

const EmailField = styled('input', fieldStyle);

const PasswordField = styled('input', {
  ...fieldStyle,
  padding: '0 45px 0 10px',
});

const PasswordFieldWrapper = styled('div', {
  position: 'relative',
});

const SignInButton = styled('button', {
  color: '#fff',
  width: '100%',
  height: '40px',
  fontSize: '15px',
  background: '#333',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
});

const PasswordVisibleButton = styled('button', {
  top: '10px',
  color: '#333',
  right: '10px',
  border: 'none',
  fontSize: '15px',
  position: 'absolute',
});

type LoginForm = {
  email: string;
  password: string;
};

function SignInForm() {
  const [visiblePassword, setVisiblePassword] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    getFieldState,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<{
    email: string;
    password: string;
  }>({ reValidateMode: 'onSubmit' });

  const onSubmits = async (data: LoginForm) => {
    clearErrors();
    login({ email: data.email, password: data.password })
      .then(() => {
        const origin = location.state?.from?.pathname || '/home';
        navigate(origin);
      })
      .catch((e: unknown) => {
        if (typeof e === 'string') {
          setError('email', { message: e });
        }
      });
  };

  const onClickButton = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmits)}>
      <EmailField
        {...register('email', { required: true })}
        placeholder='Email'
        type='email'
      />
      <PasswordFieldWrapper>
        <PasswordField
          {...register('password', { required: true })}
          placeholder='Password'
          type={visiblePassword ? 'text' : 'password'}
        />
        <PasswordVisibleButton
          type='button'
          name='visible_password'
          onClick={onClickButton}
        >
          {visiblePassword ? <FaEyeSlash /> : <FaEye />}
        </PasswordVisibleButton>
      </PasswordFieldWrapper>
      <Flex css={{ color: '$red400' }}>
        {Boolean(getFieldState('email').error?.message) &&
          getFieldState('email').error?.message}
      </Flex>
      <SignInButton type='submit' disabled={isSubmitting}>
        SIGN IN
      </SignInButton>
      <Flex css={{ fontSize: 'small' }} direction='column' as='ul'>
        <li>for email use: test@test.com</li>
        <li>for password use 123456</li>
      </Flex>
    </Form>
  );
}

export { SignInForm };
