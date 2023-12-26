import MainLayout from "../../layouts/MainLayout";
import Ticket from "../../components/Ticket";
import styled from "styled-components";
import Loading from "../../components/ui/Loading";
import { useSelector } from "react-redux";
import { RootState, useListDocumentsByUserIdQuery } from "../../store/store";

const TicketsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

function TicketsPage() {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);

  if (!userId) return <p>something went wrong</p>;

  const { data, isLoading, isError, isUninitialized } =
    useListDocumentsByUserIdQuery({
      userId,
    });

  if (isLoading || isUninitialized) {
    return <Loading />;
  }
  if (isError) return <p>something went wrong</p>;

  return (
    <MainLayout>
      <h1>Your Tickets</h1>
      <small>{userEmail}</small>
      <TicketsContainer>
        {data.documents.length > 0 ? (
          data.documents.map((ticket) => (
            <Ticket key={ticket.$id} ticket={ticket} />
          ))
        ) : (
          <p>No tickets found. Create your first ticket today!</p>
        )}
      </TicketsContainer>
    </MainLayout>
  );
}
export default TicketsPage;
