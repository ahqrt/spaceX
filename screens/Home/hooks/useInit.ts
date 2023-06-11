import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import { SearchContent } from "../Search/Search";
import useSwr from "swr";
import { getLaunches } from "../../../fetcher";

const useInit = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<any>({});
  const allDatas = useRef<any[]>([])
  const [sortType, setSortType] = useState('desc')
  const hasMore = useRef(true)
  const [openModel, setOpenModel] = useState(false)
  const flatlistRef = useRef<FlatList>(null)

  const searchContent = useRef<SearchContent>({
    startTime: undefined,
    endTime: undefined,
    lunchState: 'all',
    sortType,
  })


  const handleSearch = useCallback((value: string) => {
    allDatas.current = []
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
    setQuery(query)
  }, [sortType]);
  
  const { data, isLoading, error } = useSwr(['/lunchers', page, sortType, query], () => getLaunches(page, sortType, query))

  const allData = useMemo(() => {
    if (data?.docs?.length) {
      allDatas.current = [...allDatas.current, ...data.docs];
    } else if (allDatas.current.length === 0) {
      allDatas.current = [];
    }
    return allDatas.current;
  }, [data]);

  const handleLoadMore =useCallback(() => {
    if (isLoading) {
      return
    }
    if (hasMore.current) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading])


  useEffect(() => {
    if (data) {
      if (data.nextPage === null) {
        hasMore.current = false
      } else {
        hasMore.current = true
      }
    }
  }, [data]) 

  return {
    allData,
    isLoading,
    error,
    handleLoadMore,
    handleSearch,
    searchContent,
    openModel,
    setOpenModel,
    flatlistRef
  }

}

export default useInit