import { connect } from 'react-redux'
import Game from '../components/Game'
import { resetGame, chainReaction } from '../actions';

const mapStateToProps = ({ difficulty, resetGame, board, detonate }) => ({ difficulty, resetGame, board, detonate });

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGame()),

  clearDifficulty: () => dispatch(resetGame(true)),

  chainReaction: (cell) => dispatch(chainReaction(cell))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
