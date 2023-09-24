import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getReservations } from '../../store/quests/selector';
import { AppRoute, DAYS_RU, LEVELS } from '../../config';

function MyQuestsPage(): JSX.Element {
  const reservations = useAppSelector(getReservations);

  console.log(reservations);

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-bg-size-m.jpg"
            srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
            width={1366}
            height={1959}
            alt=""
          />
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">
            Мои бронирования
          </h1>
        </div>
        <div className="cards-grid">
          {reservations &&
            reservations.map((reservation) => (
              <div className="quest-card" key={reservation.id}>
                <div className="quest-card__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={reservation.quest.previewImgWebp}
                    />
                    <img
                      src={reservation.quest.previewImg}
                      width={344}
                      height={232}
                    />
                  </picture>
                </div>
                <div className="quest-card__content">
                  <div className="quest-card__info-wrapper">
                    <Link className="quest-card__link" to={`${AppRoute.Quest}/${reservation.quest.id}`}>
                      {reservation.quest.title}
                    </Link>
                    <span className="quest-card__info">
                      {`[${DAYS_RU[reservation.date]}, ${reservation.location.address}]`}
                    </span>
                  </div>
                  <ul className="tags quest-card__tags">
                    <li className="tags__item">
                      <svg width={11} height={14} aria-hidden="true">
                        <use xlinkHref="#icon-person" />
                      </svg>
                      {reservation.peopleCount}&nbsp;чел
                    </li>
                    <li className="tags__item">
                      <svg width={14} height={14} aria-hidden="true">
                        <use xlinkHref="#icon-level" />
                      </svg>
                      {LEVELS[reservation.quest.level]}
                    </li>
                  </ul>
                  <button
                    className="btn btn--accent btn--secondary quest-card__btn"
                    type="button"
                  >
                    Отменить
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default MyQuestsPage;
