import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useCallback, useState } from "react";
import { Platform } from "react-native";
import { SearchProps } from "../Search";
const isIos = Platform.OS === 'ios'

const useInit = ({initialState, onSearch}: SearchProps) => {
  const [startTime, setStartTime] = useState(initialState.startTime);
  const [showIosStartTimePicker, setShowIosStartTimePicker] = useState(false)
  const [endTime, setEndTime] = useState(initialState.endTime);
  const [showIosEndTimePicker, setShowIosEndTimePicker] = useState(false)

  const [selectedSortType, setSelectedSortType] = useState(initialState.sortType || 'desc')
  const [selectedLunchState, setSelectedLunchState] = useState(initialState.lunchState || 'all')

  const timePickerBtnPress = useCallback((type: 'start' | 'end') => {
    const openTimePicker = (onChange) => {
      DateTimePickerAndroid.open({
        value: new Date(),
        onChange: onChange
      });
    };

    const handleTimeChange = (event, date) => {
      if (type === 'start') {
        setStartTime(date);
      } else {
        setEndTime(date);
      }
    };

    if (isIos) {
      if (type === 'start') {
        setShowIosStartTimePicker(true);
      } else {
        setShowIosEndTimePicker(true);
      }
    } else {
      openTimePicker(handleTimeChange);
    }
  }, []);



  const reset = useCallback(() => {
    setStartTime(undefined)
    setEndTime(undefined)
    setShowIosStartTimePicker(false)
    setShowIosEndTimePicker(false)
    setSelectedSortType('desc')
    setSelectedLunchState('all')
  }, [])


  const handleConfirm =useCallback(() => {
    if(endTime < startTime) {
      alert('End time must be greater than start time')
      return
    }else {
      onSearch({
        startTime,
        endTime,
        lunchState: selectedLunchState,
        sortType: selectedSortType
      })
    }
  }, [endTime, startTime, onSearch, selectedLunchState, selectedSortType])

  return {
    startTime,
    setStartTime,
    showIosStartTimePicker,
    setShowIosStartTimePicker,
    endTime,
    setEndTime,
    showIosEndTimePicker,
    setShowIosEndTimePicker,
    selectedSortType,
    setSelectedSortType,
    selectedLunchState,
    setSelectedLunchState,
    timePickerBtnPress,
    reset,
    handleConfirm
  }

}

export default useInit