import styled from 'styled-components'
import Markdown from '../Markdown'

type CardProps = {
  title: string,
  subTitle?: string,
  description: string,
  iconUrl: string,
}

export const Card: React.FunctionComponent<CardProps> = ({iconUrl, title, subTitle, description, children}) => {
  return (
  <Wrapper>
    <Columns>
        <ColumnLeft>
          <Icon src={ iconUrl } alt="icon" />
        </ColumnLeft>
        <ColumnRight>
          <h2>{ title }</h2>
          { !!subTitle && <p>{ subTitle }</p> }
          <Markdown>{ description || '' }</Markdown>
          {children}
        </ColumnRight>
      </Columns>
  </Wrapper>
)};

const Wrapper = styled.div`
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 2rem;
  a:hover & {
    border: 1px solid #aaaaaa;
  }
`

const Icon = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`

