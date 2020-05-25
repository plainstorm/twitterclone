import React, { Component } from 'react'
import MyButton from '../../util/MyButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { likeScream, unlikeScream } from '../../redux/actions/dataActions'

// Icon stuff
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

// Redux stuff
import { connect } from 'react-redux'

class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    )
      return true
    else return false
  }
  likeScream = () => {
    this.props.likeScream(this.props.screamId)
  }
  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId)
  }
  render() {
    const { authenticated } = this.props.user
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip="Unlike scream" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like scream" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    )
    const likeCounter = this.props.likeCount && (
    <span>{this.props.likeCount} likes</span>
    )
    return (
      <>
      {likeButton}
      {likeCounter}
      </>
    )
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  likeScream,
  unlikeScream,
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
