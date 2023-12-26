import styled from "styled-components";
import { useLocation } from "wouter";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, navigate] = useLocation();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );
  if (authenticated) navigate("/");

  return <Container>{children}</Container>;
}
