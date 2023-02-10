export interface User {
  uid: string
  email: string
  name: string
  profilePic: string
  userName: string
  medicalInfo: Array<string>
  allergies: Array<string>
}

export type Trip = {
  uid: string;
  attendees: Array<string>;
  duration: Duration;
  destination: string;
};

export type Duration = {
  start: Date;
  end: Date;
};