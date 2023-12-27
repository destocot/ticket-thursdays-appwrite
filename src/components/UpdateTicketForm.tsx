import Portal from "./ui/Portal";
import ticketService from "../appwrite/databases";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Form from "./ui/Form";
import { FieldValues } from "react-hook-form";
import { TicketInterface } from "../types/tickets";

export default function UpdateTicketForm({
  setUpdateModal,
  ticket,
}: {
  setUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  ticket: TicketInterface;
}) {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const submit = async (formData: FieldValues) => {
    if (!userId) return;
    const { artist, date, location, venue, image } = formData;

    let imageId;
    if (image[0] && image[0].name) {
      const { data, error } = await ticketService.createFile(image);
      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        imageId = data.$id;
      }
    }

    const { data, error } = await ticketService.updateDocument(ticket.$id, {
      artist,
      venue,
      location,
      date,
      image: imageId,
    });
    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      await ticketService.deleteFile(ticket.image);
      setUpdateModal(false);
      window.location.reload();
    }
  };

  return (
    <Portal>
      <>
        <h1>Update Ticket</h1>
        <Form setModal={setUpdateModal} submit={submit} ticket={ticket} />
      </>
    </Portal>
  );
}
