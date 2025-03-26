import styled, { css } from "styled-components";

type ButtonProps = {
  label: string;
  variant: "primary" | "secondary" | "third";
  onClick?: () => void;
};

export const Button = ({ label, variant = "primary", onClick }: ButtonProps) => {
  return <BaseButton variant={variant} onClick={onClick}> {label} </BaseButton>
};

const BaseButton = styled.button<{ variant: "primary" | "secondary" | "third" }>`
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  color: black;
  background-color: #00F5D4;

  ${(props) =>
    props.variant === "primary" &&
    css`
      font-size: 24px;
      width: 210px;
      height: 64px;
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      font-size: 16px;
      width: 140px;
      height: 40px
    `}

  ${(props) =>
    props.variant === "third" &&
    css`
      font-size: 16px;
      width: 134px;
      height: 40px;
    `}
`;
