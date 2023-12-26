import Portal from "./ui/Portal";
import ticketService from "../appwrite/databases";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Form from "./ui/Form";
import { Models } from "appwrite";

export default function UpdateTicketForm({
  setUpdateModal,
  ticket,
}: {
  setUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  ticket: Models.Document;
}) {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const image = formData.get("image") as File;

    let imageId;
    if (image.name) {
      const { data, error } = await ticketService.createFile(image);
      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        imageId = data.$id;
      }
    }

    const artist = formData.get("artist") as string;
    const venue = formData.get("venue") as string;
    const location = formData.get("location") as string;
    const date = formData.get("date") as string;

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
