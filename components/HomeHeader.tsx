import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";

import { COLORS, FONTS, SIZES, assets } from "../constants";
import { RectButton } from "./Button";

const HomeHeader = ({ onSearch }) => {
  const [name, setName] = useState("");
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.font,
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

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
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
          <RectButton text='search' minWidth={100} handlePress={() => onSearch(name)} fontSize={SIZES.font} backgroundColor={COLORS.search} />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
