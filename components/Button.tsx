import React from "react";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";

interface ButtonProps {
  loading: boolean;
  onSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
}

const CustomButtom = styled(ButtonUnstyled)`
  width: 100%;
  margin: 0px;
  background-color: rgb(0, 114, 172);
  color: rgb(255, 255, 255);
  border: 1px solid transparent;
  border-radius: 4px;
  font-weight: 600;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease 0s, border-color 0.2s ease 0s,
    color 0.2s ease 0s;
  font-family: myriad-pro-semibold, sans-serif, sans-serif !important;
  text-transform: none;
  font-size: 100%;

  &:hover {
    outline: none;
    background-color: rgb(0, 147, 216);
  }

  &:focus {
    outline: none;
    background-color: rgb(0, 147, 216);
  }
`;

export const Button: React.FC<ButtonProps> = ({ loading, onSubmit, label }) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flex: "0 1 auto",
        flexFlow: "row wrap",
        margin: "0px -15px 32px",
      }}
    >
      <div
        style={{
          flexBasis: "100%",
          maxWidth: "100%",
          display: "block",
          boxSizing: "border-box",
          flex: "0 0 auto",
          padding: "0px 15px",
          width: "100%",
        }}
      >
        <CustomButtom disabled={loading} onClick={onSubmit}>
          <span>
            <svg
              style={{
                marginRight: "8px",
                transform: "translate3d(0px, 0.125em, 0px)",
                margin: "-0.125em 0px 0px",
              }}
              viewBox="0 0 16 16"
              width="1em"
              height="1em"
            >
              <path
                d="M13.585 6.209h-.89V4.695A4.7 4.7 0 0 0 8 0a4.7 4.7 0 0 0-4.695 4.695V6.21h-.89a.296.296 0 0 0-.296.297v9.198c0 .162.133.295.297.295h11.169a.296.296 0 0 0 .296-.297V6.506a.297.297 0 0 0-.296-.297zm-8.28-1.514A2.698 2.698 0 0 1 8 2a2.698 2.698 0 0 1 2.695 2.695V6.21h-5.39V4.695zm3.57 5.98v2.368a.874.874 0 0 1-1.748 0v-2.367a1.342 1.342 0 0 1-.484-1.024c0-.749.61-1.358 1.358-1.358.749 0 1.358.61 1.358 1.358 0 .395-.18.768-.484 1.023z"
                fill="currentColor"
              ></path>
            </svg>{" "}
            {label}
          </span>
        </CustomButtom>
      </div>
    </div>
  );
};
