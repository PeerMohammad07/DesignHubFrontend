export default interface IUser{
  _id:string
  name: string;
  email: string;
}

export interface UserState {
  userData: IUser | null;
}

