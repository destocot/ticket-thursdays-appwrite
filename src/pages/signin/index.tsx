import styled from "styled-components";
import AuthLayout from "../../layouts/AuthLayout";
import { Link, useLocation } from "wouter";
import authService from "../../appwrite/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { grantAdminAccess, signin } from "../../store/authSlice";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 500px;
`;

const Error = styled.p`
  color: #ef4444;
`;

export default function SigninPage() {
  const dispatch = useDispatch();
  const [, navigate] = useLocation();
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authService.createEmailSession(
      email,
      password
    );
    if (error) {
      setError(error);
      return;
    }

    if (data) {
      dispatch(signin({ userId: data.$id, userEmail: data.providerUid }));
      const res = await authService.listTeams();
      if (res.data?.teams.find((e) => e.name === "Administrators")) {
        dispatch(grantAdminAccess());
      }
      navigate("/");
    }
  };

  return (
    <AuthLayout>
      <div>
        <h1>Sign In</h1>
        <Form onSubmit={submit}>
          {error && <Error>{error}</Error>}
          <Input
            type="text"
            label="Email"
            placeholder="Enter your email..."
            name="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password..."
            name="password"
          />
          <Button $variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p>
          Don&apos;t have an account? Sign-up&nbsp;{" "}
          <Link to="/signup">here</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
