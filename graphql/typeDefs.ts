import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
type Query {
  user(id: Int!): User
  users: [User!]
  project(id: Int!): Project
  projects: [Project!]
  feedEvents(limit: Int, skip: Int, fellowship: Fellowship): [FeedEvent!]
}

type User {
  id: Int!
  name: String!
  bio: String!
  avatar_url: String!
  fellowship: Fellowship!
  projects: [Project!]!
}

type Project {
  id: Int!
  name: String!
  description: String!
  icon_url: String!
  users: [User!]!
}

type FeedEvent {
  ref_id: Int!
  event_type: FeedEventType!
  subject: String!
  body: String
  icon_url: String
  fellowship: Fellowship
}

enum Fellowship {
  founders
  angels
  writers
  all
}

enum FeedEventType {
  announcement
  new_user
  new_project
}
`
