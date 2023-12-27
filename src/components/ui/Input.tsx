import styled from "styled-components";

const InputStyles = styled.div`
  input {
    width: 100%;
    padding: 0.25rem 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: 0.2s all;
    margin: 0.25rem 0;

    &:focus {
      border-color: #bfdbfe;
      outline: 0;
      box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    }
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  type = "text",
  label,
  placeholder,
  ...props
}: InputProps) {
  console.log(props);
  return (
    <InputStyles>
      <label>
        {label}
        <input type={type} placeholder={placeholder} {...props} />
      </label>{" "}
    </InputStyles>
  );
}
