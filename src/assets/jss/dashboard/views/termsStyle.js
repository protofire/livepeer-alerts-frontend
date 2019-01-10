import { cardTitle } from '../../dashboard.js'

const termsStyle = {
  cardTitle: {
    ...cardTitle,
    lineHeight: '1.2',
    textAlign: 'center',
    marginBottom: '30px'
  },
  cardText: {
    fontSize: '16px',
    lineHeight: 1.5,
    marginBottom: '25px',
    '&:last-child': {
      marginBottom: '0'
    }
  },
  cardContainer: {
    width: '550px',
    maxWidth: '100%'
  },
  cardTerms: {
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    marginBottom: '0',
    padding: '25px',
    marginTop: '0'
  },
  gridContainer: {
    margin: '0',
    position: 'relative',
    width: '100%',
    zIndex: '12'
  }
}

export default termsStyle
