import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
import LikeButton from './LikeButton'
import dayjs from 'dayjs'

// MUI stuff
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CirclularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import { connect } from 'react-redux'

const styles = (theme) => ({
  ...theme.spreadIt,
  commentImg: {
    width: 70
  }
})

class Comments extends Component {
  render() {
    const { comments, classes } = this.props
    const commentsMarkup = this.props.open ? (
      <div>
        {comments.map((comment) => (
          <div>
            <img src={comment.userImage} className={classes.commentImg}/>
            {comment.body}
          </div>
        ))}
      </div>
    ) : null
    return commentsMarkup
  }
}

export default withStyles(styles)(Comments)
