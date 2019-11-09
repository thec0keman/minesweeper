import { connect } from 'react-redux'
import Detonator from '../components/Detonator'
import { chainReaction } from '../actions';

const mapStateToProps = ({ board, detonate }) => ({
  board,
  detonate,
});

const mapDispatchToProps = (dispatch) => ({
  chainReaction: (cell) => dispatch(chainReaction(cell)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detonator)
