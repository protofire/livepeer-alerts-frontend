import { cardTitle } from '../../dashboard.js'
const userProfileStyles = {
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
    '& small': {
      fontSize: '80%',
      fontWeight: '400'
    }
  },
  cardCategory: {
    marginTop: '10px',
    color: '#999999 !important',
    textAlign: 'center'
  },
  description: {
    color: '#999999'
  },
  updateProfileButton: {
    float: 'right'
  }
}
export default userProfileStyles
