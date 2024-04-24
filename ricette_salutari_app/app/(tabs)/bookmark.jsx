import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images, vidoes} from '../../constants';
import { Image } from 'react-native-animatable';
import { ResizeMode, Video } from 'expo-av';
import useAPI from '../../UseAPI/useAPI';

const Bookmark = () => {

  const video = React.useRef(null);
  const { data: posts, refetch } = useAPI({route: "/api/video/"})

  console.log(posts)

  return (
    <SafeAreaView className="bg-primary">
    <FlatList
      data={posts}
      keyExtractor={(item) => {return item.$id}}
      renderItem={({item}) => (
          
        <FlatList 
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => (
            <Text className="text-gray-100">
              okasdas {item.id}
            </Text>
          )}></FlatList>
      )}

    />
  </SafeAreaView>
  )
}

export default Bookmark


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});