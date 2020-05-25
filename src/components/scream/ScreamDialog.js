import React, { Component, Suspense } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
import LikeButton from './LikeButton'
import CommentForm from './CommentForm.js'
import dayjs from 'dayjs'

// MUI stuff
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CirclularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'
import UnfoldMore from '@material-ui/icons/UnfoldMore'

// Redux stuff
import { connect } from 'react-redux'
import { getScream, clearErrors } from '../../redux/actions/dataActions'

const Comments = React.lazy(() => import('./CommentsAhmed'))


const styles = (theme) => ({
  ...theme.spreadIt,
  dialogContent: {
    padding: 20,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
})

class ScreamDialog extends Component {
  state = {
    open: false,
    openComments: false,
    oldPath: '',
    newPath: ''
  }
  componentDidMount () {
    if (this.props.openDialog) {
      this.handleOpen()
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname
    const { userHandle, screamId } = this.props
    const newPath = `/users/${userHandle}/scream/${screamId}`
    if (oldPath === newPath) oldPath = `/users/${userHandle}`
    window.history.pushState(null, null, newPath)
    this.setState({ open: true, oldPath, newPath })
    this.props.getScream(this.props.screamId)
  }
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath)
    this.setState({ open: false, openComments: false })
    this.props.clearErrors()
  }
  expandComments = () => {
    this.setState((prevState) => ({ openComments: !prevState.openComments }))
  }
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CirclularProgress
          className={classes.circlularProgress}
          size={200}
          thickness={2}
        />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img
            src={userImage}
            alt="Profile"
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, DD MMM YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments" onClick={this.expandComments}>
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <hr className={classes.visibleSeparator} />
          <CommentForm screamId={screamId}/>
          {comments && this.state.openComments ? (
            comments.length > 0 ? (
              <hr className={classes.visibleSeparator} />
            ) : null
          ) : null}
          <Suspense>
            <Comments open={this.state.openComments} comments={comments} />
          </Suspense>
        </Grid>
      </Grid>
    )
    return (
      <>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand scream"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </>
    )
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
})

const mapActionsToProps = {
  getScream,
  clearErrors
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog))
