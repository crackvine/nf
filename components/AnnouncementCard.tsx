import path from 'path'
import { Announcement } from '../models/Announcement'
import { Card } from './Card'

type Props = {
  announcement: Announcement;
}

const AnnouncementCard = ({ announcement }: Props) => (
  <Card
    iconUrl={ path.join(process.cwd(), '/assets/announcement.png') }
    title={ announcement.title }
    description={ announcement.body }>
  </Card>
)

export default AnnouncementCard
