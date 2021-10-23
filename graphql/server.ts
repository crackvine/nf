import { ApolloServer, gql } from 'apollo-server-micro'
import { userProvider, projectProvider, feedEventProvider, UserRow, ProjectRow } from './providers'

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
    user: (root: unknown, { id }: { id: number }) => userProvider.getUserById(id),
    users: () => userProvider.getUsers(),
    project: (root: unknown, { id }: { id: number }) => projectProvider.getProjectById(id),
    projects: () => projectProvider.getProjects(),
    feedEvents: ( root: unknown, { limit, skip }: { limit: number, skip: number }) => feedEventProvider.getFeedEvents(limit, skip),
  },
  User: {
    projects: (user: UserRow) => userProvider.getUserProjects(user.id),
  },
  Project: {
    users: (project: ProjectRow) => projectProvider.getProjectUsers(project.id),
  },
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
})
