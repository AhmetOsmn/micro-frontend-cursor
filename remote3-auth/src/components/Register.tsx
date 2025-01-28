import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { RegisterFormData } from '../types';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required('İsim zorunludur'),
  email: Yup.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta adresi zorunludur'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre zorunludur'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
    .required('Şifre tekrarı zorunludur'),
});

const Register: React.FC = () => {
  const handleSubmit = async (values: RegisterFormData) => {
    try {
      // API çağrısı burada yapılacak
      console.log('Register values:', values);
      toast.success('Kayıt başarılı!');
    } catch (error) {
      toast.error('Kayıt başarısız oldu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Kayıt Ol</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '', passwordConfirm: '' }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">İsim</label>
              <Field
                id="name"
                name="name"
                type="text"
                className={errors.name && touched.name ? 'error' : ''}
              />
              {errors.name && touched.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>

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

            <div className="form-group">
              <label htmlFor="passwordConfirm">Şifre Tekrarı</label>
              <Field
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                className={errors.passwordConfirm && touched.passwordConfirm ? 'error' : ''}
              />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <div className="error-message">{errors.passwordConfirm}</div>
              )}
            </div>

            <button type="submit">Kayıt Ol</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register; 