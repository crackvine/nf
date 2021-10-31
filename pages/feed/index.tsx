import { useState, useEffect } from "react";
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'

import Layout from 'components/Layout'
import { FeedEvent } from '../../models/FeedEvent'
import AnnouncementCard from 'components/AnnouncementCard'
import ProjectCard from 'components/ProjectCard'
import UserCard from 'components/UserCard'
import { Announcement } from 'models/Announcement'
import { FeedEventType } from 'models/enums'
import { User } from 'models/User'
import { Project } from 'models/Project'

const FEED_QUERY = gql`
  query feed($skip: Int, $limit: Int) {
    feedEvents(skip: $skip, limit: $limit) {
      event_type
      ref_id
      icon_url
      subject
      body
      fellowship
    }
  }
`

type QueryData = {
  feedEvents: FeedEvent[];
}

export default function FeedPage() {
  const [feedEvents, setFeedEvents] = useState<FeedEvent[]>([])

  const {error, loading, data, fetchMore} = useQuery<QueryData>(
    FEED_QUERY,
    {
      variables: { skip: 0, limit: 6 },
    }
  )

  useEffect(() => {
    if (data) { setFeedEvents(data.feedEvents) }
  }, [data])
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    if (window.scrollY + 1 + window.innerHeight >= document.body.scrollHeight && !loading) {
      onLoadMore()
    }
  };

  const onLoadMore = () => {
    fetchMore({
      variables: {
        skip: feedEvents.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          feedEvents: [...prev.feedEvents, ...fetchMoreResult.feedEvents]
        });
      }
    });
  }

  if (!feedEvents || loading || error) {
    return null
  }

  const renderEventByType = (feedEvent: FeedEvent) => {
    switch(feedEvent.event_type as FeedEventType) {
      case FeedEventType.announcement:
        const announcement: Announcement = { id: feedEvent.ref_id, title: feedEvent.subject, body: feedEvent.body}
        return <AnnouncementCard key={FeedEventType.announcement+announcement.id} announcement={announcement}/>

      case FeedEventType.new_project:
        const project: Project = {
          id: feedEvent.ref_id,
          name: feedEvent.subject,
          description: feedEvent.body,
          icon_url: feedEvent.icon_url,
        }
        return (
          <Link href={`/projects/${project.id}`} key={FeedEventType.new_project+project.id}>
            <a><ProjectCard project={project} /></a>
          </Link>
        )

      case FeedEventType.new_user:
        const user: User = {
          id: feedEvent.ref_id,
          name: feedEvent.subject,
          bio: feedEvent.body,
          avatar_url: feedEvent.icon_url,
          fellowship: feedEvent.fellowship,
        }
        return (
          <Link href={`/users/${user.id}`} key={FeedEventType.new_user+user.id}>
            <a><UserCard user={user} /></a>
          </Link>
        )

      default:
        return <p>...failed to identify type of feed event...</p>;
    }
  }
  
  return (
    <Layout>
      { feedEvents?.map(renderEventByType) }
    </Layout>
  )
}