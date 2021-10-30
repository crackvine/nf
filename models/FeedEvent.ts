import { FeedEventType, Fellowship } from './enums'

export type FeedEvent = {
  ref_id: number;
  event_type: FeedEventType;
  subject: string,
  body: string,
  icon_url: string,
  fellowship: Fellowship;
  event_date: Date;
}
