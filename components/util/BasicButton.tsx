import styled from 'styled-components'

type Props = {
  buttonText: string;
  onClickHandler: () => void;
}

const BasicButton = ({ buttonText, onClickHandler }: Props) => {
  return (
    <Wrapper>
      <Button onClick={onClickHandler}>{buttonText}</Button>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Button = styled.div`
  min-width: 10rem;
  padding: 0.8rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  background: #fff;
  text-align: center;
  color: #555555;
  font-variant: small-caps;
  &:hover {
    cursor: pointer;
    background: #eaeaea;
  }
`

export default BasicButton
