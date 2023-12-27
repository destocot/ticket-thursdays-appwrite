import Portal from "./ui/Portal";
import ticketService from "../appwrite/databases";
import { useDispatch, useSelector } from "react-redux";
import { RootState, api } from "../store/store";
import Form from "./ui/Form";
import { useLocation } from "wouter";
import { FieldValues } from "react-hook-form";

export default function CreateTicketForm({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useDispatch();
  const [, navigate] = useLocation();

  const submit = async (formData: FieldValues) => {
    if (!userId) return;
    const { artist, date, location, venue, image } = formData;

    let imageId;
    if (image[0] && image[0].name) {
      const { data, error } = await ticketService.createFile(image[0]);
      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        imageId = data.$id;
      }
    }

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
