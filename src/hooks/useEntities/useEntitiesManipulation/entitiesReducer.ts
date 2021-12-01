import { useReducer } from 'react';
import { EntityType, SelectedEntitesType } from '../../../utils/types/App';

interface EntitiesState {
  currentStep: EntityType;
  selected: SelectedEntitesType;
  steps: EntityType[];
}

type EntitiesAction =
  | { type: 'ADD_ITEM'; payload: { id: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'GO_NEXT' }
  | { type: 'GO_BACK' };

const entitiesReducer = (state: EntitiesState, action: EntitiesAction): EntitiesState => {
  const { selected, currentStep, steps } = state;

  if (action.type === 'ADD_ITEM') {
    return {
      ...state,
      selected: {
        ...selected,
        [currentStep]: [...selected[currentStep], action.payload.id],
      },
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    const filtered = selected[currentStep].filter((currentId) => currentId !== action.payload.id);
    return { ...state, selected: { ...selected, [currentStep]: filtered } };
  }

  if (action.type === 'GO_NEXT') {
    return { ...state, currentStep: steps[steps.indexOf(currentStep) + 1] };
  }

  if (action.type === 'GO_BACK') {
    return { ...state, currentStep: steps[steps.indexOf(currentStep) - 1] };
  }

  return state;
};

const generateInitialState = (steps: EntityType[]): EntitiesState => ({
  currentStep: steps[0] ? steps[0] : 'tracks',
  selected: {
    artists: [],
    tracks: [],
  },
  steps,
});

export const useEntitiesReducer = (steps: EntityType[]) =>
  useReducer(entitiesReducer, generateInitialState(steps));

export type { EntityType };
