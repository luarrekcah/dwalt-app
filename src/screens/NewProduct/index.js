import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {List, TextInput, Button} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {Picker} from '@react-native-picker/picker';
import Colors from '../../globalStyles/colors';
import moment from 'moment';
moment.locale('pt-br');
import ImagePicker from 'react-native-image-crop-picker';

const NewProduct = ({navigation}) => {
  let [code, setcode] = React.useState('');
  let [composition, setcomposition] = React.useState('');
  let [title, settitle] = React.useState('');
  let [description, setdescription] = React.useState('');
  let [resumedtitle, setresumedtitle] = React.useState('');
  let [value, setvalue] = React.useState('');

  const [systemtype, setsystemtype] = React.useState();
  const [invertype, setinvertype] = React.useState();

  let [inverpower, setinverpower] = React.useState('');

  let [brand, setbrand] = React.useState();
  let [power, setpower] = React.useState('');
  let [quantity, setquantity] = React.useState('');
  let [outputvoltage, setoutputvoltage] = React.useState();

  let [media, setmedia] = React.useState([]);

  const [enviado, setEnviado] = React.useState(false);

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

  const enviarDados = async () => {
    let products = [];

    database()
      .ref('/dataWebSite/products')
      .once('value')
      .then(snapshot => {
        if (snapshot.val() !== null) {
          products = snapshot.val();
        }
        products.push({
          code,
          composition,
          postedDate: moment().format(),
          title,
          resumedtitle,
          description,
          value,
          media,
          datasheet: {
            systemType: systemtype,
            inverter: {
              brand: invertype,
              power: inverpower,
            },
            modules: {
              brand: brand,
              power: power,
              quantity: quantity,
            },
            outputVoltage: outputvoltage,
          },
          paymentIdentifier: {
            stripe: 'AAA',
          },
        });

        database()
          .ref('/dataWebSite/products')
          .set(products)
          .then(() => {
            setEnviado(true);
            navigation.goBack();
          });
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section title="Dados B??sicos">
          <TextInput
            style={styles.textinput}
            label="C??digo"
            value={code}
            onChangeText={newText => setcode(newText)}
          />
          <TextInput
            multiline
            style={styles.textinput}
            label="T??tulo"
            value={title}
            onChangeText={newText => settitle(newText)}
          />
          <TextInput
            style={styles.textinput}
            placeholder="GF ..."
            label="Descri????o"
            value={description}
            onChangeText={newText => setdescription(newText)}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Kit Gerador XXXkW"
            label="T??tulo Resumo"
            value={resumedtitle}
            onChangeText={newText => setresumedtitle(newText)}
          />
          <TextInput
            multiline
            style={styles.textinput}
            label="Composi????o"
            value={composition}
            onChangeText={newText => setcomposition(newText)}
          />
          <TextInput
            style={styles.textinput}
            placeholder="XX.XXX,XX"
            label="Valor total do Sistema"
            value={value}
            onChangeText={newText => setvalue(newText)}
          />
        </List.Section>
        <List.Section title="Informa????es T??cnicas">
          <Picker
            style={styles.picker}
            selectedValue={systemtype}
            onValueChange={(itemValue, itemIndex) => setsystemtype(itemValue)}>
            <Picker.Item label="Tipo de Sistema: Ongrid" value="Ongrid" />
            <Picker.Item label="Tipo de Sistema: Offgrid" value="Offgrid" />
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={invertype}
            onValueChange={(itemValue, itemIndex) => setinvertype(itemValue)}>
            <Picker.Item label="Inversor: Growatt" value="Growatt" />
            <Picker.Item label="Inversor: Fronius" value="Fronius" />
            <Picker.Item label="Inversor: Outro" value="Outro" />
          </Picker>
          <TextInput
            style={styles.textinput}
            placeholder="x,x"
            label="Pot??ncia do Inversor (Em kW)"
            value={inverpower}
            onChangeText={newText => setinverpower(newText)}
          />
          <Picker
            style={styles.picker}
            selectedValue={brand}
            onValueChange={(itemValue, itemIndex) => setbrand(itemValue)}>
            <Picker.Item label="M??dulo Solar: Jinko" value="Jinko" />
            <Picker.Item label="M??dulo Solar: PhonoSolar" value="PhonoSolar" />
            <Picker.Item label="M??dulo Solar: JAsolar" value="JAsolar" />
            <Picker.Item label="M??dulo Solar: Outro" value="Outro" />
          </Picker>
          <TextInput
            style={styles.textinput}
            placeholder="xxx"
            label="Pot??ncia dos M??dulos (Em Watts)"
            value={power}
            onChangeText={newText => setpower(newText)}
          />
          <TextInput
            style={styles.textinput}
            placeholder="xxx"
            label="Quantidade de M??dulos"
            value={quantity}
            onChangeText={newText => setquantity(newText)}
          />
          <Picker
            style={styles.picker}
            selectedValue={outputvoltage}
            onValueChange={(itemValue, itemIndex) =>
              setoutputvoltage(itemValue)
            }>
            <Picker.Item label="Tens??o de Sa??da: 220v" value="220" />
            <Picker.Item label="Tens??o de Sa??da: 380v" value="380" />
            <Picker.Item label="Tens??o de Sa??da: Outro" value="Outro" />
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
      </ScrollView>
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
});

export default NewProduct;
