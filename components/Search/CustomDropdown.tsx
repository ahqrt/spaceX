import { FC } from "react"
import SelectDropdown, { SelectDropdownProps } from "react-native-select-dropdown"
import { SIZES, COLORS, FONTS } from "../../constants"

const CustomDropdown: FC<SelectDropdownProps> = ({ data, onSelect, defaultValue }) => {
  return (
    <SelectDropdown
      data={data}
      defaultValue={defaultValue}
      onSelect={onSelect}
      buttonStyle={{
        width: 80,
        height: 40,
        borderRadius: SIZES.extraLarge,
        borderColor: COLORS.white,
        borderWidth: 1,
        backgroundColor: 'transparent'
      }}

      buttonTextStyle={{
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.font,
        color: COLORS.white,
        textAlign: 'center'
      }}
    />
  )
}

export default CustomDropdown