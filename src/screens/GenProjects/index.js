import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import database from '@react-native-firebase/database';
import {FAB} from 'react-native-paper';
import Colors from '../../globalStyles/colors';

const GenProjects = ({navigation}) => {
  const [db, setDb] = React.useState({});

  useEffect(() => {
    database()
      .ref('/dataWebSite/projects')
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
          <TouchableOpacity>
            <ImageBackground
              style={styles.backImage}
              source={{
                uri: item.media[0],
              }}
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
