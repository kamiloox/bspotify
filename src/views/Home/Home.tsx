import Typography from '../../components/atoms/Typography/Typography';
import Button from '../../components/atoms/Button/Button';

const Home = () => (
  <div>
    <Typography weight="bold">Hello Bold</Typography>
    <Typography size="xl">Hello xl</Typography>
    <Typography color="error">Hello error</Typography>
    <Button color="success">success button</Button>
    <Button color="primary">primary button</Button>
  </div>
);

export default Home;
