import styled from "styled-components";
import ticketService from "../appwrite/databases";
import Button from "./ui/Button";
import Portal from "./ui/Portal";
import { useLocation } from "wouter";
import { useDispatch } from "react-redux";
import { api } from "../store/store";

const Buttons = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
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
  const dispatch = useDispatch();

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
      dispatch(api.util.invalidateTags(["Tickets"]));
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
