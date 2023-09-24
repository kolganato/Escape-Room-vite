import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';

function Page404(): JSX.Element {
  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">
            квесты в Санкт-Петербурге
          </h1>
          <h2>Страница не найдена</h2>
        </div>
        <Link to={AppRoute.Root} className="link">
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}

export default Page404;
