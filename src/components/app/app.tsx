import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
