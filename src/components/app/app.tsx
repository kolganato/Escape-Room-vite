import browserHistory from '../../browser-history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../config';
import Layout from '../layout';
import MainPage from '../../pages/main';
import LoginPage from '../../pages/login';
import QuestPage from '../../pages/quest';
import QuestBookingPage from '../../pages/quest-booking';
import ContactsPage from '../../pages/contacts';
import Page404 from '../../pages/404';
import PrivateRoute from '../private-route';
import MyQuestsPage from '../../pages/my-quests';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user/selector';
import { useEffect } from 'react';
import {
  fetchQuestsAction,
  fetchReservationAction,
} from '../../store/api-actions';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-route';
import { getIsQuestsLoading } from '../../store/quests/selector';
import Spinner from '../spinner';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isQuestsLoading = useAppSelector(getIsQuestsLoading);

  useEffect(() => {
    dispatch(fetchQuestsAction());
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchReservationAction());
    }
  }, [dispatch, authStatus]);

  if(authStatus === AuthorizationStatus.Unknown || !isQuestsLoading){
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route
              path={AppRoute.Login}
              element={
                <LoginPage />
              }
            />
            <Route path={AppRoute.Quest}>
              <Route path={`${AppRoute.Quest}/:id`} element={<QuestPage />} />
              <Route
                path={`${AppRoute.Quest}/:id/booking`}
                element={<QuestBookingPage />}
              />
            </Route>
            <Route path={AppRoute.Contacts} element={<ContactsPage />} />
            <Route path={AppRoute.NotFound} element={<Page404 />} />
            <Route
              path={AppRoute.MyQuests}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <MyQuestsPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
