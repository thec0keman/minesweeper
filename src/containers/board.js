import { connect } from 'react-redux'
import Board from '../components/Board'
import { clickCell, flagCell } from '../actions';

const mapStateToProps = ({ board, gameRunning, gameOver, gameWon, selectedCells, flaggedCells }) => ({
  board,
  gameRunning,
  gameOver,
  gameWon,
  selectedCells,
  flaggedCells
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  clickCell: (e, cell) => {
    e.preventDefault();
    return clickCell(cell);
  },

  flagCell: (e, cell) => {
    e.preventDefault();
    return flagCell(cell);
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
