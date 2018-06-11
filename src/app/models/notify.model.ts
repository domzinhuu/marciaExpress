export class Notify {
  _id: string;
  user: any;
  message: string;
  description: string;
  registeredAt: Date;
  read: boolean;
}

export class NotifyContainer {
  news: number;
  notifies: Notify[];
}
