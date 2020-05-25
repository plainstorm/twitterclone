import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import dayjs from 'dayjs'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  ...theme.spreadIt,
  commentImage: {
    maxWidth: '100%',
    height: 50,
    width: 50,
    objectFit: 'cover',
    borderRadius: 25,
  },
  commentData: {
    marginLeft: 20,
  },
})

class Comments extends Component {
  render() {
    const { comments, classes } = this.props

    return (
      <Grid container>
        {this.props.open && typeof comments !== 'undefined' ? (comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, DD MMM YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index === comments.length - 1 ? null : (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          )
        })): null }
      </Grid>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default withStyles(styles)(Comments)
