import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

import { User } from '../../models/User'

import Layout from 'components/Layout'
import UserCard from 'components/UserCard'
import Spinner from 'components/util/Spinner'
import BasicButton from 'components/util/BasicButton'
import ErrorBox from 'components/util/ErrorBox'

const USER_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      bio
      fellowship
      avatar_url
      projects {
        id
        name
        icon_url
      }
    }
  }
`

type QueryData = {
  user: User;
}

type QueryVars = {
  id: number;
}

export default function UserPage() {
  const router = useRouter()

  const { data, error, loading } = useQuery<QueryData, QueryVars>(
    USER_QUERY,
    {
      skip: !router.query.id,
      variables: { id: Number(router.query.id) },
    }
  )
  const user = data?.user;
  
  if (loading) {
    return <Layout><Spinner /></Layout>
  }

  if (!user || error) {
    return <ErrorBox message="..error retrieving user..." />
  }

  return (
    <Layout>
      <UserCard user={user} />
      <BasicButton onClickHandler={() => router.back()} buttonText="go back" />
    </Layout>
  )
}
