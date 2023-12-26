import styled from "styled-components";
import MainLayout from "../../layouts/MainLayout";
import Ticket from "../../components/Ticket";
import Loading from "../../components/ui/Loading";
import { useListDocumentsQuery } from "../../store/store";
import { TicketInterface } from "../../types/tickets";

const Hero = styled.div`
  position: relative;
  margin-bottom: 1rem;

  div {
    background: rgb(59, 130, 246);
    background: radial-gradient(
      circle,
      rgba(59, 130, 246, 1) 2%,
      rgba(185, 210, 252, 1) 61%
    );
    border-radius: 0.5rem;
    height: 175px;
  }

  h1 {
    position: absolute;
    white-space: nowrap;
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const TicketsContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;
export default function HomePage() {
  const { data, isLoading, isError, isUninitialized } = useListDocumentsQuery({
    limit: 6,
  });

  if (isLoading || isUninitialized) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }
  if (isError)
    return (
      <MainLayout>
        <p>something went wrong</p>
      </MainLayout>
    );

  return (
    <MainLayout>
      <main>
        <Hero>
          <div />
          <h1>Check Out The Recent Tickets</h1>
        </Hero>
        <TicketsContainer>
          {data.documents.length > 0 ? (
            data.documents.map((ticket) => (
              <Ticket key={ticket.$id} ticket={ticket} />
            ))
          ) : (
            <p>No tickets found. Create your first ticket today!</p>
          )}
        </TicketsContainer>
      </main>
    </MainLayout>
  );
}
