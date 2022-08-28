import React, {useEffect} from 'react';
import {
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {List, TextInput, Button} from 'react-native-paper';
import database from '@react-native-firebase/database';
import Colors from '../../globalStyles/colors';
import ImagePicker from 'react-native-image-crop-picker';
import Loading from '../../globalComponents/Loading';

const InfosSite = () => {
  const [db, setDb] = React.useState({});
  const [email, setemail] = React.useState('');
  const [facebook, setfacebook] = React.useState('');
  const [instagram, setinstagram] = React.useState('');
  const [telefoneum, settelefoneum] = React.useState('');
  const [telefonedois, settelefonedois] = React.useState('');
  const [whatsapp, setwhatsapp] = React.useState('');
  const [atualizado, setAtualizado] = React.useState(false);
  const [bannerPromo, setBannerPromo] = React.useState('');

  const [loaded, setLoaded] = React.useState(false);

  const pickImages = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      width: 1920,
      height: 88,
      multiple: false,
    }).then(image => {
      setBannerPromo('data:image/png;base64,' + image.data);
    });
  };

  useEffect(() => {
    database()
      .ref('/dataWebSite')
      .once('value')
      .then(snapshot => {
        setDb(snapshot.val());
      });
  }, []);

  const enviarDados = () => {
    database()
      .ref('/dataWebSite/infos')
      .update({
        email,
        facebook,
        instagram,
        telefone: telefoneum,
        telefoneTwo: telefonedois,
        whatsapp,
        bannerPromo,
      })
      .then(() => setAtualizado(true));
  };

  useEffect(() => {
    if (db.infos) {
      setemail(db.infos.email);
      setfacebook(db.infos.facebook);
      setinstagram(db.infos.instagram);
      settelefoneum(db.infos.telefone);
      settelefonedois(db.infos.telefoneTwo);
      setwhatsapp(db.infos.whatsapp);
      setBannerPromo(db.infos.bannerPromo || '');

      setLoaded(true);
    }
  }, [db]);

  return (
    <View style={styles.container}>
      {loaded === false ? (
        <Loading />
      ) : (
        <ScrollView>
          <List.Subheader>Banner Promocional (Imagem cortada)</List.Subheader>
          <TouchableOpacity
            onPress={() => {
              pickImages();
            }}>
            <Image
              style={styles.bannerPromo}
              source={{
                uri:
                  bannerPromo ||
                  'https://www.aldo.com.br/AldoMarketing/Content/img/campanha/624/aldo40/topbannerheaderhome100-dias-de-muita-energia---deye-e-aldo-solar_1920x88_220729142928508.jpg?version=2022-08-28',
              }}
            />
          </TouchableOpacity>
          <List.Subheader>Banners Iniciais</List.Subheader>
          <FlatList
            horizontal={true}
            data={db.headerAnim}
            renderItem={({item}) => (
              <TouchableOpacity>
                <ImageBackground
                  style={styles.imageHeader}
                  source={{
                    uri: item.backgroundImg,
                  }}
                  resizeMode="cover">
                  <View style={styles.cardHeader}>
                    <Text style={styles.textHeaderSec}>{item.subtitle}</Text>
                    <Text style={styles.textHeaderPri}>{item.title}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
          <List.Subheader>Informações Gerais</List.Subheader>
          <TextInput
            style={styles.inputs}
            label="E-mail"
            value={email}
            onChangeText={newText => setemail(newText)}
          />
          <TextInput
            style={styles.inputs}
            label="Facebook"
            value={facebook}
            onChangeText={newText => setfacebook(newText)}
          />
          <TextInput
            style={styles.inputs}
            label="Instagram"
            value={instagram}
            onChangeText={newText => setinstagram(newText)}
          />
          <TextInput
            style={styles.inputs}
            label="Telefone Primário"
            value={telefoneum}
            onChangeText={newText => settelefoneum(newText)}
          />
          <TextInput
            style={styles.inputs}
            label="Telefone Secundário"
            value={telefonedois}
            onChangeText={newText => settelefonedois(newText)}
          />
          <TextInput
            style={styles.inputs}
            label="WhatsApp"
            value={whatsapp}
            onChangeText={newText => setwhatsapp(newText)}
          />
          {atualizado === false ? (
            <Button
              style={styles.button}
              icon="send"
              mode="contained"
              onPress={() => enviarDados()}>
              Atualizar
            </Button>
          ) : (
            <Button style={styles.sucessButton} icon="check" mode="contained">
              Atualizado
            </Button>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {},
  bannerPromo: {
    height: 88,
    width: Dimensions.get('window').width,
    //resizeMode: 'stretch',
  },
  imageHeader: {
    margin: 10,
    borderRadius: 30,
  },
  cardHeader: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 30,
  },
  textHeaderSec: {
    color: 'white',
    textTransform: 'uppercase',
  },
  textHeaderPri: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  inputs: {
    margin: 10,
  },
  button: {
    margin: 20,
    backgroundColor: Colors.color.primary,
  },
  sucessButton: {
    backgroundColor: 'green',
    margin: 20,
  },
});

export default InfosSite;
