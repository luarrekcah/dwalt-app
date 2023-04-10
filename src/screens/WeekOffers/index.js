/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const WeekOffers = () => {
  const [data, setData] = useState([
    {id: '1', title: 'Produto 1'},
    {id: '2', title: 'Produto 2'},
    {id: '3', title: 'Produto 3'},
    {id: '4', title: 'Produto 4'},
  ]);

  const updateDataPosition = dataList => {
    setData(dataList);
  };

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        data={data}
        keyExtractor={item => item.id}
        onDragEnd={({data: dataList}) => updateDataPosition(dataList)}
        renderItem={({item, drag, isActive}) => {
          return (
            <ScaleDecorator>
              <TouchableOpacity onLongPress={drag} disabled={isActive}>
                <View>
                  <Text style={{fontSize: 24, color: '#000000'}}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </ScaleDecorator>
          );
        }}
      />
    </GestureHandlerRootView>
  );
};

export default WeekOffers;
