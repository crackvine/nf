import { User } from './User'

export type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_ts?: Date;
  updated_ts?: Date;
  users?: User[];
}
