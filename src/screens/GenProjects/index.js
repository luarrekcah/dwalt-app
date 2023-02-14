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
import {Button, FAB} from 'react-native-paper';
import Colors from '../../globalStyles/colors';
import Loading from '../../globalComponents/Loading';
import {deleteItem, getAllItems} from '../../services/Database';

const GenProjects = ({navigation}) => {
  const [db, setDb] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalProject, setModalProject] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const setData = () => {
    getAllItems({path: 'dlwalt/projects'}).then(data => {
      console.log(data);
      setDb(data);
      setLoaded(true);
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
    setData();
  }, [navigation]);

  const onDelete = id => {
    setModalVisible(true);
    setLoaded(false);
    deleteItem({path: `dlwalt/projects/${id}`});
    setData();
    setModalVisible(false);
    setLoaded(true);
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
                    {modalProject === null ? '' : modalProject.data.title}
                  </Text>
                  <Text style={{color: '#000000', margin: 20, fontSize: 15}}>
                    Deseja deletar o projeto?
                  </Text>
                  <Button
                    style={styles.deletButton}
                    icon="delete"
                    mode="contained"
                    onPress={() => onDelete(modalProject.key)}>
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
                    uri: item.data.media[0],
                  }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  imageStyle={{opacity: 0.5}}
                  resizeMode="cover">
                  <View style={styles.card}>
                    <Text style={styles.textPri}>{item.data.title}</Text>
                    <Text style={styles.textSec}>{item.data.coords}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
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
    flex: 1,
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
