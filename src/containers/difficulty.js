import { connect } from 'react-redux'
import { setDifficulty } from '../actions'
import Difficulty from '../components/Difficulty'
import { validDifficulties } from '../lib/difficulties';

const mapDispatchToProps = (dispatch, { history }) => ({
  setDifficulty: ({ value }) => {
    dispatch(setDifficulty(value));

    if (validDifficulties.includes(value)) {
      history.push(`/${ value }`);
    }
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Difficulty)
