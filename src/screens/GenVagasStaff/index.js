import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet, Modal, Text, TextInput, Alert} from 'react-native';
import {Button, FAB, List} from 'react-native-paper';

import Colors from '../../globalStyles/colors';
import {createItem, deleteItem, getAllItems} from '../../services/Database';

const GenVagasStaff = ({navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [db, setDb] = React.useState([]);

  const [title, setTitle] = React.useState('');
  const [loc, setLoc] = React.useState('');
  const [type, setType] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [resp, setResp] = React.useState('');
  const [req, setReq] = React.useState('');

  const loadData = () => {
    getAllItems({path: 'dlwalt/vacancies'}).then(r => {
      setDb(r);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const newVacancie = () => {
    setModalVisible(false);
    createItem({
      path: 'dlwalt/vacancies',
      params: {
        title,
        loc,
        type,
        desc,
        resp,
        req,
      },
    });
    loadData();
  };

  const deleteVacancie = key => {
    deleteItem({path: `dlwalt/vacancies/${key}`});
    loadData();
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={db}
          renderItem={({item}) => (
            <List.Item
              title={item.data.title}
              description={item.data.desc}
              left={() => (
                <List.Icon color={Colors.color.primary} icon="tools" />
              )}
              onPress={() => {
                Alert.alert(
                  'O que você deseja?',
                  '',
                  [
                    {
                      text: 'Cancelar',
                      style: 'default',
                    },
                    {
                      text: 'Deletar',
                      style: 'default',
                      onPress: () => {
                        deleteVacancie(item.key);
                      }
                    },
                  ],
                  {
                    cancelable: true,
                    onDismiss: () =>
                      Alert.alert(
                        'This alert was dismissed by tapping outside of the alert dialog.',
                      ),
                  },
                )
              }}
            />
          )}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textinput}
              placeholder="Título da vaga"
              value={title}
              placeholderTextColor="#000000"
              onChangeText={newText => setTitle(newText)}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Localização"
              value={loc}
              placeholderTextColor="#000000"
              onChangeText={newText => setLoc(newText)}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Tipo de trabalho (remoto/efetivo)"
              value={type}
              placeholderTextColor="#000000"
              onChangeText={newText => setType(newText)}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Descrição da vaga"
              value={desc}
              placeholderTextColor="#000000"
              onChangeText={newText => setDesc(newText)}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Responsabilidade e atribuição"
              multiline={true}
              value={resp}
              placeholderTextColor="#000000"
              onChangeText={newText => setResp(newText)}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Requisitos"
              multiline={true}
              value={req}
              placeholderTextColor="#000000"
              onChangeText={newText => setReq(newText)}
            />
            <Button
              style={styles.button}
              icon="send"
              mode="contained"
              onPress={() => newVacancie()}>
              Criar vaga
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.color.primary,
    flex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textinput: {
    margin: 10,
    color: '#000000',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    margin: 10,
    backgroundColor: Colors.color.primary,
  },
});

export default GenVagasStaff;
