import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingStyles = styled.div`
  display: grid;
  place-items: center;
  margin-top: 5rem;

  div {
    width: 50px;
    height: 50px;
    border-top: 4px solid #3b82f6;
    border-right: 4px solid #3b82f6;
    border-bottom: 4px solid black;
    border-left: 4px solid black;
    border-radius: 100%;
    animation: ${rotate} 2s linear infinite;
  }
`;

export default function Loading() {
  return (
    <LoadingStyles>
      <div></div>
    </LoadingStyles>
  );
}
