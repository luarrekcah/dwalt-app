import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import database from '@react-native-firebase/database';
import {FAB} from 'react-native-paper';
import Colors from '../../globalStyles/colors';
import Loading from '../../globalComponents/Loading';

const GenProjects = ({navigation}) => {
  const [db, setDb] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  const [loaded, setLoaded] = React.useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoaded(false);
    database()
      .ref('/dataWebSite/projects')
      .once('value')
      .then(snapshot => {
        setDb(snapshot.val());
      });
    console.log('projetos call');
    wait(2000).then(() => {
      setRefreshing(false);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    database()
      .ref('/dataWebSite/projects')
      .once('value')
      .then(snapshot => {
        setDb(snapshot.val());
        setLoaded(true);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loaded === false ? (
        <Loading />
      ) : (
        <>
          <FlatList
            data={db}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => (
              <TouchableOpacity>
                <ImageBackground
                  style={styles.backImage}
                  source={{
                    uri: item.media[0],
                  }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  imageStyle={{opacity: 0.5}}
                  resizeMode="cover">
                  <View style={styles.card}>
                    <Text style={styles.textPri}>{item.title}</Text>
                    <Text style={styles.textSec}>{item.coords}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate('NewProject')}
          />
        </>
      )}
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  backImage: {
    margin: 10,
    backgroundColor: Colors.color.fulldark,
  },
  card: {
    alignItems: 'center',
    padding: 40,
  },
  textPri: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },
  textSec: {},
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.color.primary,
  },
});

export default GenProjects;
