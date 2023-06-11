import { FC } from "react";
import { View, StatusBar, SafeAreaView, Platform } from "react-native";
import { RectButton } from "../../../components/Button";
import { SIZES, COLORS } from "../../../constants";
import SearchItem from "./SearchItem";
import CustomDropdown from "./CustomDropdown";
import TimePicker from "./TimePicker";
import useInit from "./hooks/useInit";

const sortType = ['asc', 'desc']
const lunchState = ['all', 'success', 'failed']

export interface SearchContent {
  startTime: Date | undefined,
  endTime: Date | undefined,
  lunchState: string,
  sortType: string,
}

export interface SearchProps {
  initialState: SearchContent,
  onSearch: (info: SearchContent) => void
}

const Search: FC<SearchProps> = ({ initialState, onSearch }) => {

  const {
    startTime, setStartTime, timePickerBtnPress, showIosStartTimePicker,
    showIosEndTimePicker, endTime, setEndTime, selectedSortType, setSelectedSortType,
    selectedLunchState, setSelectedLunchState, reset, handleConfirm
  } = useInit({ initialState, onSearch })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingTop: SIZES.font, width: '100%', height: 300, backgroundColor: COLORS.primary, marginTop: StatusBar.currentHeight }}>
        {/* start time picker */}

        <TimePicker
          show={showIosStartTimePicker}
          time={startTime}
          title={'please chose the start time'}
          btnText={startTime ? startTime.toLocaleDateString() : 'start time'}
          btnPress={() => timePickerBtnPress('start')}
          onChange={(date) => setStartTime(date)}
        />

        {/* end time picker */}
        <TimePicker
          show={showIosEndTimePicker}
          time={endTime}
          title={'please chose the end time'}
          btnText={endTime ? endTime.toLocaleDateString() : 'end time'}
          btnPress={() => timePickerBtnPress('end')}
          onChange={(date) => setEndTime(date)}
        />

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
          <RectButton text="confirm" minWidth={100} fontSize={SIZES.font} backgroundColor={COLORS.search} handlePress={handleConfirm} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Search;