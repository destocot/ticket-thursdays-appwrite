import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import { FormEventHandler, useState } from "react";
import { Models } from "appwrite";
import ticketService from "../../appwrite/databases";

const Buttons = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;

  button:first-child {
    flex: 1;
  }
`;

// const ImagePreview = styled.div`
//   img {
//     margin: 0 auto;
//     object-fit: cover;
//     max-width: 125px;
//     height: auto;
//     aspect-ratio: 1/1;
//   }
// `;

const ImageInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    aspect-ratio: 1/1;
    object-fit: cover;
    max-width: 100px;
  }
`;

export default function Form({
  setModal,
  submit,
  ticket,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  submit: FormEventHandler<HTMLFormElement>;
  ticket?: Models.Document;
}) {
  const [image, setImage] = useState(
    ticket?.image && ticketService.getFilePreview(ticket?.image)
  );

  return (
    <form onSubmit={submit}>
      <Input label="Artist" name="artist" defaultValue={ticket?.artist} />
      <Input label="Venue" name="venue" defaultValue={ticket?.venue} />
      <Input label="Location" name="location" defaultValue={ticket?.location} />
      <Input
        label="Date"
        type="date"
        name="date"
        defaultValue={ticket?.date.slice(0, 10)}
      />
      <ImageInput>
        <Input
          label="Image"
          type="file"
          name="image"
          onChange={(e) => {
            if (e.target.files) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result as string);
              };
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
        />
        {image && <img src={image} alt="" />}
      </ImageInput>
      <Buttons>
        <Button type="submit" $variant="primary">
          Submit
        </Button>
        <Button onClick={() => setModal(false)}>Close</Button>
      </Buttons>
    </form>
  );
}
