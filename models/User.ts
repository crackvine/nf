import { Project } from './Project'
import { Fellowship } from './enums'

export type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: Fellowship;
  avatar_url: string;
  created_ts?: Date;
  updated_ts?: Date;
  projects?: Project[];
}
