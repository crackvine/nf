import {useRouter} from 'next/router'
import {useQuery, gql} from '@apollo/client'

import {Project} from '../../models/Project'

import Layout from 'components/Layout'
import ProjectCard from 'components/ProjectCard'
import Spinner from 'components/util/Spinner'
import BasicButton from 'components/util/BasicButton'
import ErrorBox from 'components/util/ErrorBox'

const PROJECT_QUERY = gql`
  query project($id: Int!) {
    project(id: $id) {
      id
      name
      description
      icon_url
      users {
        id
        name
        avatar_url
      }
    }
  }
`

type QueryData = {
  project: Project;
}

type QueryVars = {
  id: number;
}

export default function ProjectPage() {
  const router = useRouter()

  const { data, error, loading } = useQuery<QueryData, QueryVars>(
    PROJECT_QUERY,
    {
      skip: !router.query.id,
      variables: { id: Number(router.query.id) },
    }
  )
  const project = data?.project;

  if (loading) {
    return <Layout><Spinner /></Layout>
  }

  if (!project || error) {
    return <ErrorBox message="...error retrieving project..." />
  }

  return (
    <Layout>
      <ProjectCard project={project} />
      <BasicButton onClickHandler={() => router.back()} buttonText="go back" />
    </Layout>
  )
}