import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().min(6, "Username must be at least 6 characters"),
  password: Yup.string(),
});

const onSubmit = (values) => {
  console.log('Form Data', values);
};

export default function LoginForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  console.log(formik);
  return (
    <form className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          placeholder="Ваш ник"
          id="username"
          className="form-control"
          required
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          placeholder="Пароль"
          type="password"
          id="password"
          className="form-control"
          required
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label className="form-label" htmlFor="password">
          Пароль
        </label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
        Войти
      </button>
    </form>
  );
}
