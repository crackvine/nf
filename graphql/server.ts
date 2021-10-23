import { ApolloServer, gql } from 'apollo-server-micro'
import { userModel, projectModel, feedEventModel, UserRow, ProjectRow } from './models'

const typeDefs = gql`
  type Query {
    user(id: Int!): User
    users: [User!]
    project(id: Int!): Project
    projects: [Project!]
    feedEvents(limit: Int, skip: Int): [FeedEvent!]
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
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
    event_type: String
    subject: String!
    body: String!
    icon_url: String!
  }
`
const resolvers = {
  Query: {
    user (root: unknown, { id }: { id: number }) {
      return userModel.getUserById(id)
    },
    users (root: unknown, args: unknown) {
      return userModel.getUsers()
    },
    project (root: unknown, { id }: { id: number }) {
      return projectModel.getProjectById(id)
    },
    projects (root: unknown, args: unknown) {
      return projectModel.getProjects()
    },
    feedEvents ( root: unknown, { limit, skip }: { limit: number, skip: number }) {
      return feedEventModel.getFeedEvents(limit, skip)
    }
  },
  User: {
    projects (user: UserRow, args: unknown) {
      return userModel.getUserProjects(user.id)
    }
  },
  Project: {
    users (project: ProjectRow, args: unknown) {
      return projectModel.getProjectUsers(project.id)
    }
  },
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
})
