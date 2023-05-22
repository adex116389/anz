import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import ReactInputMask from "react-input-mask";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  register?: UseFormRegister<FieldValues>;
  registerOptions?: any;
  mask?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  error,
  register = () =>
    ({} as {
      ref: any;
    }),
  registerOptions,
  required = true,
  mask,
  ...props
}) => {
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
        <div
          style={{
            display: "inherit",
            marginBottom: "0px",
            padding: "0px",
            textAlign: "inherit",
            fontSize: "inherit",
            letterSpacing: "inherit",
            lineHeight: "inherit",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: "0",
              color: "rgb(116, 118, 120)",
              width: "100%",
            }}
          >
            <label
              style={{
                color: "rgb(73, 73, 73)",
                marginBottom: "4px",
                letterSpacing: "normal",
                fontSize: "16px",
                transition:
                  "font-size 0.2s ease 0s, transform 0.2s ease 0s, color 0.2s ease 0s",
                display: "inline-block",
              }}
            >
              {label}
            </label>
            <div
              style={{
                overflow: "hidden",
                height: "0px",
                margin: "0px",
              }}
            >
              <div
                style={{
                  background: "rgb(240, 250, 255)",
                  border: "1px solid rgb(147, 199, 229)",
                  borderRadius: "3px",
                  display: "block",
                  padding: "16px",
                  fontSize: "14px",
                }}
              ></div>
            </div>
            <div
              style={{
                position: "relative",
              }}
            >
              {mask ? (
                <ReactInputMask
                  mask={mask}
                  {...register(name, registerOptions)}
                  {...props}
                >
                  {
                    // @ts-ignore
                    () => (
                      <input
                        style={{
                          width: "100%",
                          padding: "0px 24px 0px 12px",
                          backgroundColor: "transparent",
                          border: error
                            ? "1px solid rgb(213, 61, 57)"
                            : "1px solid rgb(204, 204, 204)",
                          borderRadius: "4px",
                          transition:
                            "border-color 0.2s ease 0s, height 0.2s ease 0s, line-height 0.2s ease 0s, font-size 0.2s ease 0s, padding 0.2s ease 0s",
                          fontSize: "16px",
                          color: "rgb(73, 73, 73)",
                          height: "44px",
                          margin: "0px",
                          lineHeight: "1.25",
                          fontFamily: "inherit",
                          overflow: "visible",
                        }}
                        {...register(name, registerOptions)}
                        {...props}
                      />
                    )
                  }
                </ReactInputMask>
              ) : (
                <input
                  type="text"
                  style={{
                    width: "100%",
                    padding: "0px 24px 0px 12px",
                    backgroundColor: "transparent",
                    border: error
                      ? "1px solid rgb(213, 61, 57)"
                      : "1px solid rgb(204, 204, 204)",
                    borderRadius: "4px",
                    transition:
                      "border-color 0.2s ease 0s, height 0.2s ease 0s, line-height 0.2s ease 0s, font-size 0.2s ease 0s, padding 0.2s ease 0s",
                    fontSize: "16px",
                    color: "rgb(73, 73, 73)",
                    height: "44px",
                    margin: "0px",
                    lineHeight: "1.25",
                    fontFamily: "inherit",
                    overflow: "visible",
                  }}
                  {...register(name, registerOptions)}
                  {...props}
                />
              )}
              <span
                style={{
                  position: "absolute",
                  right: "0px",
                  bottom: "0px",
                  overflow: "hidden",
                  padding: "12px",
                  transition: "font-size 0.2s ease 0s, padding 0.2s ease 0s",
                }}
              ></span>
            </div>
            {error ? (
              <p
                style={{
                  lineHeight: "18px",
                  color: "rgb(213, 61, 57)",
                  margin: "2px 0px 0px",
                  fontSize: "14px",
                }}
              >
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
