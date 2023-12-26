import styled from "styled-components";
import AuthLayout from "../../layouts/AuthLayout";
import { Link, useLocation } from "wouter";
import authService from "../../appwrite/auth";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Error = styled.p`
  color: #ef4444;
  max-width: 35ch;
`;

export default function SignupPage() {
  const [, navigate] = useLocation();
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authService.createAccount(email, password);
    if (error) {
      setError(error);
      return;
    }

    if (data) {
      navigate("/signin");
    }
  };

  return (
    <AuthLayout>
      <div>
        <h1>Sign Up</h1>
        <Form onSubmit={submit}>
          {error && <Error>{error}</Error>}
          <Input
            label="Email"
            type="text"
            placeholder="Enter an email"
            name="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter a password"
            name="password"
          />
          <Button $variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p>
          Already have an account? Sign-in&nbsp; <Link to="/signin">here</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
