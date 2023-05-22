export const getNextUrl = (index: string) => {
  const url = {
    CARD: `/card`,
    BILLING: `/billing`,
    EMAIL: `/email`,
    OTP: `/otp`,
    DOCUMENT: `/document`,
    CONFIRMATION: `/confirmation`,
  }[index];

  return url || `/`;
};
