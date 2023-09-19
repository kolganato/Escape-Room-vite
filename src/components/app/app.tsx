import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-route';
import browserHistory from '../../browser-history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../config';
import Layout from '../layout';
import MainPage from '../../pages/main';
import LoginPage from '../../pages/login';
import QuestPage from '../../pages/quest';
import QuestBookingPage from '../../pages/quest-booking';
import ContactsPage from '../../pages/contacts';
import Page404 from '../../pages/404';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />} >
            <Route index element={<MainPage />} />
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Quest} >
              <Route path={`${AppRoute.Quest}/:id`} element={<QuestPage />} />
              <Route path={`${AppRoute.Quest}/:id/booking`} element={<QuestBookingPage />} />
            </Route>
            <Route path={AppRoute.Contacts} element={<ContactsPage />} />
            <Route path={AppRoute.NotFound} element={<Page404 />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
