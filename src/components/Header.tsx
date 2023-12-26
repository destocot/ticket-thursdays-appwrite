import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useLocation } from "wouter";
import { RootState } from "../store/store";
import authService from "../appwrite/auth";
import { signout } from "../store/authSlice";
import Button from "./ui/Button";
import { useState } from "react";
import CreateTicketForm from "./CreateTicketForm";

const HeaderStyles = styled.header`
  padding: 1rem 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 3rem;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.25rem;
`;

export default function Header() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [, navigate] = useLocation();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const links: {
    to: string;
    label: string;
    display: boolean;
    variant?: "primary" | "secondary" | "destructive";
  }[] = [
    { to: "/", label: "Home", display: true, variant: "primary" },
    {
      to: "/signin",
      label: "Sign In",
      display: !authenticated,
      variant: "secondary",
    },
    {
      to: "/signup",
      label: "Sign Up",
      display: !authenticated,
    },
    {
      to: "/tickets",
      label: "Tickets",
      display: authenticated,
      variant: "primary",
    },
    {
      to: "/admin",
      label: "Admin",
      display: authenticated && isAdmin,
      variant: "destructive",
    },
  ];

  return (
    <HeaderStyles>
      <Nav>
        <h1>TicketThursdays</h1>
        <NavLinks>
          {links.map(({ to, label, display, variant }) => {
            return display ? (
              <li key={label}>
                <Link to={to}>
                  <Button $variant={variant}>{label}</Button>
                </Link>
              </li>
            ) : null;
          })}
          {authenticated && (
            <>
              <li>
                <Button $variant="secondary" onClick={() => setModal(true)}>
                  Create
                </Button>
              </li>
              <li>
                <Button
                  onClick={async () => {
                    const session = await authService.getSession();
                    if (!session) return;
                    const res = await authService.deleteSession(session.$id);
                    if (res) {
                      dispatch(signout());
                      navigate("/");
                    }
                  }}
                >
                  Sign Out
                </Button>
              </li>
            </>
          )}
        </NavLinks>
      </Nav>
      {modal && <CreateTicketForm setModal={setModal} />}
    </HeaderStyles>
  );
}
