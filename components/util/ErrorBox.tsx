import styled from 'styled-components'

type Props = {
  message: string;
}

export const ErrorBox = ({ message }: Props) => {
  return (
    <Wrapper>
      <Message>{ message }</Message>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Message = styled.div`
  min-width: 21rem;
  padding: 0.8rem;
  border: 1px solid #520202;
  border-radius: 10px;
  background: #fff;
  text-align: center;
  color: #8a0505;
  font-variant: small-caps;
`

export default ErrorBox;