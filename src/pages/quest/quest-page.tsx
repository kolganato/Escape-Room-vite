import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getQuestDetails } from '../../store/quests/selector';
import { useEffect } from 'react';
import { fetchQuestDetailsAction } from '../../store/api-actions';
import { APIRoute, LEVELS, LEVEL_TYPES } from '../../config';

function QuestPage(): JSX.Element {
  const questId = useParams().id as string;
  const dispatch = useAppDispatch();
  const questDetails = useAppSelector(getQuestDetails);

  useEffect(() => {
    if (questId) {
      dispatch(fetchQuestDetailsAction(questId));
    }
  }, [questId, dispatch]);

  const {
    coverImg,
    coverImgWebp,
    description,
    level,
    peopleMinMax,
    previewImg,
    previewImgWebp,
    title,
    type,
  } = questDetails;

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${coverImgWebp} 2x`}
          />
          <img
            src={previewImg}
            srcSet={coverImg}
            width={1366}
            height={768}
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">
            {title}
          </h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>
            {LEVEL_TYPES[type]}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width={11} height={14} aria-hidden="true">
                <use xlinkHref="#icon-person" />
              </svg>
              {peopleMinMax && `${peopleMinMax[0]}-${peopleMinMax[1]}`}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width={14} height={14} aria-hidden="true">
                <use xlinkHref="#icon-level" />
              </svg>
              {LEVELS[level]}
            </li>
          </ul>
          <p className="quest-page__description">{description}</p>
          <Link
            className="btn btn--accent btn--cta quest-page__btn"
            to={`${APIRoute.Quest}/${questId}/booking`}
          >
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
}

export default QuestPage;
