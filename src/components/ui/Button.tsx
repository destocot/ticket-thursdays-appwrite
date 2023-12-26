import styled from "styled-components";

const ButtonStyles = styled.button`
  font: inherit;
  padding: 0.25rem 1.25rem;
  background: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 0.25rem;
  transition: 0.2s all;
  cursor: pointer;

  &:hover {
    background: #bfdbfe;
    border-color: #bfdbfe;
  }
`;

const PrimaryButton = styled(ButtonStyles)`
  background-color: #3b82f6;
  color: white;

  &:hover {
    background-color: #1d4ed8;
    border-color: #1d4ed8;
  }
`;

const SecondaryButton = styled(ButtonStyles)`
  background-color: #6b7280;
  border-color: #6b7280;
  color: white;

  &:hover {
    background-color: #374151;
    border-color: #374151;
  }
`;

const DestructiveButton = styled(ButtonStyles)`
  background-color: #ef4444;
  border-color: #ef4444;
  color: white;

  &:hover {
    background-color: #b91c1c;
    border-color: #b91c1c;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: "primary" | "secondary" | "destructive";
}

export default function Button({ children, $variant, ...props }: ButtonProps) {
  if ($variant === "primary") {
    return <PrimaryButton {...props}>{children}</PrimaryButton>;
  } else if ($variant === "secondary") {
    return <SecondaryButton {...props}>{children}</SecondaryButton>;
  } else if ($variant === "destructive") {
    return <DestructiveButton {...props}>{children}</DestructiveButton>;
  } else {
    return <ButtonStyles {...props}>{children}</ButtonStyles>;
  }
}
