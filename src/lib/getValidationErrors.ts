// Interface
interface IError {
  param: string;
  msg: string;
}
interface IErrorMessage {
  [key: string]: string;
}

const getValidationErrors = (errors: IError[]) => {
  let prevPropertyValidated: string;

  const errorMessages: IErrorMessage = {};

  errors.filter((error: IError) => {
    if (error.param !== prevPropertyValidated) {
      prevPropertyValidated = error.param;
      return error;
    }
  }).map((error: IError) => {
    errorMessages[error.param] = error.msg;
  });

  return errorMessages;
};

export default getValidationErrors;
