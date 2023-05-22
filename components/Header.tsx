/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useMediaQuery from "@/hooks/useMediaQuery";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const isMobile = useMediaQuery(`(max-width: 479px)`);
  return (
    <header
      style={{
        position: "relative",
        zIndex: "9",
        width: "100%",
        top: "0px",
      }}
    >
      <div
        style={{
          height: "60px",
          width: "100%",
          backgroundColor: "rgb(0, 65, 101)",
        }}
      >
        <span
          style={{
            margin: "0px",
            paddingLeft: "32px",
            paddingRight: "32px",
            ...(isMobile
              ? {
                  maxWidth: "100%",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                }
              : {}),
          }}
        >
          <a
            style={{
              color: "transparent",
              WebkitTapHighlightColor: "transparent",
              textDecoration: "none",
            }}
          >
            <img
              src="/images/anz-logo.1.0.0.svg"
              style={{
                width: "103px",
                height: "42px",
                marginTop: "10px",
                borderStyle: "none",
              }}
            />
          </a>
        </span>
      </div>
    </header>
  );
};
