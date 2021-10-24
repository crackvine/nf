import { User } from '../models/User'
import { Project } from '../models/Project'
import { Card, CardLinksSection } from './Card'

type Props = {
  user: Omit<User, 'created_ts' | 'updated_ts'>;
}

const UserCard = ({ user }: Props) => (
  <Card
    iconUrl={ user.avatar_url }
    title={ user.name }
    subTitle={ `Fellowship: ${user.fellowship}` }
    description={ user.bio }>
      {!!user.projects.length &&
        <CardLinksSection sectionTitle="Projects" links={ user.projects.map(projectToLink) }/>
      }
  </Card>
)

const projectToLink = (project: Project) => ({
  iconUrl: project.icon_url,
  text: project.name,
  url: `/projects/${ project.id }`,
});

export default UserCard
