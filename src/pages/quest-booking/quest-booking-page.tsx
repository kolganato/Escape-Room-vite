import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getBooking,
  getCurrentBookingAddress,
  getQuestDetails,
  getStatusBooking,
} from '../../store/quests/selector';
import {
  bookingQuestAction,
  fetchBookingAction,
  fetchQuestDetailsAction,
} from '../../store/api-actions';
import { useEffect, useRef } from 'react';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner';
import { setCurrentBookingAddress, setStatusBooking } from '../../store/quests/quests-slice';
import { Booking } from '../../types/booking';
import { useForm, SubmitHandler } from 'react-hook-form';
import { formateDateForPost, formateTimeForForm } from '../../utils/common';
import { redirectToRoute } from '../../store/actions';
import { AppRoute, Status } from '../../config';

type FormData = {
  date: string;
  contactPerson: string;
  phone: string;
  peopleCount: number;
  withChildren: boolean;
  placeId: Booking['id'];
};

function QuestBookingPage(): JSX.Element {
  const questId = useParams().id as string;
  const dispatch = useAppDispatch();
  const booking = useAppSelector(getBooking);
  const bookingAddress = useAppSelector(getCurrentBookingAddress);
  const statusBooking = useAppSelector(getStatusBooking);
  const { register, handleSubmit } = useForm<FormData>();

  const nameRef = useRef();
  const phoneRef = useRef();

  // const nameReg = /^[а-яА-ЯёЁa-zA-Z'- ]{1,}$/;
  // const passwordReg = /^[0-9]{10,}$/;

  useEffect(() => {
    if (questId) {
      dispatch(fetchQuestDetailsAction(questId));
      dispatch(fetchBookingAction(questId));
    }
  }, [questId, dispatch]);

  useEffect(() => {
    if (statusBooking === Status.Success) {
      dispatch(redirectToRoute(AppRoute.MyQuests));
      dispatch(setStatusBooking(Status.Idle));
    }
  }, [statusBooking, dispatch]);

  const questDetails = useAppSelector(getQuestDetails);

  const { coverImg, coverImgWebp, previewImg, previewImgWebp, title, peopleMinMax } =
    questDetails;

  if (booking.length === 0) {
    return <Spinner />;
  }

  const handleClickMarker = (id: Booking['id']) => {
    const newBookingAddress = booking.find((address) => address.id === id);

    if (newBookingAddress) {
      dispatch(setCurrentBookingAddress(newBookingAddress));
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    const date = formateDateForPost(data.date);

    const preparedData = {
      ...data,
      date: date.date,
      time: date.time,
      peopleCount: Number(data.peopleCount),
    };

    dispatch(
      bookingQuestAction({
        formData: preparedData,
        id: questId,
      })
    );
  };

  return (
    bookingAddress && (
      <main className="page-content decorated-page">
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
              height={1959}
              alt=""
            />
          </picture>
        </div>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">
              Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">
              {title}
            </p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                {bookingAddress && (
                  <Map
                    booking={booking}
                    location={bookingAddress.location}
                    selectedIdAddress={bookingAddress.id}
                    onClickMarker={handleClickMarker}
                  />
                )}
              </div>
              <p className="booking-map__address">
                Вы&nbsp;выбрали: {bookingAddress.location.address}
              </p>
            </div>
          </div>
          <form
            className="booking-form"
            action="https://echo.htmlacademy.ru/"
            method="post"
            onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}
          >
            <input
              type="hidden"
              {...register('placeId')}
              defaultValue={bookingAddress.id}
            />
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Сегодня</legend>
                <div className="booking-form__date-inner-wrapper">
                  {bookingAddress.slots.today.map(({ time, isAvailable }) => (
                    <label
                      className="custom-radio booking-form__date"
                      key={time}
                    >
                      <input
                        type="radio"
                        id={`today${formateTimeForForm(time)}`}
                        {...register('date')}
                        required
                        defaultValue={`today${formateTimeForForm(time)}`}
                        disabled={!isAvailable}
                      />
                      <span className="custom-radio__label">{time}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Завтра</legend>
                <div className="booking-form__date-inner-wrapper">
                  {bookingAddress.slots.today.map(({ time, isAvailable }) => (
                    <label
                      className="custom-radio booking-form__date"
                      key={time}
                    >
                      <input
                        type="radio"
                        id={`tomorrow${formateTimeForForm(time)}`}
                        {...register('date')}
                        required
                        defaultValue={`tomorrow${formateTimeForForm(time)}`}
                        disabled={!isAvailable}
                      />
                      <span className="custom-radio__label">{time}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Контактная информация</legend>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="name">
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('contactPerson')}
                  placeholder="Имя"
                  required
                  pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">
                  Контактный телефон
                </label>
                <input
                  type="tel"
                  id="tel"
                  {...register('phone')}
                  placeholder="Телефон"
                  required
                  pattern="[0-9]{10,}"
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">
                  Количество участников
                </label>
                <input
                  type="number"
                  id="person"
                  {...register('peopleCount')}
                  placeholder="Количество участников"
                  required
                  min={peopleMinMax && peopleMinMax[0]}
                  max={peopleMinMax && peopleMinMax[1]}
                />
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input
                  type="checkbox"
                  id="children"
                  {...register('withChildren')}
                />
                <span className="custom-checkbox__icon">
                  <svg width={20} height={17} aria-hidden="true">
                    <use xlinkHref="#icon-tick" />
                  </svg>
                </span>
                <span className="custom-checkbox__label">
                  Со&nbsp;мной будут дети
                </span>
              </label>
            </fieldset>
            <button
              className="btn btn--accent btn--cta booking-form__submit"
              type="submit"
            >
              Забронировать
            </button>
            {statusBooking === Status.Error && (
              <p>Не удалось забронировать квест</p>
            )}
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
              <input
                type="checkbox"
                id="id-order-agreement"
                name="user-agreement"
                defaultChecked
                required
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
          </form>
        </div>
      </main>
    )
  );
}

export default QuestBookingPage;
