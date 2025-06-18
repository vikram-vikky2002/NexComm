export interface Iuser {
  userId: number,
  userName: string,
  "role": string,
  "emailId": string,
  "phone": string,
  "newUser": boolean,
  lastLogin?: string,
  "password": string,
  "live": boolean,
  "isAdmin": boolean
}
