import { useLocation } from 'react-router-dom';
import TextField from '../../components/molecules/TextField/TextField';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';

const SelectHints = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <MainTemplate>
      <TextField id="search" label="Search item" />
    </MainTemplate>
  );
};

export default SelectHints;
