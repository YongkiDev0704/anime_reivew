import styled, { css } from "styled-components";

type ButtonProps = {
  label: string;
  variant: "primary" | "secondary" | "third" | "custom";
  onClick?: () => void;
  width?: string;
  height?: string;
  disabled?: boolean;
};

export const Button = ({ label, variant = "primary", width, height, onClick, disabled }: ButtonProps) => {
  return <BaseButton 
    variant={variant} 
    onClick={onClick}
    width={width}
    height={height}
    disabled={disabled}
  > 
    {label} 
  </BaseButton>
};

const BaseButton = styled.button<{ variant: "primary" | "secondary" | "third" | "custom"; width?: string, height?: string }>`
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  color: black;
  background-color: #00F5D4;
  opacity: ${props => props.disabled ? 0.6 : 1};

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
      font-weight: normal;
      width: 134px;
      height: 40px;
    `}

  ${(props) =>
    props.variant === "custom" &&
    css`
      font-size: 24px;
      width: ${props.width};
      height: ${props.height};
    `}
`;
