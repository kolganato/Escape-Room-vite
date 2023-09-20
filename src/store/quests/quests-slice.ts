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
      });
  },
});

export const {switchLevel, switchTypeLevel, setQuestsLoadingStatus, setReservationLoadingStatus} = questsSlice.actions;

export default questsSlice.reducer;