import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import React from 'react'
const TooltipPopup = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  outline: none;
  position: relative;
  white-space: normal;

  > svg {
    margin-left: 5px;

    path {
      fill: ${props => props.theme.colors.lightText};
    }

    &:hover {
      path {
        fill: ${props => props.theme.colors.darkGray};
      }
    }
  }

  .reactTooltip {
    background-color: #000;
    color: #fff;
    max-width: 280px;
    opacity: 1;
    text-align: left;

    &.place-left:after {
      border-left-color: #000;
    }

    &.place-right:after {
      border-right-color: #000;
    }

    &.place-top:after {
      border-top-color: #000;
    }

    &.place-bottom:after {
      border-bottom-color: #000;
    }

    .multi-line {
      text-align: left;
    }
  }
`

const KeyValueToolTiped = props => {
  const { value, tooltipText } = props
  return (
    <>
      <a data-tip data-for="textKey">
        {value}
      </a>
      <ReactTooltip id="textKey" className="TooltipPopup">
        <span>{tooltipText}</span>
      </ReactTooltip>
    </>
  )
}

export default KeyValueToolTiped
