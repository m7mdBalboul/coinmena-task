import { Modal } from 'components/modal';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { SignInForm } from './SignInForm';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const path =
    location.pathname.indexOf('login') > 0
      ? location.pathname.substring(1)
      : `${location.pathname.substring(1)}/login`;

  return (
    <Routes>
      <Route
        path={path}
        element={
          <Modal isOpen={true} onClose={() => navigate(-1)}>
            <SignInForm />
          </Modal>
        }
      />
    </Routes>
  );
}

export { Login };
