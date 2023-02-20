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

export type Event = {
  uid: string;
  title: string;
  attendees: Array<string>;
  duration: Duration;
  location: string;
  description: string;
};