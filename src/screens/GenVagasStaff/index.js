import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {List} from 'react-native-paper';
import database from '@react-native-firebase/database';

import Colors from '../../globalStyles/colors';

const GenVagasStaff = ({navigation}) => {
  const [db, setDb] = React.useState({});

  useEffect(() => {
    database()
      .ref('/dataWebSite/vagas')
      .once('value')
      .then(snapshot => {
        setDb(snapshot.val());
      });
  }, []);

  return (
    <View>
      <FlatList
        data={db}
        renderItem={({item}) => (
          <List.Item
            title={item.titulo}
            description={item.desc}
            left={() => <List.Icon color={Colors.color.primary} icon="tools" />}
            onPress={() => {
              navigation.navigate('editVaga', {item});
            }}
          />
        )}
      />
    </View>
  );
};

export default GenVagasStaff;
