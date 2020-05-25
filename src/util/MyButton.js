import React from 'react'

import ToolTip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

const MyButton = ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <ToolTip title={tip} placement="top" className={tipClassName}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </ToolTip>
)

export default MyButton
