import React from 'react'
import Card from '../Card/Card'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import Spinner from '../Spinner/Spinner'

const spinnerExtended = props => {
  const { displayMsg } = props
  return (
    <>
      <GridContainer className="AccountSummaryGridContainer" justify="center" align="center">
        <GridItem>
          <Card className="AccountSummaryCard">
            <Spinner displayMsg={displayMsg} />
          </Card>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default spinnerExtended
