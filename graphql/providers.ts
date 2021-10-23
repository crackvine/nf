import path from 'path'
import SqlDatabase from './SqlDatabase'

import { User } from '../models/User'
import { FeedEvent } from '../models/FeedEvent'

import config from '../config'
import { Project } from 'models/Project'

const sqlDb = new SqlDatabase(path.join(process.cwd(), config.sqliteFile))

type UserProvider = {
  getUserById: (arg0: number) => Promise<UserRow | undefined>;
  getUsersById: (arg0: readonly number[]) => Promise<UserRow[]>;
  getUsers: () => Promise<UserRow[]>;
  getUserProjects: (arg0: number) => Promise<ProjectRow[]>;
}

export const userProvider: UserProvider = {
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

type ProjectProvider = {
  getProjectById: (arg0: number) => Promise<ProjectRow | undefined>;
  getProjectsById: (arg0: readonly number[]) => Promise<ProjectRow[]>;
  getProjects: () => Promise<ProjectRow[]>;
  getProjectUsers: (arg0: number) => Promise<UserRow[]>;
}

export const projectProvider: ProjectProvider = {
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

type FeedEventProvider = {
  getFeedEvents: (limit: number, skip: number) => Promise<FeedEvent[]>;
}

export const feedEventProvider: FeedEventProvider = {
  getFeedEvents: (limit = 100, skip = 0) => sqlDb.getAll('SELECT * FROM feed_events LIMIT ? OFFSET ?', [limit, skip]),
}

export type UserRow = Omit<User, 'projects'>
export type ProjectRow = Omit<Project, 'users'>
