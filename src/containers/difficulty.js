import { connect } from 'react-redux'
import { setDifficulty } from '../actions'
import Difficulty from '../components/Difficulty'

const mapDispatchToProps = (dispatch) => ({
  setDifficulty: ({ value }) => dispatch(setDifficulty(value))
})

export default connect(
  null,
  mapDispatchToProps
)(Difficulty)
