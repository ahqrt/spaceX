import { View, SafeAreaView, FlatList, ActivityIndicator, Modal } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { Card, FocusedStatusBar } from "../../components";
import { COLORS } from "../../constants";
import Search from "./Search";
import ActionButton from "react-native-action-button";
import HomeHeader from "./HomeHeader";
import useInit from "./hooks/useInit";

const Home = () => {

  const { isLoading, allData, handleLoadMore, flatlistRef, handleSearch, setOpenModel, openModel, searchContent } = useInit()

  const renderFooter = () => {
    if (!isLoading) {
      return null;
    }

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatlistRef}
          data={allData}
          renderItem={({ item }) => <Card data={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<HomeHeader onSearch={handleSearch} onFilter={() => setOpenModel(true)} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          stickyHeaderIndices={[0]}
        />
      </View>

      {/* float action button */}
      <ActionButton
        renderIcon={() => <AntDesign name="arrowup" size={24} color="black" />}
        buttonColor="rgba(231,76,60,1)"
        onPress={() => { flatlistRef.current.scrollToOffset({ animated: true, offset: 0 }) }}
      />

      {/* filter model */}
      <Modal
        visible={openModel}
        transparent={true}
        animationType='fade'
      >
        <Search
          initialState={searchContent.current}
          onSearch={(val) => {
            setOpenModel(false)
            searchContent.current = val
          }} />
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
