import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { LoginFormData } from '../types';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta adresi zorunludur'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre zorunludur'),
});

const Login: React.FC = () => {
  const handleSubmit = async (values: LoginFormData) => {
    try {
      // API çağrısı burada yapılacak
      console.log('Login values:', values);
      toast.success('Giriş başarılı!');
    } catch (error) {
      toast.error('Giriş başarısız oldu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Giriş Yap</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <Field
                id="email"
                name="email"
                type="email"
                className={errors.email && touched.email ? 'error' : ''}
              />
              {errors.email && touched.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <Field
                id="password"
                name="password"
                type="password"
                className={errors.password && touched.password ? 'error' : ''}
              />
              {errors.password && touched.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            <button type="submit">Giriş Yap</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login; 