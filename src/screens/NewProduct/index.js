import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {List, TextInput, Button} from 'react-native-paper';
import Colors from '../../globalStyles/colors';
import moment from 'moment';
import {getItems, setItem} from '../../services/Database';
import AlertModal from '../../globalComponents/AlertModal';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

moment.locale('pt-br');

const NewProduct = ({navigation}) => {
  let [code, setcode] = React.useState('');
  let [title, settitle] = React.useState('');
  let [description, setdescription] = React.useState('');
  let [value, setvalue] = React.useState('');
  let [valueInstallment, setValueInstallment] = React.useState('');

  const [modal, setModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  let [banner, setBanner] = React.useState(
    'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png',
  );

  const [sended, setSended] = React.useState(false);

  const pickImages = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      width: 800,
      height: 800,
      mediaType: 'photo',
      cropping: true,
    }).then(async images => {
      setModalData({
        title: 'Enviando sua imagem',
        description: 'Aguarde...',
        icon: 'warning',
        loading: true,
      });
      setModal(true);
      const path = `dlwalt/offers/photos/${new Date().getTime()}.jpg`;
      const reference = storage().ref(path);
      const dataUrl = `data:image/png;base64,${images.data}`;
      try {
        await reference.putString(dataUrl, 'data_url');
      } catch (error) {
        console.log(error);
        setModalData({
          title: 'Ocorreu um erro com o envio.',
          description: error.error.message,
          icon: 'warning',
          loading: false,
        });
      }
      const url = await reference.getDownloadURL();
      setBanner(url);
      setModal(false);
    });
  };

  const addData = async () => {
    if (title === '') {
      return;
    }
    const offers = await getItems({path: 'dlwalt/offers'});
    offers.push({
      code,
      banner,
      title,
      description,
      value,
      valueInstallment,
    });
    setItem({
      path: 'dlwalt/offers',
      params: offers,
    });
    setSended(true);
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section title="Dados Básicos">
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              margin: 50,
            }}>
            <TouchableOpacity
              onPress={() => {
                pickImages();
              }}>
              <View>
                <Image
                  style={styles.banner}
                  source={{
                    uri: banner,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textinput}
            label="Código"
            value={code}
            onChangeText={newText => setcode(newText)}
          />
          <TextInput
            multiline
            style={styles.textinput}
            label="Título"
            value={title}
            onChangeText={newText => settitle(newText)}
          />
          <TextInput
            style={styles.textinput}
            placeholder="GF ..."
            label="Descrição"
            value={description}
            onChangeText={newText => setdescription(newText)}
          />
          <TextInput
            style={styles.textinput}
            placeholder="XX.XXX,XX"
            label="Valor total do Sistema"
            value={value}
            onChangeText={newText => setvalue(newText)}
          />
          <TextInput
            style={styles.textinput}
            placeholder="XX.XXX,XX"
            label="Valor em 84x"
            value={value}
            onChangeText={newText => setValueInstallment(newText)}
          />
        </List.Section>
        {sended === false ? (
          <Button
            style={styles.button}
            icon="send"
            mode="contained"
            onPress={() => addData()}>
            Enviar
          </Button>
        ) : (
          <Button style={styles.sucessButton} icon="check" mode="contained">
            Enviado
          </Button>
        )}
      </ScrollView>
      <AlertModal
        visible={modal}
        data={modalData}
        onClose={() => {
          setModal(false);
        }}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {},
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
  banner: {
    width: 200,
    height: 200,
  },
});

export default NewProduct;
