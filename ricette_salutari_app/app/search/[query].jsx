import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAPI from '../../UseAPI/useAPI';
import { VideoCard } from '../../components';

const Search = () => {

  const { query } = useLocalSearchParams();
  
  const { data: posts, refetch } = useAPI({route: "/api/video/?search=" + query})

  console.log(posts)

  return ( 
    <SafeAreaView className= "bg-primary h-full">
      <View>
        <Text className="text-3xl text-white">Q: {query} Returned:</Text>
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
        )}>

        </FlatList>
      </View>
    </SafeAreaView>
  )
}

export default Search