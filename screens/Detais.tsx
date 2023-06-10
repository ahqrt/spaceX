import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { CircleButton, RectButton, DetailsDesc, DetailsBid, FocusedStatusBar } from "../components";
import YoutubePlayer from "react-native-youtube-iframe";

const DetailsHeader = ({ data, navigation }) => (

  <View style={{ width: "100%", height: 300 }}>
    <View style={{ marginTop: StatusBar.currentHeight + 10 }}>
      {
        data.links.youtube_id ?
          <YoutubePlayer
            height={300}
            videoId={data.links.youtube_id}
          /> :
          <Image
            source={{ uri: data.links.patch.small }}
            resizeMode='contain'
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: SIZES.font,
              borderTopRightRadius: SIZES.font
            }}
          />
      }
    </View>

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}
    />
  </View>
);

const Details = ({ route, navigation }) => {
  const { data } = route.params;

  useEffect(() => {
    console.log('data.youtube_id', data);
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />


      <React.Fragment>
        <DetailsHeader data={data} navigation={navigation} />
        <View style={{ padding: SIZES.font }}>
          <DetailsDesc data={data} />
        </View>
      </React.Fragment>
    </SafeAreaView>
  );
};

export default Details;
