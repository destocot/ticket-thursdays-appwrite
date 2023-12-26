import Portal from "./ui/Portal";
import ticketService from "../appwrite/databases";
import { useDispatch, useSelector } from "react-redux";
import { RootState, api } from "../store/store";
import Form from "./ui/Form";
import { useLocation } from "wouter";

export default function CreateTicketForm({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useDispatch();
  const [, navigate] = useLocation();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const image = formData.get("image") as File;

    let imageId;
    if (image && image.name) {
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

    const { data, error } = await ticketService.createDocument({
      artist,
      venue,
      location,
      date,
      image: imageId,
      userId,
    });
    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setModal(false);
      dispatch(api.util.invalidateTags(["Tickets"]));
      navigate(`/tickets/${data.$id}`);
    }
  };

  return (
    <Portal>
      <h1>Create Ticket</h1>
      <Form setModal={setModal} submit={submit} />
    </Portal>
  );
}
