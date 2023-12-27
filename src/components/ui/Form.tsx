import styled from "styled-components";
import Button from "./Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TicketInterface } from "../../types/tickets";
import { useEffect, useState } from "react";
import ticketService from "../../appwrite/databases";

const Buttons = styled.div`
  margin-top: 1rem;
  gap: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
`;

const Label = styled.label`
  input {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid #ced4da;
    transition: all 0.2s;
    margin: 0.25rem 0;
  }

  input:focus {
    outline: 0;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.2);
  }
`;

const Error = styled.p`
  color: red;
`;

const FilePreview = styled.div`
  position: relative;

  img {
    width: 2.4rem;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
    position: absolute;
    top: 10%;
    right: 5%;
  }
`;

export default function Form({
  setModal,
  submit,
  ticket,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  submit: SubmitHandler<FieldValues>;
  ticket?: TicketInterface;
}) {
  const [file, setFile] = useState<string>();

  useEffect(() => {
    if (ticket?.image) {
      setFile(ticketService.getFilePreview(ticket.image));
    }
  }, [ticket?.image]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    if (!e.target.files) return;
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      artist: ticket?.artist ?? "",
      venue: ticket?.venue ?? "",
      location: ticket?.location ?? "",
      date: ticket?.date.slice(0, 10) ?? "",
      image: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Label>
        Artist
        <input
          type="text"
          {...register("artist", { required: "artist is required" })}
        />
        {errors.artist && <Error>{errors.artist.message}</Error>}
      </Label>
      <Label>
        Venue
        <input
          type="text"
          {...register("venue", { required: "venue is required" })}
        />
        {errors.venue && <Error>{errors.venue.message}</Error>}
      </Label>
      <Label>
        Location
        <input
          type="text"
          {...register("location", { required: "location is required" })}
        />
        {errors.location && <Error>{errors.location.message}</Error>}
      </Label>
      <Label>
        Date
        <input
          type="date"
          {...register("date", { required: "date is required" })}
        />
        {errors.date && <Error>{errors.date.message}</Error>}
      </Label>
      <Label>
        Image
        <FilePreview>
          <input
            type="file"
            {...register("image")}
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
          />
          <img src={file} />
        </FilePreview>
      </Label>
      <Buttons>
        <Button type="submit" $variant="primary" disabled={isSubmitting}>
          Submit
        </Button>
        <Button onClick={() => setModal(false)}>Close</Button>
      </Buttons>
    </form>
  );
}
