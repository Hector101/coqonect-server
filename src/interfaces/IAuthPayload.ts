import { Account, Admin } from '../db';

export default interface IAuthPayload {
  type: string;
  message: string;
  payload: Account | Admin;
}
