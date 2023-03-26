import React, { useState } from "react";
import styled from "styled-components";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Left({
                  children,
                  onClick,
              }: {
    children: React.ReactNode;
    onClick: () => void;
}) {
    const [show, setShow] = useState(false);
    return show ? (
        <Button
            onClick={onClick}
            onMouseLeave={() => {
                setShow(false);
            }}
        >
            {children}
        </Button>
    ) : (
        <Transparent
            onMouseEnter={() => {
                setShow(true);
            }}
        />
    );
}
function Right({
                  children,
                  onClick,
              }: {
    children: React.ReactNode;
    onClick: () => void;
}) {
    const [show, setShow] = useState(false);
    return show ? (
        <Button
            onClick={onClick}
            onMouseLeave={() => {
                setShow(false);
            }}
        >
            {children}
        </Button>
    ) : (
        <Transparent
            onMouseEnter={() => {
                setShow(true);
            }}
        />
    );
}

const Transparent = styled.div`
  width: 10rem;
  position: absolute;
  z-index: 999;
  height: 50rem;
`;

const Button = styled.button`
  cursor: pointer;
  color: white;
  cursor: pointer;
`;

export function LeftArrow() {
    const { scrollPrev } = React.useContext(VisibilityContext);
    return <Left onClick={() => scrollPrev()}>←</Left>;
}
export function RightArrow() {
    const { scrollPrev } = React.useContext(VisibilityContext);
    return <Right onClick={() => scrollPrev()}>←</Right>;
}