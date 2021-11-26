import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

interface ProgressProps {
  center?: boolean;
}

const Progress = styled.div<ProgressProps>`
  border: 6px solid ${({ theme }) => theme.color.black};
  border-top-color: ${({ theme }) => theme.color.white};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite;

  ${({ center = false }) =>
    center &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -20px 0 0 -20px;
    `}
`;

export default Progress;
