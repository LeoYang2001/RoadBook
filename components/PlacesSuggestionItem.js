import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const PlacesSuggestionItem = ({ prediction, handleCompleteAddingNewPlace }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleCompleteAddingNewPlace(prediction);
      }}
      className="flex flex-row items-center "
      style={{ height: 64, borderBottomWidth: 1, borderColor: '#E4E8EF' }}>
      <Image className="mx-3" style={{ width: 16, height: 16 }} source={require('../assets/pin.png')} />
      <View className="flex-col flex-1 justify-between">
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{ color: "#38404D" }}>{prediction.main_text}</Text>
       {
        prediction.detailed_name  && (
          <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{ color: '#7C8697', fontSize: 12, marginTop: 4 }}>{prediction.detailed_name}</Text>
        )
       }
      </View>
    </TouchableOpacity>
  );
}

export default PlacesSuggestionItem;
