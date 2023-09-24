import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_LEVELS,
  DEFAULT_LEVEL_TYPES,
  Level,
  NameSpace,
  Status,
  TypeLevel,
} from '../../config';
import { QuestDetails } from '../../types/quest-details';
import { QuestPreview } from '../../types/quest-preview';
import { fetchBookingAction, fetchQuestDetailsAction, fetchQuestsAction, fetchReservationAction } from '../api-actions';
import { Booking } from '../../types/booking';
import { ReservationDetails } from '../../types/api-types';

export type QuestsState = {
  quests: QuestPreview[];
  questDetails: QuestDetails;
  isQuestsLoading: boolean;
  booking: Booking[];
  currentBookingAddress: Booking;
  hasError: boolean;
  currentLevel: Level;
  currentTypeLevel: TypeLevel;
  reservation: ReservationDetails[];
  isReservationLoading: boolean;
  statusQuestPageData: Status;
  statusBookingPageData: Status;
};

const initialState: QuestsState = {
  quests: [],
  questDetails: {} as QuestDetails,
  isQuestsLoading: false,
  booking: [],
  currentBookingAddress: {} as Booking,
  hasError: false,
  currentLevel: DEFAULT_LEVELS,
  currentTypeLevel: DEFAULT_LEVEL_TYPES,
  reservation: [],
  isReservationLoading: false,
  statusQuestPageData: Status.Idle,
  statusBookingPageData: Status.Idle,
};

const questsSlice = createSlice({
  name: NameSpace.Quests,
  initialState,
  reducers: {
    switchLevel: (state, { payload }: PayloadAction<Level>) => {
      state.currentLevel = payload;
    },
    switchTypeLevel: (state, { payload }: PayloadAction<TypeLevel>) => {
      state.currentTypeLevel = payload;
    },
    setQuestsLoadingStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.isQuestsLoading = payload;
    },
    setReservationLoadingStatus: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isReservationLoading = payload;
    },
    setCurrentLevel: (state, { payload }: PayloadAction<Level>) => {
      state.currentLevel = payload;
    },
    setCurrentTypeLevel: (state, { payload }: PayloadAction<TypeLevel>) => {
      state.currentTypeLevel = payload;
    },
    setCurrentBookingAddress: (state, { payload }: PayloadAction<Booking>) => {
      state.currentBookingAddress = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, { payload }) => {
        state.quests = payload;
        state.isQuestsLoading = true;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.isQuestsLoading = false;
        state.hasError = true;
      })
      .addCase(fetchReservationAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchReservationAction.fulfilled, (state, { payload }) => {
        state.reservation = payload;
        state.isReservationLoading = true;
      })
      .addCase(fetchReservationAction.rejected, (state) => {
        state.isReservationLoading = false;
        state.hasError = true;
      })
      .addCase(fetchQuestDetailsAction.pending, (state) => {
        state.statusQuestPageData = Status.Loading;
      })
      .addCase(fetchQuestDetailsAction.fulfilled, (state, {payload}) => {
        state.questDetails = payload;
        state.statusQuestPageData = Status.Success;
      })
      .addCase(fetchQuestDetailsAction.rejected, (state) => {
        state.statusQuestPageData = Status.Error;
      })
      .addCase(fetchBookingAction.pending, (state) => {
        state.statusQuestPageData = Status.Loading;
      })
      .addCase(fetchBookingAction.fulfilled, (state, {payload}) => {
        state.booking = payload;
        state.currentBookingAddress = payload[0];
        state.statusQuestPageData = Status.Success;
      })
      .addCase(fetchBookingAction.rejected, (state) => {
        state.statusQuestPageData = Status.Error;
      });
  },
});

export const {
  switchLevel,
  switchTypeLevel,
  setQuestsLoadingStatus,
  setReservationLoadingStatus,
  setCurrentLevel,
  setCurrentTypeLevel,
  setCurrentBookingAddress,
} = questsSlice.actions;

export default questsSlice.reducer;
