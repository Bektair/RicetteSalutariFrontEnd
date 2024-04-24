import { View, Text, FlatList, Image, Alert, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../../constants';
import { EmptyState, SearchInput, Trending, VideoCard } from '../../components';
import api from '../../Context/api';
import useAPI from '../../UseAPI/useAPI';

const Home = () => {

  const { data: posts, refetch } = useAPI({route: "/api/video/"})



  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    console.log("refreshed!")
    setRefreshing(true)
    await refetch();
    setRefreshing(false)

  }


  return (
    <SafeAreaView className="bg-primary h-full">
     
      <FlatList
        data={posts} //{ id: 1}, { id: 2}, { id: 3}
        keyExtractor={(item) => {item.id}}
        renderItem={({item}) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator}
            avatar={item.thumbnail}

          />
        )}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-pmediu<m text-sm text-gray-100">
                  JSMastery
                </Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'>
                </Image>
              </View>
            </View>
            <SearchInput></SearchInput>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>
              <Trending posts={posts ?? [] }/>
            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />


    </SafeAreaView>

  )
}

export default Home