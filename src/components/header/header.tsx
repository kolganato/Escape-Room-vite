import { Link, NavLink } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user/selector';
import { logoutAction } from '../../store/api-actions';
import classNames from 'classnames';
import browserHistory from '../../browser-history';
import { useState } from 'react';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;

  const [currentPage, setCurrentPage] = useState(location.pathname);

  return (
    <header className="header">
      <div className="container container--size-l">
        <Link to={AppRoute.Root} className="logo header__logo">
          <svg width={134} height={52} aria-hidden="true">
            <use xlinkHref="#logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink
                className={({ isActive }) => isActive ? 'link active' : 'link'}
                to={AppRoute.Root}
              >
                Квесты
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                className={({ isActive }) => isActive ? 'link active' : 'link'}
                to={AppRoute.Contacts}
              >
                Контакты
              </NavLink>
            </li>
            {isAuth && (
              <li className="main-nav__item">
                <NavLink
                  className={({ isActive }) => isActive ? 'link active' : 'link'}
                  to={AppRoute.MyQuests}
                >
                  Мои бронирования
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="header__side-nav">
          {isAuth && (
            <Link
              className="btn btn--accent header__side-item"
              to="#"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >
              Выйти
            </Link>
          )}
          {!isAuth && (
            <Link
              className="btn header__side-item header__login-btn"
              to={AppRoute.Login}
            >
              Вход
            </Link>
          )}
          <Link
            className="link header__side-item header__phone-link"
            to="tel:88003335599"
          >
            8 (000) 111-11-11
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
