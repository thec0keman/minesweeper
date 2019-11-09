import { connect } from 'react-redux'
import Board from '../components/Board'

const mapStateToProps = ({ board, gameRunning, gameOver, gameWon, selectedCells, flaggedCells }) => ({
  board,
  gameRunning,
  gameOver,
  gameWon,
  selectedCells,
  flaggedCells
})

export default connect(
  mapStateToProps,
  null
)(Board)
