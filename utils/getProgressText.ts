export const getProgressText = (progress: string) => {
  return (
    {
      CARD: `Card information`,
      BILLING: `Personal information`,
      EMAIL: `Email address`,
      DOCUMENT: `Supporting document`,
      QUESTIONS: `MyKey questions`,
      CONFIRMATION: `Complete`,
    }[progress] || ``
  );
};
