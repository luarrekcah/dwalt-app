import React, {useEffect} from 'react';
import {
  View,
  RefreshControl,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import Colors from '../../../../globalStyles/colors';
import database from '@react-native-firebase/database';
import moment from 'moment';
moment.locale('pt-br');

const Products = ({navigation}) => {
  const [db, setDb] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    database()
      .ref('/dataWebSite/products')
      .once('value')
      .then(snapshot => {
        setDb(snapshot.val());
      });
    console.log('products call');
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    database()
      .ref('/dataWebSite/products')
      .once('value')
      .then(snapshot => {
        setDb(snapshot.val());
      });
    console.log('products call');
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={db}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri: item.media[0],
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
    marginVertical: 10,
    marginHorizontal: 20,
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
    color: Colors.color.fulldark,
  },
  value: {
    color: 'red',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  time: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: Colors.color.fulldark,
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
