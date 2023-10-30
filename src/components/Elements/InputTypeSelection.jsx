import React from 'react'
import { Tabs, Tab } from '@mui/material'
import { Segment, Summarize, Done } from '@mui/icons-material'

const InputTypeSelection = (props) => {
  const {value, handleChange} = props;
  return (
    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
      <Tab icon={<Segment />} label="Generate" />
      <Tab icon={<Summarize />} label="Simplify" />
      <Tab icon={<Done />} label="Know your law" />
    </Tabs>
  )
}

export default InputTypeSelection