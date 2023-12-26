import styled from "styled-components";
import ticketService from "../appwrite/databases";
import Button from "./ui/Button";
import Portal from "./ui/Portal";
import { useLocation } from "wouter";

const Buttons = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;

  button:first-child {
    flex: 1;
  }
`;

export default function DeleteTicketForm({
  ticketId,
  hasDeletePermission,
  image,
  setDeleteModal,
}: {
  ticketId: string;
  hasDeletePermission: boolean;
  image: string;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [location, navigate] = useLocation();

  const handleDelete = async (ticketId: string, image: string) => {
    const { data, error } = await ticketService.deleteDocument(
      ticketId,
      hasDeletePermission
    );
    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      await ticketService.deleteFile(image);
      setDeleteModal(false);
      if (location !== "/admin") navigate("/tickets");
    }
  };

  return (
    <Portal>
      <>
        <h1>Delete Ticket?</h1>{" "}
        <Buttons>
          <Button
            onClick={() => handleDelete(ticketId, image)}
            $variant="destructive"
          >
            Yes
          </Button>
          <Button onClick={() => setDeleteModal(false)}>No</Button>
        </Buttons>
      </>
    </Portal>
  );
}
