import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";

import { COLORS, FONTS, SIZES, assets } from "../constants";
import { RectButton } from "./Button";
import { useNavigation } from "@react-navigation/native";

const HomeHeader = ({ onSearch, onFilter }) => {
  const [name, setName] = useState("");
  const navigation = useNavigation()

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.font,
        paddingRight: SIZES.base,
      }}
    >

      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.white,
          }}
        >
          Hello Victoria 👋
        </Text>

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}
        >
          Let’s get see what’s happening today
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: SIZES.font }}>
        <View
          style={{
            flex: 1,
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder=""
            onChangeText={setName}
            style={{ flex: 1 }}
          />
        </View>
        <RectButton text='filter' minWidth={60} marginLeft={10} handlePress={onFilter} fontSize={SIZES.font} backgroundColor={COLORS.filter} />
        <RectButton text='search' minWidth={100} handlePress={() => onSearch(name)} fontSize={SIZES.font} backgroundColor={COLORS.search} />
      </View>
    </View>
  );
};

export default HomeHeader;
