import { Fellowship } from 'models/enums';
import { ChangeEvent } from 'react';
import styled from 'styled-components'

type Props = {
  selectedFellowship: Fellowship | undefined;
  onChangeFellowship: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FellowshipSelector = ({selectedFellowship, onChangeFellowship }: Props) => {

  return (
  <Wrapper>
    <Selector onChange={onChangeFellowship}>
      <RadioButton>
        <input type="radio" value="founders" defaultChecked={ selectedFellowship==='founders' } name="fellowship" />Founders
      </RadioButton>
      <RadioButton>
        <input type="radio" value="angels" defaultChecked={ selectedFellowship==='angels' } name="fellowship" />Angels
      </RadioButton>
      <RadioButton>
        <input type="radio" value="writers" defaultChecked={ selectedFellowship==='writers' } name="fellowship" />Writers
        </RadioButton>
    </Selector>
  </Wrapper>
  )
};

const Wrapper = styled.div`
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 2rem;
`

const Selector = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
  justify-content: space-evenly;
`

const RadioButton = styled.label`
  font-variant: small-caps;
  vertical-align: middle;
  input {
    margin-right: 1em;
  }
  input:hover {
    cursor: pointer;
  }
`
