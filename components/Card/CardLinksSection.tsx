import Link from 'next/link'
import styled from 'styled-components'

type LinksSectionProps = {
  sectionTitle: string,
  links: SectionLink[]
}

type SectionLink = {
  iconUrl: string,
  text: string,
  url: string,
}

export const CardLinksSection = ({sectionTitle, links}: LinksSectionProps) => {
  return (
    <>
      <h3>{ sectionTitle }</h3>
      {links.map(link => (
        <LinksSectionWrapper key={link.url}>
          <LinksSectionColumnLeft>
            <LinksIcon src={ link.iconUrl } alt="icon" />
          </LinksSectionColumnLeft>
          <LinksSectionColumnRight>
            <Link href={`${ link.url }`} passHref><BasicAnchor>{ link.text }</BasicAnchor></Link>
          </LinksSectionColumnRight>
        </LinksSectionWrapper>
      ))}
    </>
  )
}

const BasicAnchor = styled.a`
  color: #555555;
  text-decoration: none;
  &:visited {
    color: #555555;
  }
  &:hover {
    color: #000;
  }
`

const LinksIcon = styled.img`
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.1);
`

const LinksSectionWrapper= styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const LinksSectionColumnLeft = styled.div`
  flex-basis: 2rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 1rem;
`

const LinksSectionColumnRight = styled.div`
  flex-basis: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
