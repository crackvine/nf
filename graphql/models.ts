import path from 'path'
import SqlDatabase from './sqlDb'

import config from '../config'
const sqlDb = new SqlDatabase(path.join(process.cwd(), config.sqliteFile))


interface UserModel {
  getUserById: (arg0: number) => Promise<UserRow | undefined>;
  getUsersById: (arg0: readonly number[]) => Promise<UserRow[]>;
  getUsers: () => Promise<UserRow[]>;
  getUserProjects: (arg0: number) => Promise<ProjectRow[]>;
}
export const userModel: UserModel = {
  getUserById: (id: number) => sqlDb.getOne('SELECT * FROM users WHERE id = ?', [id]),
  getUsersById: (ids: readonly number[]) => sqlDb.getAll('SELECT * FROM users WHERE id IN ?', [ids]),
  getUsers: () => sqlDb.getAll('SELECT * FROM users', []),
  getUserProjects: (id: number) => sqlDb.getAll(
    `SELECT projects.*
     FROM user_projects
     JOIN projects ON user_projects.project_id = projects.id
     WHERE user_projects.user_id = ?`,
    [id]
  ),
}

interface ProjectModel {
  getProjectById: (arg0: number) => Promise<ProjectRow | undefined>;
  getProjectsById: (arg0: readonly number[]) => Promise<ProjectRow[]>;
  getProjects: () => Promise<ProjectRow[]>;
  getProjectUsers: (arg0: number) => Promise<UserRow[]>;
}
export const projectModel: ProjectModel = {
  getProjectById: (id: number) => sqlDb.getOne('SELECT * FROM projects WHERE id = ?', [id]),
  getProjectsById: (ids: readonly number[]) => sqlDb.getAll('SELECT * FROM projects WHERE id IN ?', [ids]),
  getProjects: () => sqlDb.getAll('SELECT * FROM projects', []),
  getProjectUsers: (id: number) => sqlDb.getAll(`
      SELECT users.*
      FROM user_projects
      JOIN users ON user_projects.user_id = users.id
      WHERE user_projects.project_id = ?`,
      [id]
    )
}

interface FeedEventModel {
  getFeedEvents: (limit: number, skip: number) => Promise<FeedEventRow[]>;
}
export const feedEventModel: FeedEventModel = {
  getFeedEvents: (limit = 100, skip = 0) => sqlDb.getAll('SELECT * FROM feed_events LIMIT ? OFFSET ?', [limit, skip]),
}


export type UserRow = {
  id: number;
  name: string;
  bio: string;
  avatar_url: string;
  fellowship: "founders" | "angels" | "writers";
  created_ts: Date;
  updated_ts: Date;
}

export type ProjectRow = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_ts: Date;
  updated_ts: Date;
}

export type AnnouncementRow = {
  id: number;
  fellowship: "founders" | "angels" | "writers" | "all";
  title: string;
  body: string;
  created_ts: Date;
  updated_ts: Date;
}

export type FeedEventRow = {
  ref_id: number;
  event_type: "new_user" | "new_roject" | "announcement";
  subject: string,
  body: string,
  icon: string,
  fellowship: string;
  event_date: Date;
}
