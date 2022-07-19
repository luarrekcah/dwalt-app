import React, {useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, Dimensions} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import Colors from '../../../../globalStyles/colors';
import database from '@react-native-firebase/database';
import moment from 'moment';
moment.locale('pt-br');

const Products = ({navigation}) => {
  const [db, setDb] = React.useState({});

  useEffect(() => {
    database()
      .ref('/dataWebSite/products')
      .once('value')
      .then(snapshot => {
        setDb(snapshot.val());
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={db}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri: 'data:image/png;base64,' + item.mediaSrc[0],
              }}
            />
            <Text style={styles.title}>
              {item.resumedtitle} - ({item.code})
            </Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.value}>R${item.value}</Text>
            <Text style={styles.time}>
              POSTADO HÁ {moment(item.postedDate).fromNow()}
            </Text>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('NewProduct')}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 20,
    padding: 20,
  },
  imgGerador: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#009eef',
    fontWeight: 'bold',
  },
  desc: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'black',
  },
  value: {
    color: 'red',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  time: {
    textTransform: 'uppercase',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.color.primary,
  },
});

export default Products;
