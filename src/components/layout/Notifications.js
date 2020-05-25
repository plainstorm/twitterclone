import React, { Component } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// MUI stuff
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import ChatIcon from '@material-ui/icons/Chat'

// Redux stuff
import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/userActions'

class Notifications extends Component {
  state = {
    anchorEl: null,
  }
  handleOpen = (event) => {
    this.setState({ anchorEl: event.target })
  }
  handleClose = () => {
    this.setState({ anchorEl: null })
  }
  onMenuOpen = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter(not => !not.read)
      .map(not => not.notificationId)
    this.props.markNotificationsRead(unreadNotificationsIds)
  }
  render() {
    dayjs.extend(relativeTime)
    const notifications = this.props.notifications
    const anchorEl = this.state.anchorEl

    let notifcationsIcon
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notifcationsIcon = (
            <Badge
              badgeContent={
                notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notifcationsIcon = <NotificationsIcon />)
    } else {
      notifcationsIcon = <NotificationsIcon />
    }
    let notifcationsMarkup = notifications && notifications.length > 0
    ? (notifications.map(not => {
      const verb = not.type === 'like' ? 'liked' : 'commented on'
      const time = dayjs(not.createdAt).fromNow()
      const iconColor = not.read ? 'primary' : 'secondary'
      const icon = not.type = 'like' ? (
        <NotificationsIcon color={iconColor} style={{marginRight: 10}} />
      ) : (
        <ChatIcon color={iconColor} style={{marginRight: 10}} />
      )
      return (
        <MenuItem key={not.createdAt} onClick={this.handleClose}>
          {icon}
          <Typography
          component={Link}
          color="textPrimary"
          variant="body1"
          to={`/users/${not.recipient}/scream/${not.screamId}`} >
            {not.sender} {verb} your scream {time}
          </Typography>
        </MenuItem>
      )
    })) : (
      <MenuItem onClick={this.handleClose}>
        You have not notifications yet
      </MenuItem>
    )
    return (
      <>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notifcationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpen}
        >
          {notifcationsMarkup}
        </Menu>
      </>
    )
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  Notifications: PropTypes.object,
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
})

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
)
