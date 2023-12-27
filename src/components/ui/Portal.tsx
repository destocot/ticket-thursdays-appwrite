import { MutableRefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
`;

const SubContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  max-width: 400px;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export default function Portal({ children }: { children: React.ReactNode }) {
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

  if (!ref.current) {
    ref.current = document.createElement("div");
  }

  useEffect(() => {
    const portalRoot = document.getElementById("portal")!;
    if (!ref.current) return;

    portalRoot.appendChild(ref.current);
    return () => {
      if (ref.current) {
        portalRoot.removeChild(ref.current);
      }
    };
  }, []);

  return createPortal(
    <Container>
      <SubContainer>{children}</SubContainer>
    </Container>,
    ref.current
  );
}
