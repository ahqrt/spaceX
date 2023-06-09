import { useMemo, useReducer, useRef, useState } from "react";
import { View, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import useSwr from "swr";

import { Card, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS } from "../constants";
import { getLaunches } from "../fetcher";


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


function reducer(state, action) {
  switch (action.type) {
    case 'changeSate':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}




const Home = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useReducer<any>(reducer, {});
  const allDatas = useRef<any[]>([])
  const [sortType, setSortType] = useState('desc')
  const hasMore = useRef(true)

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
    console.log('data', data, data.nextPage);

    if (data.nextPage === null) {
      hasMore.current = false
    }
  }

  const handleSearch = (value) => {
    allDatas.current = []
    console.log('value', value);

    setPage(1)
    if (value) {
      setQuery({ name: value })
    } else {
      setQuery({})
    }
  };

  const handleLoadMore = () => {
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
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
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
    </SafeAreaView>
  );
};

export default Home;
