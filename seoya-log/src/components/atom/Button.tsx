"use client";

const Button = ({
  content,
  onClick,
  disabled = false,
  type = "button",
}: Props) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;

interface Props {
  content: string | number;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit";
}
