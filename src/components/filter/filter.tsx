import { LEVELS, LEVEL_TYPES, Level, TypeLevel } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentLevel, setCurrentTypeLevel } from '../../store/quests/quests-slice';
import {
  getCurrentLevel,
  getCurrentTypeLevel,
} from '../../store/quests/selector';
import { useForm } from 'react-hook-form';

type FormData = {
  level: Level;
  type: TypeLevel;
};

function Filter(): JSX.Element {
  const currentLevel = useAppSelector(getCurrentLevel);
  const currentTypeLevel = useAppSelector(getCurrentTypeLevel);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormData>();

  const onChange = (data: FormData): void => {
    dispatch(setCurrentLevel(data.level));
    dispatch(setCurrentTypeLevel(data.type));
  };

  return (
    <form
      className="filter"
      onChange={handleSubmit(onChange)}
    >
      <fieldset className="filter__section">
        <legend className="visually-hidden">Тематика</legend>
        <ul className="filter__list">
          {Array.from(Object.entries(LEVEL_TYPES)).map(([type, value]) => (
            <li className="filter__item" key={type}>
              {currentTypeLevel === type && (
                <input
                  {...register('type')}
                  type="radio"
                  // name="type"
                  id={type}
                  value={type}
                  defaultChecked
                />
              )}
              {currentTypeLevel !== type && (
                <input
                  type="radio"
                  // name="type"
                  {...register('type')}
                  id={type}
                  value={type}
                />
              )}
              <label className="filter__label" htmlFor={type}>
                <svg
                  className="filter__icon"
                  width={26}
                  height={30}
                  aria-hidden="true"
                >
                  <use xlinkHref={`#icon-${type}`} />
                </svg>
                <span className="filter__label-text">{value}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset className="filter__section">
        <legend className="visually-hidden">Сложность</legend>
        <ul className="filter__list">
          {Array.from(Object.entries(LEVELS)).map(([level, value]) => (
            <li className="filter__item" key={level}>
              {currentLevel === level && (
                <input
                  type="radio"
                  // name="level"
                  id={level}
                  value={level}
                  defaultChecked
                  {...register('level')}
                />
              )}
              {currentLevel !== level && (
                <input
                  type="radio"
                  // name="level"
                  id={level}
                  value={level}
                  {...register('level')}
                />
              )}
              <label className="filter__label" htmlFor={level}>
                <span className="filter__label-text">{value}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
}

export default Filter;
