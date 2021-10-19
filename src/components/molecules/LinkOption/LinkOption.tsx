import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRightCircle } from '@styled-icons/bootstrap';
import Typography from '../../atoms/Typography/Typography';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.black};
  padding: 14px 20px 14px 25px;
  border-radius: 8px;
  text-decoration: none;

  &:hover {
    filter: brightness(80%);
  }
`;

const StyledArrow = styled(ArrowRightCircle)`
  color: ${({ theme }) => theme.color.white};
`;

const StyledTypography = styled(Typography)`
  flex: 1;
  margin-right: 15px;
`;

interface LinkOptionProps extends LinkProps {}

const LinkOption = (props: LinkOptionProps) => (
  <Wrapper as={Link} {...props}>
    <StyledTypography color="white" weight="medium">
      {props.children}
    </StyledTypography>
    <StyledArrow size={24} />
  </Wrapper>
);

export default LinkOption;
