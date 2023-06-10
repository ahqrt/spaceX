import { useMemo, useReducer, useRef, useState } from "react";
import { View, SafeAreaView, FlatList, ActivityIndicator, Modal } from "react-native";
import useSwr from "swr";

import { Card, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS } from "../constants";
import { getLaunches } from "../fetcher";
import Search, { SearchContent } from "../components/Search/Search";


const initilaQuery = {
  success: undefined,
  date_utc: {
    $gte: undefined,
    $lte: undefined
  },
  $text: {
    $search: 'crs'
  },
}


const Home = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<any>({});
  const allDatas = useRef<any[]>([])
  const [sortType, setSortType] = useState('desc')
  const hasMore = useRef(true)
  const [openModel, setOpenModel] = useState(false)

  const searchContent = useRef<SearchContent>({
    startTime: undefined,
    endTime: undefined,
    lunchState: 'all',
    sortType: 'asc',
  })

  const { data, isLoading, error } = useSwr(['/lunchers', page, sortType, query], () => getLaunches(page, sortType, query))

  const allData = useMemo(() => {
    if (data?.docs?.length) {
      allDatas.current = [...allDatas.current, ...data.docs];
    } else if (allDatas.current.length === 0) {
      allDatas.current = [];
    }
    return allDatas.current;
  }, [data]);

  if (data) {
    // console.log('data', data, data.nextPage);

    if (data.nextPage === null) {
      hasMore.current = false
    } else {
      hasMore.current = true
    }

  }

  const handleSearch = (value) => {
    allDatas.current = []
    console.log('value', value, searchContent.current);
    setPage(1)
    let query = {}
    if (searchContent.current.startTime && searchContent.current.endTime) {
      query = {
        date_utc: {
          $gte: searchContent.current.startTime,
          $lte: searchContent.current.endTime
        }
      }
    }
    if (searchContent.current.lunchState !== 'all') {
      query = {
        ...query,
        success: searchContent.current.lunchState === 'success'
      }
    }

    if (value) {
      query = {
        ...query,
        $text: {
          $search: value
        }
      }
    }

    if (searchContent.current.sortType !== sortType) {
      setSortType(searchContent.current.sortType)
    }

    console.log('query', query);
    setQuery(query)
  };

  const handleLoadMore = () => {
    if (isLoading) {
      return
    }
    if (hasMore.current) {
      setPage((prev) => prev + 1);
    }
  }

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
        <View style={{ zIndex: 0 }}>
          <FlatList
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

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View
            style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>


      {/* filter model */}
      <Modal
        visible={openModel}
        transparent={true}
        animationType='fade'
      >
        <Search
          initialState={searchContent.current}
          onSearch={(val) => {
            console.log('val', val);
            setOpenModel(false)
            searchContent.current = val
          }} />


      </Modal>

    </SafeAreaView>
  );
};

export default Home;
