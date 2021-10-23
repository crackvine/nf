import { FeedEventType } from './enums'

export type FeedEvent = {
  ref_id: number;
  event_type: FeedEventType;
  subject: string,
  body: string,
  icon: string,
  fellowship: string;
  event_date: Date;
}
