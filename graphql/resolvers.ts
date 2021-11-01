import { Fellowship } from 'models/enums'
import { userProvider, projectProvider, feedEventProvider, UserRow, ProjectRow } from './providers'

export const resolvers = {
  Query: {
    user: (root: unknown, { id }: { id: number }) => userProvider.getUserById(id),
    users: () => userProvider.getUsers(),
    project: (root: unknown, { id }: { id: number }) => projectProvider.getProjectById(id),
    projects: () => projectProvider.getProjects(),
    feedEvents: (
      root: unknown,
      { limit, skip, fellowship }: { limit: number, skip: number, fellowship: Fellowship }
    ) => feedEventProvider.getFeedEvents(limit, skip, fellowship),
  },
  User: {
    projects: (user: UserRow) => userProvider.getUserProjects(user.id),
  },
  Project: {
    users: (project: ProjectRow) => projectProvider.getProjectUsers(project.id),
  },
}
