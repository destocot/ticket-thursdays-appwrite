import styled from "styled-components";
import { Link } from "wouter";
import ticketService from "../appwrite/databases";
import { TicketInterface } from "../types/tickets";

const TicketStyles = styled.div`
  background-color: white;
  display: flex;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 0.2rem;
  overflow: hidden;
  transition: 0.2s all;
  flex: 1 1 0px;

  &:hover {
    transform: translateX(1rem);
  }
`;

const TicketLeftBlock = styled.div`
  width: 5rem;
  background-color: #d1d5db;
  border-right: 6px solid #ef4444;
`;

const TicketRightBlock = styled.div`
  width: 5rem;
  background-color: #d1d5db;
  border-left: 3px solid black;
  margin-left: auto;
`;

const TicketCenterBlock = styled.div`
  display: flex;
  padding: 0.5rem 0;
  width: 100%;
  align-items: center;
`;

const TicketMeta = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  text-transform: uppercase;
  flex: 2;

  h2,
  h3,
  time {
    margin: 0;
  }

  h3 {
    font-weight: normal;
  }
`;

const TicketImage = styled.img`
  flex: 1;
  display: block;
  object-fit: cover;
  max-width: 175px;
  height: auto;
  aspect-ratio: 1/1;

  @media (max-width: 720px) {
    max-width: 150px;
  }

  @media (max-width: 520px) {
    max-width: 125px;
  }
`;

const TicketContainer = styled.div`
  width: 100%;
  cursor: pointer;
  margin: 0 auto;
`;

export default function Ticket({ ticket }: { ticket: TicketInterface }) {
  return (
    <Link to={`/tickets/${ticket.$id}`}>
      <TicketContainer>
        <TicketStyles>
          <TicketLeftBlock />
          <TicketCenterBlock>
            <TicketMeta>
              <h2>{ticket.artist}</h2>
              <h3>{ticket.venue}</h3>
              <h3>{ticket.location}</h3>
              <time>{formatDate(ticket.date)}</time>
            </TicketMeta>
            <TicketImage
              src={
                ticket.image
                  ? ticketService.getFilePreview(ticket.image)
                  : "../concert-image.jpg"
              }
              alt="concert image"
            />
          </TicketCenterBlock>
          <TicketRightBlock />
        </TicketStyles>
      </TicketContainer>
    </Link>
  );
}

const formatDate = (ticketDate: string) => {
  let date = new Date(ticketDate);
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return date.toDateString();
};
