import { connect } from 'react-redux'
import Cell from '../components/Cell'
import { clickCell, flagCell } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const {
    selectedCells,
    flaggedCells,
    exploded,
    gameOver
  } = state;
  const {
    cell
  } = ownProps;

  return {
    isVisible: gameOver || selectedCells.includes(cell),
    isFlagged: flaggedCells.includes(cell),
    isExploded: exploded.includes(cell),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  flagCell: (e, cell) => {
    e.preventDefault();

    return dispatch(flagCell(cell));
  },
  clickCell: (e, cell) => {
    e.preventDefault();

    return dispatch(clickCell(cell));
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell)
