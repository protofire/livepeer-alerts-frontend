import React from 'react'
import styled from 'styled-components'
import IconGithub from './img/IconGithub'

const FooterStyled = styled.footer`
  margin-top: auto;
  padding-top: 30px;
`

const Text = styled.p`
  color: ${props => props.theme.footer.color};
  font-size: ${props => props.theme.footer.fontSize};
  line-height: 1.2;
  margin: 0;
  text-align: center;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.9);

  > a {
    color: ${props => props.theme.footer.color};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    margin: 0 10px;
  }
`

function Footer({ ...props }) {
  return (
    <FooterStyled>
      <Text>
        {1900 + new Date().getYear()} <a href="https://www.protofire.io">Built by Protofire.io.</a>
        <a href="https://github.com/protofire/livepeer-alerts-frontend">
          <IconGithub />
        </a>
        <a href="https://github.com/protofire/livepeer-alerts-frontend/issues/new">Report a bug</a>
      </Text>
    </FooterStyled>
  )
}

export default Footer
