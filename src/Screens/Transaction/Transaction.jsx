import React, { useState } from 'react'
import DahboardNav from '../../Components/DahboardNav/DahboardNav'
import { Button } from '@mui/material'
import CreateTransaction from '../../Components/CreateTransaction/CreateTransaction';

const Transaction = () => {

  const [isCreateTransPressed, setIsCreateTransPressed] = useState(false);

  const buttonPressed = () => {
    setIsCreateTransPressed(true)
  }

  return (
    <div>
      {/* <DahboardNav /> */}
      <Button variant='contained' onClick={buttonPressed}> Create Account </Button>
      {
        isCreateTransPressed && (
          <CreateTransaction />
        )
      }
    </div>
  )
}

export default Transaction