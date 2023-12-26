import styled from "styled-components";
import { useLocation } from "wouter";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { RootState } from "../store/store";

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  footer {
    margin-top: auto;
    padding: 2rem 0 2rem;
    text-align: center;
    border-top: 1px solid lightgray;
  }
`;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location, navigate] = useLocation();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );
  if (location !== "/" && !authenticated) navigate("/signin");

  return (
    <Container>
      <Header />
      {children}
      <footer>&copy; Khurram Ali | Ticket Thursdays | 2023</footer>
    </Container>
  );
}
