export default interface IAuthPayload {
  type: string;
  message: string;
  payload: {
    token: string;
    refreshToken: string;
    userId: string;
  };
}
