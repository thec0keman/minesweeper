import { connect } from 'react-redux'
import Game from '../components/Game'
import { resetGame, setDifficulty } from '../actions';
import { validDifficulties } from '../lib/difficulties';

const mapStateToProps = ({ difficulty, resetGame }, { history }) => ({
  difficulty,
  resetGame,
  history
});

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGame()),

  setDifficultyFromUrl: (value) => {
    if (validDifficulties.includes(value)) {
      dispatch(setDifficulty(value));
    }
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
