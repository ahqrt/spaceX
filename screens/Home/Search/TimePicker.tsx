import React, { FC } from "react"
import { NoStyleButton } from "../../../components/Button"
import { SIZES } from "../../../constants"
import SearchItem from "./SearchItem"
import { Platform } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';

const isIos = Platform.OS === 'ios'

interface TimePickerProps {
  show: boolean,
  time: Date | undefined,
  title: string,
  btnText: string,
  btnPress: () => void,
  onChange: (date: Date | undefined) => void
}

const TimePicker: FC<TimePickerProps> = ({ show, time, title, btnText, btnPress, onChange }) => {
  return (
    <SearchItem title={title} >
      {
        !show &&
        <NoStyleButton
          text={btnText}
          minWidth={100}
          fontSize={SIZES.font}
          handlePress={btnPress}
        />
      }
      {isIos &&
        show &&
        <DateTimePicker
          value={time || new Date()}
          onChange={(event, date) => {
            onChange(date)
          }}
        />
      }
    </SearchItem >
  )
}

export default TimePicker