import { FC, useState } from "react";
import { View, Text, TextInput, Image, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import { CircleButton, NoStyleButton, RectButton } from "../Button";
import { SIZES, COLORS, assets, FONTS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { FocusedStatusBar } from "..";
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import SearchItem from "./SearchItem";
import CustomDropdown from "./CustomDropdown";

const sortType = ['asc', 'desc']
const lunchState = ['all', 'success', 'failed']

export interface SearchContent {
  startTime: Date | undefined,
  endTime: Date | undefined,
  lunchState: string,
  sortType: string,
}

interface SearchProps {
  initialState: SearchContent,
  onSearch: (info: SearchContent) => void
}


const Search: FC<SearchProps> = ({ initialState, onSearch }) => {

  const [startTime, setStartTime] = useState(initialState.startTime);
  const [endTime, setEndTime] = useState(initialState.endTime);

  const [selectedSortType, setSelectedSortType] = useState(initialState.sortType || 'desc')
  const [selectedLunchState, setSelectedLunchState] = useState(initialState.lunchState || 'all')


  const reset = () => {
    setStartTime(undefined)
    setEndTime(undefined)
    setSelectedSortType('desc')
    setSelectedLunchState('all')
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingTop: SIZES.font, width: '100%', height: 300, backgroundColor: COLORS.primary, marginTop: StatusBar.currentHeight }}>
        {/* start time picker */}
        <SearchItem title={'please chose the start time'} >
          <NoStyleButton
            text={startTime ? startTime.toLocaleDateString() : 'start time'}
            minWidth={100}
            fontSize={SIZES.font}
            handlePress={() => {
              DateTimePickerAndroid.open({
                value: new Date(),
                onChange: (event, date) => {
                  setStartTime(date)
                }
              })
            }}
          />
        </SearchItem>


        {/* end time picker */}
        <SearchItem title={'please chose the end time'} >
          <NoStyleButton
            text={endTime ? endTime.toLocaleDateString() : 'end time'}
            minWidth={100}
            fontSize={SIZES.font}
            handlePress={() => {
              DateTimePickerAndroid.open({
                value: new Date(),
                onChange: (event, date) => {
                  setEndTime(date)
                }
              })
            }} />
        </SearchItem>

        {/* sort type picker */}
        <SearchItem title={'please chose the sort type'} >
          <CustomDropdown
            data={sortType}
            defaultValue={selectedSortType}
            onSelect={(selectedItem, index) => {
              setSelectedSortType(selectedItem)
            }}
          />
        </SearchItem>

        {/* lunch state picker */}
        <SearchItem title={'please chose the lunch state'} >
          <CustomDropdown
            data={lunchState}
            defaultValue={selectedLunchState}
            onSelect={(selectedItem, index) => {
              setSelectedLunchState(selectedItem)
            }}
          />

        </SearchItem>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <RectButton text="reset" minWidth={100} fontSize={SIZES.font} backgroundColor={COLORS.filter} handlePress={reset} />
          <RectButton text="confirm" minWidth={100} fontSize={SIZES.font} backgroundColor={COLORS.search} handlePress={() => {
            onSearch({
              startTime,
              endTime,
              lunchState: selectedLunchState,
              sortType: selectedSortType
            })
          }} />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Search;