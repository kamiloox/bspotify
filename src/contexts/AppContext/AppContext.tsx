import React, { createContext, useContext, useState } from 'react';
import { EntityItemProps } from '../../components/molecules/EntityItem/EntityItem';
import { EntityTypes } from '../../utils/types/App';

type SelectedEntitiesType = { [k in EntityTypes]: string[] };

interface AppContextState {
  selectedEntities: SelectedEntitiesType;
  step: EntityTypes;
  handleEntityClick: EntityItemProps['onClick'];
  goToNextStep: () => void;
}

const AppContext = createContext({} as AppContextState);

interface AppProviderProps {
  children: React.ReactChild;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const steps: EntityTypes[] = ['tracks', 'artists', 'genres'];
  const [step, setStep] = useState<EntityTypes>(steps[0]);
  const [selectedEntities, setSelectedEntities] = useState<SelectedEntitiesType>({
    artists: [],
    genres: [],
    tracks: [],
  });

  const goToNextStep = () => {
    const currentStep = steps.indexOf(step);
    if (steps.length > currentStep + 1) setStep(steps[currentStep + 1]);
    else console.log('submit choices');
  };

  const handleEntityClick: EntityItemProps['onClick'] = (e, id) => {
    const MAX_LENGTH = 5;
    if (!selectedEntities[step].includes(id) && selectedEntities[step].length < MAX_LENGTH) {
      setSelectedEntities({ ...selectedEntities, [step]: [...selectedEntities[step], id] });
    } else {
      const filteredEntities = selectedEntities[step].filter((currentId) => currentId !== id);
      setSelectedEntities({ ...selectedEntities, [step]: [...filteredEntities] });
    }
  };

  const value: AppContextState = {
    step,
    selectedEntities,
    goToNextStep,
    handleEntityClick,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useAppContext = () => useContext(AppContext);
