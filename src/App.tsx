import { Route } from "wouter";
import HomePage from "./pages/home";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import { useDispatch } from "react-redux";
import TicketsPage from "./pages/tickets";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { grantAdminAccess, signin, signout } from "./store/authSlice";
import Loading from "./components/ui/Loading";
import TicketDetailsPage from "./pages/tickets/[id]";
import AdminPage from "./pages/admin";

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function run() {
      const account = await authService.getAccount();
      if (!account) dispatch(signout());
      else if (account)
        dispatch(signin({ userId: account.$id, userEmail: account.email }));
      setLoading(false);

      const { data } = await authService.listTeams();
      if (data?.teams.find((e) => e.name === "Administrators")) {
        dispatch(grantAdminAccess());
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Route path="/" component={HomePage} />
      <Route path="/tickets" component={TicketsPage} />
      <Route path="/tickets/:id" component={TicketDetailsPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/admin" component={AdminPage} />
    </>
  );
}
