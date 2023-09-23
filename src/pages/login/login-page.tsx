import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormEvent, useRef, useEffect, useState } from 'react';
import { redirectToRoute } from '../../store/actions';
import { AppRoute, AuthorizationStatus, Status } from '../../config';
import {
  getAuthorizationStatus,
  getLoginStatus,
} from '../../store/user/selector';
import { setLoginStatus } from '../../store/user/user-slice';
import { loginAction } from '../../store/api-actions';
import { Helmet } from 'react-helmet-async';
import browserHistory from '../../browser-history';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const agreementRef = useRef<HTMLInputElement | null>(null);

  const loginStatus = useAppSelector(getLoginStatus);
  const authStatus = useAppSelector(getAuthorizationStatus);

  const loginRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;

  const [isCorrectLogin, setIsCorrectLogin] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);
  const [isCorrectAgreement, setIsCorrectAgreement] = useState(true);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      browserHistory.back();
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, authStatus]);

  useEffect(() => {
    if (
      loginStatus === Status.Success &&
      loginRef.current &&
      passwordRef.current &&
      agreementRef.current
    ) {
      dispatch(setLoginStatus(Status.Idle));
      loginRef.current.value = '';
      passwordRef.current.value = '';
      agreementRef.current.value = '';
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, loginStatus]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsCorrectLogin(true);
    setIsCorrectPassword(true);
    setIsCorrectAgreement(true);

    if (
      loginRef.current !== null &&
      passwordRef.current !== null &&
      agreementRef.current !== null
    ) {
      if (!passwordRegex.test(passwordRef.current.value)) {
        setIsCorrectPassword(false);
        return;
      }

      if (!loginRegex.test(loginRef.current.value)) {
        setIsCorrectLogin(false);
        return;
      }

      if (!agreementRef.current.checked) {
        setIsCorrectAgreement(false);
        return;
      }

      dispatch(
        loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
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
            onSubmit={handleSubmit}
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
                    name="email"
                    placeholder="Адрес электронной почты"
                    required
                    ref={loginRef}
                  />
                  {!isCorrectLogin && (
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
                    name="password"
                    placeholder="Пароль"
                    required
                    ref={passwordRef}
                  />
                  {!isCorrectPassword && (
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
                ref={agreementRef}
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
            {!isCorrectAgreement && (
              <p
                style={{
                  color: 'red',
                  fontSize: '14px',
                }}
              >
                Необходимо согласиться
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
