import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {List, TextInput, Button} from 'react-native-paper';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../../globalStyles/colors';
import {Picker} from '@react-native-picker/picker';
import AlertModal from '../../globalComponents/AlertModal';

const NewProject = ({navigation}) => {
  let [title, settitle] = React.useState('');
  let [desc, setdesc] = React.useState('');
  let [customer, setcustomer] = React.useState('');
  let [coords, setcoords] = React.useState('');
  let [obrainit, setobrainit] = React.useState('');
  let [obrafim, setobrafim] = React.useState('');
  let [type, settype] = React.useState();
  let [media, setmedia] = React.useState([]);
  const [enviado, setEnviado] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const pickImages = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      width: 400,
      height: 400,
      multiple: true,
    }).then(images => {
      let base64Imgs = [];
      images.forEach((item, i) => {
        base64Imgs.push('data:image/png;base64,' + item.data);
      });
      setmedia(base64Imgs);
    });
  };

  const enviarDados = () => {
    let projects = [];
    if (title === '' || media.length === 0 || coords === '') {
      setModalData({
        title: 'Alguns campos obrigatórios estão faltando!',
        icon: 'warning',
        description: 'Lembre-se de prover todas as informações',
        loading: false,
      });
      setModal(true);
      return;
    } else {
      setModalData({
        title: 'Enviando seu projeto...',
        description: 'Estamos atualizando o banco de dados',
        icon: 'warning',
        loading: true,
      });
      setModal(true);
      database()
        .ref('/dataWebSite/projects')
        .once('value')
        .then(snapshot => {
          if (snapshot.val() !== null) {
            projects = snapshot.val();
          }
          projects.push({
            id: title,
            title,
            desc,
            customer,
            coords,
            date: {
              initial: obrainit,
              end: obrafim,
            },
            type,
            media,
          });

          database()
            .ref('/dataWebSite/projects')
            .set(projects)
            .then(() => {
              setModalData({
                title: 'Projeto Enviado!',
                description: 'Você será redirecionado em instantes...',
                icon: 'checkmark-circle',
                loading: false,
              });
              setEnviado(true);
              setTimeout(() => {
                navigation.goBack();
              }, 5000);
            });
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section title="Dados Básicos">
          <TextInput
            style={styles.textinput}
            label="Título do Projeto"
            placeholder="Residência de Fulano"
            value={title}
            onChangeText={newText => settitle(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Descrição do Projeto"
            value={desc}
            onChangeText={newText => setdesc(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Identificação do Cliente"
            placeholder="José"
            value={customer}
            onChangeText={newText => setcustomer(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Coordenadas da Instalação"
            placeholder="-10.33562, -67.184761662"
            value={coords}
            onChangeText={newText => setcoords(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Início das Obras"
            placeholder="DD/MM/AAAA"
            value={obrainit}
            onChangeText={newText => setobrainit(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Fim/Previsão das Obras"
            placeholder="DD/MM/AAAA"
            value={obrafim}
            onChangeText={newText => setobrafim(newText)}
          />
          <Picker
            style={styles.picker}
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => settype(itemValue)}>
            <Picker.Item label="Tipo: Residencial" value="residencial" />
            <Picker.Item label="Tipo: Comercial" value="comercial" />
            <Picker.Item label="Tipo: Usina" value="usina" />
          </Picker>
          {media.length !== 0 ? (
            <Button
              style={styles.sucessButton}
              icon="camera"
              mode="contained"
              onPress={() => pickImages()}>
              ({media.length}) Fotos Adicionadas
            </Button>
          ) : (
            <Button
              style={styles.button}
              icon="camera"
              mode="contained"
              onPress={() => pickImages()}>
              Adicionar Fotos
            </Button>
          )}
          {enviado === false ? (
            <Button
              style={styles.button}
              icon="send"
              mode="contained"
              onPress={() => enviarDados()}>
              Enviar
            </Button>
          ) : (
            <Button style={styles.sucessButton} icon="check" mode="contained">
              Enviado
            </Button>
          )}
        </List.Section>
        <AlertModal
          visible={modal}
          data={modalData}
          onClose={() => {
            setModal(false);
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    margin: 20,
  },
  textinput: {
    margin: 10,
  },
  button: {
    width: '100%',
    margin: 10,
    backgroundColor: Colors.color.primary,
  },
  sucessButton: {
    backgroundColor: 'green',
    width: '100%',
    margin: 10,
  },
  picker: {
    color: Colors.color.fulldark,
  },
});

export default NewProject;
