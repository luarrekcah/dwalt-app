import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import database from '@react-native-firebase/database';
import {Button, FAB} from 'react-native-paper';
import Colors from '../../globalStyles/colors';
import Loading from '../../globalComponents/Loading';

const GenProjects = ({navigation}) => {
  const [db, setDb] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalProject, setModalProject] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const setData = () => {
    database()
      .ref('/dataWebSite/projects')
      .once('value')
      .then(snapshot => {
        setDb(snapshot.val());
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoaded(false);
    setData();
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

  const onDelete = id => {
    const newProjects = db.filter(item => {
      if (item.id === id) {
        return;
      }
      return item;
    });
    setModalVisible(false);
    setLoaded(false);
    database()
      .ref('/dataWebSite/projects')
      .set(newProjects)
      .then(() => {
        setDb(newProjects);
        setLoaded(true);
      });
  };

  return (
    <View style={styles.container}>
      {loaded === false ? (
        <Loading />
      ) : (
        <View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.textPri, {color: '#000000'}]}>
                    {modalProject === null ? '' : modalProject.title}
                  </Text>
                  <Button
                    style={styles.deletButton}
                    icon="delete"
                    mode="contained"
                    onPress={() => onDelete(modalProject.id)}>
                    Deletar Projeto
                  </Button>
                </View>
              </View>
            </Modal>
          </View>
          <FlatList
            data={db}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => (
              <TouchableOpacity
                onLongPress={() => {
                  setModalProject(item);
                  setModalVisible(true);
                }}>
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
        </View>
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
  deletButton: {
    backgroundColor: 'red',
    width: '100%',
    margin: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default GenProjects;
