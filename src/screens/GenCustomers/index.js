import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {List} from 'react-native-paper';
import database from '@react-native-firebase/database';
import Colors from '../../globalStyles/colors';

const GenCustomers = ({navigation}) => {
  const [db, setDb] = React.useState({});

  useEffect(() => {
    database()
      .ref('/clientes')
      .once('value')
      .then(snapshot => {
        setDb(snapshot.val());
      });
    console.log('clientes call');
  }, []);

  return (
    <View>
      <FlatList
        data={db}
        renderItem={({item}) => (
          <List.Item
            title={item.nome}
            description={item.profissao}
            left={() => (
              <List.Icon color={Colors.color.primary} icon="account" />
            )}
            onPress={() => {
              navigation.navigate('editCustomer', {item});
            }}
          />
        )}
      />
    </View>
  );
};

export default GenCustomers;
