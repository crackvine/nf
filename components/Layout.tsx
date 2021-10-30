import styled from 'styled-components'

const Layout = ({children}: React.PropsWithChildren<{}>) => (
  <Container>
    <Main>
      { children }
    </Main>
  </Container>
)

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Main = styled.div`
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 600px;
`

export default Layout
