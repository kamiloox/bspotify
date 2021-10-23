import { useLocation } from 'react-router-dom';
import TextField from '../../components/molecules/TextField/TextField';
import EntitiesList from '../../components/organisms/EntitiesList/EntitiesList';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';

const EntitiesSelect = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <MainTemplate>
      <TextField id="search" label="Search item" />
      <EntitiesList />
    </MainTemplate>
  );
};

export default EntitiesSelect;
