import React from 'react';
import {View, ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import {List, TextInput, Button} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../../globalStyles/colors';
import {Picker} from '@react-native-picker/picker';
import AlertModal from '../../globalComponents/AlertModal';
import {setItem} from '../../services/Database';
import unidecode from 'unidecode';

const NewProject = ({navigation}) => {
  let [title, settitle] = React.useState('');
  let [desc, setdesc] = React.useState('');
  let [customer, setcustomer] = React.useState('');
  let [coords, setcoords] = React.useState('');
  let [obrainit, setobrainit] = React.useState('');
  let [obrafim, setobrafim] = React.useState('');
  let [type, settype] = React.useState('residencial');
  let [media, setmedia] = React.useState([]);
  const [enviado, setEnviado] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  function id(str) {
    // Converte a string para minúsculas, remove acentuação e espaços em branco
    str = unidecode(str).toLowerCase().replace(/\s+/g, '-');

    // Remove todos os caracteres não alfanuméricos
    str = str.replace(/[^a-z0-9]+/g, '-');

    return str;
  }

  const pickImages = () => {
    if (title === '') {
      return ToastAndroid.show(
        'Dê um nome primeiro ao projeto!',
        ToastAndroid.SHORT,
      );
    }
    ImagePicker.openPicker({
      includeBase64: true,
      width: 800,
      height: 800,
      mediaType: 'photo',
      cropping: true,
    }).then(async images => {
      let base64Imgs = media;
      setModalData({
        title: 'Enviando sua imagem',
        description: 'Aguarde...',
        icon: 'warning',
        loading: true,
      });
      setModal(true);
      const path = `dlwalt/projects/${id(
        title,
      )}/photos/${new Date().getTime()}-${base64Imgs.length}-${id(title)}.jpg`;
      const reference = storage().ref(path);
      const dataUrl = `data:image/png;base64,${images.data}`;
      await reference.putString(dataUrl, 'data_url');
      const url = await reference.getDownloadURL();
      base64Imgs.push(url);
      setmedia(base64Imgs);
      setModal(false);
    });
  };

  const enviarDados = () => {
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
      setItem({
        path: `dlwalt/projects/${id(title)}`,
        params: {
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
        },
      });
      setEnviado(true);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
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
