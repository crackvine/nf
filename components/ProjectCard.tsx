import { User } from '../models/User'
import { Project } from '../models/Project'
import { Card, CardLinksSection } from './Card'

type Props = {
  project: Omit<Project, 'created_ts' | 'updated_ts'>;
}

export const ProjectCard = ({ project }: Props) => (
    <Card
      iconUrl={ project.icon_url }
      title={ project.name }
      description={ project.description }>
        {!!project.users?.length &&
          <CardLinksSection sectionTitle="Users" links={ project.users.map(userToLink) }/>
        }
    </Card>
)

const userToLink = (user: User) => ({
  iconUrl: user.avatar_url,
  text: user.name,
  url: `/users/${ user.id }`,
})

export default ProjectCard
