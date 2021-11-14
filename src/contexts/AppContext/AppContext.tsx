import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../../utils/routes/routes';
import { EntityType } from '../../utils/types/App';
import { useToastContext } from '../ToastContext/ToastContext';

type SelectedEntitiesType = { [k in EntityType]: string[] };

type Direction = 'next' | 'previous';

type History = ReturnType<typeof useHistory>;

interface AppContextState {
  selectedEntities: SelectedEntitiesType;
  step: EntityType;
  handleItemClick: (id: string) => void;
  goToStep: (history: History, direction?: Direction) => void;
  submitChoices: (history: History) => void;
}

const AppContext = createContext({} as AppContextState);

interface AppProviderProps {
  children: React.ReactChild;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const { showToast } = useToastContext();
  const steps: EntityType[] = ['tracks', 'artists'];
  const [step, setStep] = useState<EntityType>(steps[0]);
  const [selectedEntities, setSelectedEntities] = useState<SelectedEntitiesType>({
    artists: [],
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

  const goNext = () => {
    const isAllowed = steps.length > steps.indexOf(step) + 1;
    if (isAllowed) setStep(steps[steps.indexOf(step) + 1]);
  };

  const goBack = () => {
    const isAllowed = steps.indexOf(step) > 0;
    if (isAllowed) setStep(steps[steps.indexOf(step) - 1]);
  };

  const goToStep = (history: History, direction: Direction = 'next') => {
    const isLastStep = steps.indexOf(step) + 1 === steps.length;
    if (direction === 'next' && isLastStep) submitChoices(history);

    if (direction === 'next') goNext();
    else goBack();
  };

  const removeItem = (id: string) => {
    const filteredEntities = selectedEntities[step].filter((currentId) => currentId !== id);
    setSelectedEntities({ ...selectedEntities, [step]: [...filteredEntities] });
  };

  const addItem = (id: string) => {
    const canAddMore = getSelectedEntitiesLength() < MAX_ENTITIES_LENGTH;
    if (canAddMore) {
      setSelectedEntities({ ...selectedEntities, [step]: [...selectedEntities[step], id] });
    } else showToast("You can't choose more than 5 tracks and artists in total");
  };

  const handleItemClick = (id: string) => {
    if (!selectedEntities[step].includes(id)) addItem(id);
    else removeItem(id);
  };

  const value: AppContextState = {
    step,
    selectedEntities,
    goToStep,
    handleItemClick,
    submitChoices,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useAppContext = () => useContext(AppContext);
