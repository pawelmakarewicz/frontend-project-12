import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFocus from '../../hooks/useFocus';

export default function LoginFrom() {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useFocus();
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        await auth.logIn(values);
        const path = location.state?.from || '/';
        navigate(path);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="username"
          autoComplete="username"
          required
          placeholder="Ваш ник"
          id="username"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
          ref={inputRef}
        />
        <Form.Label>Ваш Ник</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="password"
          autoComplete="current-password"
          required
          placeholder="Пароль"
          type="password"
          id="password"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
        />
        <Form.Label>Пароль</Form.Label>
        <Form.Control.Feedback type="invalid" className="invalid-tooltip">
          Неверное имя пользователя или пароль
        </Form.Control.Feedback>
      </Form.Group>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </Form>
  );
}
