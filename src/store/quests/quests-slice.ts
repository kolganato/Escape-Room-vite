import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_LEVELS,
  DEFAULT_LEVEL_TYPES,
  Level,
  NameSpace,
  TypeLevel,
} from '../../config';
import { QuestDetails } from '../../types/quest-details';
import { QuestPreview } from '../../types/quest-preview';
import { Reservation } from '../../types/reservation';
import { fetchQuestsAction, fetchReservationAction } from '../api-actions';

export type QuestsState = {
  quests: QuestPreview[];
  questDetails: QuestDetails;
  isQuestsLoading: boolean;
  hasError: boolean;
  currentLevel: Level;
  currentTypeLevel: TypeLevel;
  reservation: Reservation[];
  isReservationLoading: boolean;
};

const initialState: QuestsState = {
  quests: [],
  questDetails: {} as QuestDetails,
  isQuestsLoading: false,
  hasError: false,
  currentLevel: DEFAULT_LEVELS,
  currentTypeLevel: DEFAULT_LEVEL_TYPES,
  reservation: [],
  isReservationLoading: false,
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
} = questsSlice.actions;

export default questsSlice.reducer;
