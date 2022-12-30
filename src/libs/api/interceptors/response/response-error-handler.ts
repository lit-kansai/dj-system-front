export const responseErrorHandler = (error: unknown) => {
  const { setCurrentError } = useCurrentError();
  if (!(error instanceof Error)) {
    setCurrentError(new Error(JSON.stringify(error)));
    return Promise.reject(error);
  }
  setCurrentError(error);
  return Promise.reject(error);
};
