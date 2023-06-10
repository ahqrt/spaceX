import { View, Text } from "react-native"
import { FONTS, SIZES, COLORS } from "../../constants"

interface SearchItemProps {
  title: string
  children: React.ReactNode
}


const SearchItem = ({ title, children }) => {

  return (
    <View style={{ flexDirection: 'row', marginVertical: 5 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.font, color: COLORS.white }}>{title}</Text>
      </View>
      {children}
    </View>
  )
}

export default SearchItem