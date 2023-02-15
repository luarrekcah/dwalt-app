import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button, FAB} from 'react-native-paper';
import AlertModal from '../../globalComponents/AlertModal';
import Colors from '../../globalStyles/colors';
import {createItem, deleteItem, getAllItems} from '../../services/Database';
import Icon from 'react-native-vector-icons/Ionicons';

const Faq = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [data, setData] = React.useState([]);

  const [question, setquestion] = React.useState('');

  const [answer, setanswer] = React.useState('');

  const [modal, setModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const loadData = () => {
    setquestion('');
    setanswer('');
    getAllItems({path: 'dlwalt/faq'}).then(r => {
      console.log(r);
      setData(r);
    });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const deleteQuestion = key => {
    setModalVisible(false);
    setModalData({
      title: 'Deletando...',
      description: 'Aguarde...',
      icon: 'warning',
      loading: true,
    });
    deleteItem({path: `dlwalt/faq/${key}`});
    loadData();
    setModal(false);
  };

  const adicionar = () => {
    setModalVisible(false);
    setModalData({
      title: 'Adicionando pergunta',
      description: 'Aguarde...',
      icon: 'warning',
      loading: true,
    });
    setModal(true);
    createItem({
      path: 'dlwalt/faq',
      params: {
        question,
        answer,
      },
    });
    loadData();
    setModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        {data.length === 0 ? (
          <Text
            style={{
              color: '#000000',
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Crie uma nova pergunta!
          </Text>
        ) : (
          <FlatList
            data={data}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#bdbcbb',
                    marginVertical: 20,
                  }}
                />
              );
            }}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                <View style={{maxWidth: '80%'}}>
                  <Text style={styles.question}>{item.data.question}</Text>
                  <Text style={styles.answer}>{item.data.answer}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FF0000',
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      deleteQuestion(item.key);
                    }}>
                    <Text>
                      <Icon name={'trash'} size={20} color={'#fff'} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />
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
              <Text
                style={{color: '#000000', fontSize: 20, fontWeight: 'bold'}}>
                Adicionar pergunta ao FAQ
              </Text>
              <TextInput
                style={styles.textinput}
                placeholder="Pergunta"
                value={question}
                placeholderTextColor="#000000"
                onChangeText={newText => setquestion(newText)}
              />
              <TextInput
                style={styles.textinput}
                placeholder="Resposta"
                value={answer}
                placeholderTextColor="#000000"
                onChangeText={newText => setanswer(newText)}
              />
              <Button
                style={styles.button}
                icon="send"
                mode="contained"
                onPress={() => adicionar()}>
                Adicionar
              </Button>
            </View>
          </View>
        </Modal>
        <AlertModal
          visible={modal}
          data={modalData}
          onClose={() => {
            setModal(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 14,
    color: '#000000',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.color.primary,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    width: '90%',
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
export default Faq;
