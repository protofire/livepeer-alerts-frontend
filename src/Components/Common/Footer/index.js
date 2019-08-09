import React from 'react'
import styled from 'styled-components'
import IconGithub from './img/IconGithub'
import { TELEGRAM_CHAT_URL } from '../../../Utils/constants'
const FooterStyled = styled.footer`
  margin-top: auto;
  padding-top: 30px;
`

const Text = styled.p`
  color: ${props => props.theme.footer.color};
  font-size: ${props => props.theme.footer.fontSize};
  line-height: 1.2;
  margin: 0px;
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

const LetsConnectText = styled(Text)`
  padding-bottom: 20px;
  font-size: ${props => props.theme.footer.telegramLinkFontSize};
  > a {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
`

function Footer({ ...props }) {
  return (
    <FooterStyled>
      <LetsConnectText>
        <a href={TELEGRAM_CHAT_URL} target="_blank">
          Lets connect!
        </a>
      </LetsConnectText>
      <Text>
        {1900 + new Date().getYear()} <a href="https://www.protofire.io">Built by Protofire.io.</a>
        <a href="https://github.com/protofire/livepeer-alerts-frontend" target="_blank">
          <IconGithub />
        </a>
        <a href="https://github.com/protofire/livepeer-alerts-frontend/issues/new" target="_blank">
          Report a bug
        </a>
      </Text>
    </FooterStyled>
  )
}

export default Footer
