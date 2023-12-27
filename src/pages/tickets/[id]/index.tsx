import { useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import Ticket from "../../../components/Ticket";
import UpdateTicketForm from "../../../components/UpdateTicketForm";
import Button from "../../../components/ui/Button";
import DeleteTicketForm from "../../../components/DeleteTicketForm";
import Loading from "../../../components/ui/Loading";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState, useGetDocumentQuery } from "../../../store/store";

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  h1 {
    font-size: 2.5rem;
  }
`;

export default function TicketDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const userId = useSelector((state: RootState) => state.auth.userId);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const { data, isLoading, isError, isUninitialized } = useGetDocumentQuery({
    documentId: params.id,
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
        <p>ticket not found</p>
      </MainLayout>
    );

  return (
    <MainLayout>
      <Title>
        <h1>Ticket Details</h1>
        {(isAdmin || userId === data?.userId) && (
          <Buttons>
            <Button $variant="primary" onClick={() => setUpdateModal(true)}>
              Update
            </Button>
            <Button $variant="destructive" onClick={() => setDeleteModal(true)}>
              Delete
            </Button>
          </Buttons>
        )}
      </Title>
      {data && <Ticket ticket={data} />}
      {updateModal && data && (
        <UpdateTicketForm setUpdateModal={setUpdateModal} ticket={data} />
      )}
      {deleteModal && data && (
        <DeleteTicketForm
          ticketId={data.$id}
          hasDeletePermission={userId === data.userId}
          image={data.image}
          setDeleteModal={setDeleteModal}
        />
      )}
    </MainLayout>
  );
}
