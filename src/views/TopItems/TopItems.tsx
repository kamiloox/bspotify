import { useState, ChangeEvent } from 'react';
import { css } from 'styled-components';
import { useHistory } from 'react-router';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import TopArtistsList from '../../components/organisms/TopArtistsList/TopArtistsList';
import TextField from '../../components/molecules/TextField/TextField';
import searchIcon from '../../assets/searchIcon.svg';
import TopTracksList from '../../components/organisms/TopTracksList/TopTracksList';
import ListNavigation from '../../components/organisms/ListNavigation/ListNavigation';
import { useToastContext } from '../../contexts/ToastContext/ToastContext';
import { getArrayDictLength } from '../../utils/helpers/helpers';
import routes from '../../utils/routes/routes';
import { SelectedIdsType, Step } from '../../utils/types/App';

const templateCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const steps = ['tracks', 'artists'] as const;

const TopItems = () => {
  const { showToast } = useToastContext();
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);
  const [selectedIds, setSelectedIds] = useState<SelectedIdsType>({
    tracks: [],
    artists: [],
  });

  const handleFilterItems = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const addItem = (id: string) => {
    const selectedLength = getArrayDictLength(selectedIds);
    const MAX_SELECTED_LENGTH = 5;
    if (selectedLength >= MAX_SELECTED_LENGTH)
      showToast("You can't choose more than 5 tracks and artists in total");
    else setSelectedIds({ ...selectedIds, [currentStep]: [...selectedIds[currentStep], id] });
  };

  const removeItem = (id: string) => {
    const newSelectedIds = selectedIds[currentStep].filter((selectedId) => selectedId !== id);
    setSelectedIds({ ...selectedIds, [currentStep]: newSelectedIds });
  };

  const handleItemClick = (id: string) => {
    if (selectedIds[currentStep].includes(id)) removeItem(id);
    else addItem(id);
  };

  const handleGoNext = () => {
    const canGoNext = steps.indexOf(currentStep) < steps.length - 1;
    if (canGoNext) setCurrentStep(steps[steps.indexOf(currentStep) + 1]);
  };

  const handleGoBack = () => {
    const canGoBack = steps.indexOf(currentStep) > 0;
    if (canGoBack) setCurrentStep(steps[steps.indexOf(currentStep) - 1]);
  };

  const submitChoices = () => {
    const canSubmit = getArrayDictLength(selectedIds) > 0;
    if (canSubmit) history.push(routes.appPlayer.path, { selectedIds });
    else showToast('Select at least one track or artist to go further');
  };

  const currentList =
    currentStep === 'tracks' ? (
      <TopTracksList
        onItemClick={handleItemClick}
        searchText={searchText}
        selectedIds={selectedIds.tracks}
      />
    ) : (
      <TopArtistsList
        onItemClick={handleItemClick}
        searchText={searchText}
        selectedIds={selectedIds.artists}
      />
    );

  return (
    <MainTemplate padding="7px 20px" viewportHeight css={templateCss}>
      <TextField
        id="search"
        onChange={handleFilterItems}
        label={`Search ${currentStep}`}
        iconSrc={searchIcon}
      />
      {currentList}
      <ListNavigation onGoNext={handleGoNext} onGoBack={handleGoBack} onClickSubmit={submitChoices} />
    </MainTemplate>
  );
};

export default TopItems;
