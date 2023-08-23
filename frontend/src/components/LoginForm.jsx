import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
// import { useLocation, useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/index';
import routes from '../routes';

export default function LoginFrom() {
  // const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  // const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        console.log('fromik', res);
        // localStorage.setItem('userId', JSON.stringify(res.data));
        // auth.logIn();
        // const { from } = location.state;
        // navigate(from);
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
      </Form.Group>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </Form>
  );
}
