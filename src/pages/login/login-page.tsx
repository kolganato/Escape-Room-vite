import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { redirectToRoute } from '../../store/actions';
import { AppRoute, AuthorizationStatus, Status } from '../../config';
import {
  getAuthorizationStatus,
  getLoginStatus,
} from '../../store/user/selector';
import { setLoginStatus } from '../../store/user/user-slice';
import { loginAction } from '../../store/api-actions';
import { Helmet } from 'react-helmet-async';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthData } from '../../types/auth-data';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const loginStatus = useAppSelector(getLoginStatus);
  const authStatus = useAppSelector(getAuthorizationStatus);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>();

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, authStatus]);

  useEffect(() => {
    if (loginStatus === Status.Success) {
      dispatch(setLoginStatus(Status.Idle));
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, loginStatus]);

  const onSubmit: SubmitHandler<AuthData> = (data: AuthData) => {
    dispatch(
      loginAction({
        login: data.login,
        password: data.password,
      })
    );
  };

  return (
    <main className="decorated-page login">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-size-m.jpg"
            srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
            width={1366}
            height={768}
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="login__form">
          <form
            className="login-form"
            action="https://echo.htmlacademy.ru/"
            method="post"
            onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}
          >
            <div className="login-form__inner-wrapper">
              <h1 className="title title--size-s login-form__title">Вход</h1>
              <div className="login-form__inputs">
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="email">
                    E&nbsp;–&nbsp;mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('login', {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                    placeholder="Адрес электронной почты"
                    required
                  />
                  {errors.login && (
                    <p
                      style={{
                        color: 'red',
                        fontSize: '14px',
                      }}
                    >
                      Введите валидный email
                    </p>
                  )}
                </div>
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="password">
                    Пароль
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register('password', {
                      required: true,
                      pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/,
                    })}
                    placeholder="Пароль"
                    required
                  />
                  {errors.password && (
                    <p
                      style={{
                        color: 'red',
                        fontSize: '14px',
                      }}
                    >
                      Минимум 1 буква и 1 цифра без пробелов
                    </p>
                  )}
                </div>
              </div>
              <button
                className="btn btn--accent btn--general login-form__submit"
                type="submit"
              >
                Войти
              </button>
            </div>
            <label className="custom-checkbox login-form__checkbox">
              <input
                type="checkbox"
                id="id-order-agreement"
                name="user-agreement"
                required
                defaultChecked
              />
              <span className="custom-checkbox__icon">
                <svg width={20} height={17} aria-hidden="true">
                  <use xlinkHref="#icon-tick" />
                </svg>
              </span>
              <span className="custom-checkbox__label">
                Я&nbsp;согласен с
                <a
                  className="link link--active-silver link--underlined"
                  href="#"
                >
                  правилами обработки персональных данных
                </a>
                &nbsp;и пользовательским соглашением
              </span>
            </label>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
