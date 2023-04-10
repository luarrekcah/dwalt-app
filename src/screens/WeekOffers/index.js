/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FAB} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../globalStyles/colors';
import {getItems, setItem} from '../../services/Database';

const WeekOffers = ({navigation}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems({path: 'dlwalt/offers'}).then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const updateDataPosition = dataList => {
    setData(dataList);
    setItem({
      path: 'dlwalt/offers',
      params: dataList,
    });
  };

  const deleteItem = id => {
    const newitems = data.filter(p => p.id !== id);
    setItem({
      path: 'dlwalt/offers',
      params: newitems,
    });
    setData(newitems);
  };

  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <>
      <GestureHandlerRootView style={{marginHorizontal: 10}}>
        <DraggableFlatList
          data={data}
          keyExtractor={item => item.id}
          onDragEnd={({data: dataList}) => updateDataPosition(dataList)}
          renderItem={({item, drag, isActive}) => {
            return (
              <ScaleDecorator>
                <TouchableOpacity onLongPress={drag} disabled={isActive}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#d6d6d6',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      marginVertical: 4,
                      borderRadius: 10,
                    }}>
                    <Text>
                      <Icon
                        name={'drag-horizontal-variant'}
                        size={25}
                        color={'#666665'}
                      />
                    </Text>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      source={{
                        uri: item.banner,
                      }}
                    />
                    <Text style={{fontSize: 20, color: '#000000'}}>
                      {item.title}
                    </Text>
                    <Text style={{fontSize: 18, color: '#666665'}}>
                      R${item.value}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#e3e3e3',
                    }}>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 20,
                        marginHorizontal: 4,
                        marginVertical: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#325ea8',
                      }}
                      onPress={() => {
                        navigation.navigate('NewProduct', {
                          isEdit: true,
                          data: item,
                        });
                      }}>
                      <Text>
                        <Icon name={'pencil'} size={25} color={'#fff'} />{' '}
                      </Text>
                      <Text style={{color: '#fff'}}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 20,
                        marginHorizontal: 4,
                        marginVertical: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#c72712',
                      }}
                      onPress={() => {
                        deleteItem(item.id);
                      }}>
                      <Text>
                        <Icon name={'trash-can'} size={25} color={'#fff'} />{' '}
                      </Text>
                      <Text style={{color: '#fff'}}>Apagar</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </ScaleDecorator>
            );
          }}
        />
      </GestureHandlerRootView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('NewProduct')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.color.primary,
  },
});

export default WeekOffers;
