import { createSelector } from '@reduxjs/toolkit';
import { State } from '..';
import { Level, NameSpace, TypeLevel } from '../../config';
import { QuestsState } from './quests-slice';

export const getQuests = createSelector(
  (state: Pick<State, NameSpace.Quests>) => state[NameSpace.Quests],
  (state: QuestsState) =>
    state.quests
      .filter((quest) => {
        if (state.currentLevel === Level.All) {
          return quest;
        }
        return quest.level === state.currentLevel;
      })
      .filter((quest) => {
        if (state.currentTypeLevel === TypeLevel.All) {
          return quest;
        }
        return quest.type === state.currentTypeLevel;
      })
);

export const getCurrentLevel = createSelector(
  (state: Pick<State, NameSpace.Quests>) => state[NameSpace.Quests],
  (state: QuestsState) => state.currentLevel
);

export const getCurrentTypeLevel = createSelector(
  (state: Pick<State, NameSpace.Quests>) => state[NameSpace.Quests],
  (state: QuestsState) => state.currentTypeLevel
);

export const getQuestDetails = createSelector(
  (state: Pick<State, NameSpace.Quests>) => state[NameSpace.Quests],
  (state: QuestsState) => state.questDetails
);

export const getIsQuestsLoading = createSelector(
  (state: Pick<State, NameSpace.Quests>) => state[NameSpace.Quests],
  (state: QuestsState) => state.isQuestsLoading
);

