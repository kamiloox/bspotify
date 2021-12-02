import { useHistory } from 'react-router';
import { useToastContext } from '../../../contexts/ToastContext/ToastContext';
import { useEntitiesReducer, EntityType } from './entitiesReducer';
import routes from '../../../utils/routes/routes';
import { getArrayDictLength } from '../../../utils/helpers/helpers';

const MAX_SELECTED_LENGTH = 5;

const useEntitiesManipulation = (steps: EntityType[]) => {
  const [state, dispatch] = useEntitiesReducer(steps);
  const { currentStep, selected } = state;
  const { showToast } = useToastContext();
  const history = useHistory();

  const getSelectedLength = () => getArrayDictLength(selected);

  const addItem = (id: string) => {
    const canAddMore = getSelectedLength() < MAX_SELECTED_LENGTH;
    if (canAddMore) dispatch({ type: 'ADD_ITEM', payload: { id } });
    else showToast("You can't choose more than 5 tracks and artists in total");
  };

  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });

  const goNext = () => {
    const isAllowed = steps.length > steps.indexOf(currentStep) + 1;
    if (isAllowed) dispatch({ type: 'GO_NEXT' });
  };

  const goBack = () => {
    const isAllowed = steps.indexOf(currentStep) > 0;
    if (isAllowed) dispatch({ type: 'GO_BACK' });
  };

  const submitChoices = () => {
    const canSubmit = getSelectedLength() > 0;
    if (canSubmit) history.push(routes.appPlayer.path, { selected });
    else showToast('Select at least one track or artist to go further');
  };

  const handleItemClick = (id: string) => {
    if (!selected[currentStep].includes(id)) addItem(id);
    else removeItem(id);
  };

  return { ...state, handleItemClick, goNext, goBack, submitChoices };
};

export default useEntitiesManipulation;
