export type Trip = {
  uid: string;
  attendees: Array<string>;
  duration: Duration;
  destination: string;
  image?: string;
};

export type Duration = {
  start: Date;
  end: Date;
};