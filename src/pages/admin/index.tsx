import { useSelector } from "react-redux";
import { RootState, useListDocumentsQuery } from "../../store/store";
import { useLocation } from "wouter";
import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";
import ticketService from "../../appwrite/databases";
import Loading from "../../components/ui/Loading";
import styled from "styled-components";
import Button from "../../components/ui/Button";
import DeleteTicketForm from "../../components/DeleteTicketForm";
import UpdateTicketForm from "../../components/UpdateTicketForm";
import { TicketInterface } from "../../types/tickets";

const Table = styled.div`
  border: 1px solid #3b82f6;
  background-color: #eeeeee;
  width: fit-content;
  text-align: center;
  border-radius: 0.25rem;
  overflow: hidden;

  td > button {
    margin: 0 auto;
    display: block;
  }

  td,
  th {
    padding: 0.2rem 0.5rem;
    min-width: 150px;
  }

  tr:nth-child(even) {
    background: #bfdbfe;
  }

  thead {
    background: #3b82f6;
  }

  thead th {
    color: #ffffff;
  }

  @media (max-width: 1280px) {
    td,
    th {
      min-width: 125px;
    }
  }

  @media (max-width: 1160px) {
    td,
    th {
      min-width: 100px;
    }
  }

  @media (max-width: 920px) {
    td,
    th {
      min-width: fit-content;
    }
  }

  @media (max-width: 824px) {
    td:nth-child(2),
    th:nth-child(2) {
      display: none;
    }
  }

  @media (max-width: 620px) {
    td:nth-child(3),
    th:nth-child(3) {
      display: none;
    }
  }
`;

const TicketImage = styled.img`
  object-fit: cover;
  max-width: 50px;
  height: auto;
  aspect-ratio: 1/1;
  margin: 0 auto;
`;
export default function AdminPage() {
  const [, navigate] = useLocation();
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  if (!isAdmin) navigate("/");

  const { data, isLoading, isError, isUninitialized } = useListDocumentsQuery(
    {}
  );

  if (isLoading || isUninitialized) {
    return <Loading />;
  }
  if (isError) return <p>something went wrong</p>;

  return (
    <MainLayout>
      <h1>Admin Page</h1>
      <Table>
        <thead>
          <tr>
            <th>artist</th>
            <th>venue</th>
            <th>location</th>
            <th>date</th>
            <th>image</th>
            <th>userId</th>
            <th>update</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {data.documents.map((ticket) => (
            <TicketRow ticket={ticket} key={ticket.$id} isAdmin={isAdmin} />
          ))}
        </tbody>
      </Table>
    </MainLayout>
  );
}

const TicketRow = ({
  ticket,
  isAdmin,
}: {
  ticket: TicketInterface;
  isAdmin: boolean;
}) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);

  return (
    <>
      <tr>
        <td>{ticket.artist}</td>
        <td>{ticket.venue}</td>
        <td>{ticket.location}</td>
        <td>{formatDate(ticket.date)}</td>
        <td>
          <TicketImage
            src={
              ticket.image
                ? ticketService.getFilePreview(ticket.image)
                : "../concert-image.jpg"
            }
            alt="concert image"
          />
        </td>
        <td>{ticket.userId}</td>
        <td>
          <Button $variant="primary" onClick={() => setUpdateModal(true)}>
            ✏️
          </Button>
        </td>
        <td>
          <Button $variant="secondary" onClick={() => setDeleteModal(true)}>
            ❌
          </Button>
        </td>
      </tr>
      {updateModal && ticket && (
        <UpdateTicketForm setUpdateModal={setUpdateModal} ticket={ticket} />
      )}
      {deleteModal && ticket && (
        <DeleteTicketForm
          ticketId={ticket.$id}
          hasDeletePermission={userId === ticket.userId || isAdmin}
          image={ticket.image}
          setDeleteModal={setDeleteModal}
        />
      )}
    </>
  );
};

const formatDate = (ticketDate: string) => {
  let date = new Date(ticketDate);
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return date.toDateString();
};
