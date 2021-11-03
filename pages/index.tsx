import { useState, useEffect, ChangeEvent } from 'react';
import Head from 'next/head'
import { useQuery, gql } from '@apollo/client'

import { Fellowship } from 'models/enums'
import { FeedEvent } from 'models/FeedEvent'
import Layout from 'components/Layout'
import Feed from 'components/Feed'
import { FellowshipSelector } from 'components/FellowshipSelector';
import Spinner from 'components/util/Spinner'
import ErrorBox from 'components/util/ErrorBox';
import config from 'config'

const FEED_QUERY = gql`
  query feed($skip: Int, $limit: Int, $fellowship: Fellowship) {
    feedEvents(skip: $skip, limit: $limit, fellowship: $fellowship) {
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
  const [fellowship, setFellowship] = useState<Fellowship | undefined>()

  const {error, loading, data, fetchMore} = useQuery<QueryData>(
    FEED_QUERY,
    { variables: { skip: 0, limit: config.feedEventsPerPage, fellowship } }
  )

  useEffect(() => {
    setFeedEvents(data?.feedEvents || [])
    return () => setFeedEvents([])
  }, [data])
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    if (window.scrollY + 1 + window.innerHeight >= document.body.scrollHeight && !loading) {
      fetchMore({
        variables: {
          skip: feedEvents.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            feedEvents: [
              ...prev.feedEvents,
              ...fetchMoreResult.feedEvents.filter(
                newItem => !prev.feedEvents.some(item => item.event_type === newItem.event_type && item.ref_id === newItem.ref_id)
              )
            ]
          });
        }
      });
    }
  };

  const onChangeFellowship = (e: ChangeEvent<HTMLInputElement>) => {
    setFellowship(e.target.value as Fellowship)
  }

  if (!feedEvents || error) {
    return <ErrorBox message="...error loading feed..." />
  }
  
  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <FellowshipSelector selectedFellowship={fellowship} onChangeFellowship={onChangeFellowship} />
      { loading ? <Spinner /> : <Feed feedEvents={feedEvents} /> }
    </Layout>
  )
}