import { Link } from 'react-router-dom';
import { QuestPreview } from '../../types/quest-preview';
import { AppRoute, LEVELS } from '../../config';

type QuestCardProps = {
  quest: QuestPreview;
};

function QuestCard({ quest }: QuestCardProps): JSX.Element {

  const {id, level, peopleMinMax, previewImg, previewImgWebp, title} = quest;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={previewImgWebp}
          />
          <img
            src={previewImg}
            srcSet={previewImg}
            width={344}
            height={232}
            alt="Мужчина в клетке в подземелье."
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`${AppRoute.Quest}/${id}`}>
            {title}
          </Link>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {`${peopleMinMax[0]}-${peopleMinMax[1]}`}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {LEVELS[level]}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuestCard;
