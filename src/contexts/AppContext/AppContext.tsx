import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EntityItemProps } from '../../components/molecules/EntityItem/EntityItem';
import routes from '../../utils/routes/routes';
import { EntityTypes } from '../../utils/types/App';
import { useToastContext } from '../ToastContext/ToastContext';

type SelectedEntitiesType = { [k in EntityTypes]: string[] };

type Direction = 'next' | 'previous';

type History = ReturnType<typeof useHistory>;

interface AppContextState {
  selectedEntities: SelectedEntitiesType;
  step: EntityTypes;
  handleEntityClick: EntityItemProps['onClick'];
  goToStep: (history: History, direction?: Direction) => void;
  getSelectedEntitiesLength: () => number;
  submitChoices: (history: History) => void;
}

const AppContext = createContext({} as AppContextState);

interface AppProviderProps {
  children: React.ReactChild;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const { showToast } = useToastContext();
  const steps: EntityTypes[] = ['tracks', 'artists', 'genres'];
  const [step, setStep] = useState<EntityTypes>(steps[0]);
  const [selectedEntities, setSelectedEntities] = useState<SelectedEntitiesType>({
    artists: [],
    genres: [],
    tracks: [],
  });

  const MAX_ENTITIES_LENGTH = 5;

  const getSelectedEntitiesLength = () => {
    return Object.values(selectedEntities)
      .map(({ length }) => length)
      .reduce((a, b) => a + b, 0);
  };

  const submitChoices = (history: History) => {
    const selectedEntitiesLength = getSelectedEntitiesLength();

    if (selectedEntitiesLength < 1) showToast('You mast choose at least one entry', 'error');
    else history.push(routes.appPlayer.path);
  };

  const goToStep: AppContextState['goToStep'] = (history, direction = 'next') => {
    const currentStepIndex = steps.indexOf(step);

    const isLastStep = currentStepIndex + 1 === steps.length;
    if (direction === 'next' && isLastStep) submitChoices(history);

    if (direction === 'next') {
      const canGoNext = steps.length > currentStepIndex + 1;
      if (canGoNext) setStep(steps[currentStepIndex + 1]);
    } else {
      const canGoBack = currentStepIndex > 0;
      if (canGoBack) setStep(steps[currentStepIndex - 1]);
    }
  };

  const handleEntityClick: AppContextState['handleEntityClick'] = (e, id) => {
    const canAddMore = getSelectedEntitiesLength() < MAX_ENTITIES_LENGTH;
    if (!selectedEntities[step].includes(id) && canAddMore) {
      setSelectedEntities({ ...selectedEntities, [step]: [...selectedEntities[step], id] });
    } else {
      // unselect clicked item
      const filteredEntities = selectedEntities[step].filter((currentId) => currentId !== id);
      setSelectedEntities({ ...selectedEntities, [step]: [...filteredEntities] });
    }

    if (!canAddMore) showToast("You can't choose more than 5 tracks, artists, genres in total");
  };

  const value: AppContextState = {
    step,
    selectedEntities,
    getSelectedEntitiesLength,
    goToStep,
    handleEntityClick,
    submitChoices,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useAppContext = () => useContext(AppContext);
