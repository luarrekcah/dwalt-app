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
        base64Imgs.push(item.data);
      });
      setmedia(base64Imgs);
    });
  };

  const enviarDados = () => {
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
          value,
          mediaSrc: media,
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
            stripe: 'AAAA',
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
        <List.Section title="Dados Básicos">
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
            placeholder="Kit Gerador XXXkW"
            label="Título Resumo"
            value={resumedtitle}
            onChangeText={newText => setresumedtitle(newText)}
          />
          <TextInput
            multiline
            style={styles.textinput}
            label="Composição"
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
        <List.Section title="Informações Técnicas">
          <Picker
            selectedValue={systemtype}
            onValueChange={(itemValue, itemIndex) => setsystemtype(itemValue)}>
            <Picker.Item label="Tipo de Sistema: Ongrid" value="Ongrid" />
            <Picker.Item label="Tipo de Sistema: Offgrid" value="Offgrid" />
          </Picker>
          <Picker
            selectedValue={invertype}
            onValueChange={(itemValue, itemIndex) => setinvertype(itemValue)}>
            <Picker.Item label="Inversor: Growatt" value="Growatt" />
            <Picker.Item label="Inversor: Fronius" value="Fronius" />
            <Picker.Item label="Inversor: Outro" value="Outro" />
          </Picker>
          <TextInput
            style={styles.textinput}
            placeholder="x,x"
            label="Potência do Inversor (Em kW)"
            value={inverpower}
            onChangeText={newText => setinverpower(newText)}
          />
          <Picker
            selectedValue={brand}
            onValueChange={(itemValue, itemIndex) => setbrand(itemValue)}>
            <Picker.Item label="Módulo Solar: Jinko" value="Jinko" />
            <Picker.Item label="Módulo Solar: PhonoSolar" value="PhonoSolar" />
            <Picker.Item label="Módulo Solar: JAsolar" value="JAsolar" />
            <Picker.Item label="Módulo Solar: Outro" value="Outro" />
          </Picker>
          <TextInput
            style={styles.textinput}
            placeholder="xxx"
            label="Potência dos Módulos (Em Watts)"
            value={power}
            onChangeText={newText => setpower(newText)}
          />
          <TextInput
            style={styles.textinput}
            placeholder="xxx"
            label="Quantidade de Módulos"
            value={quantity}
            onChangeText={newText => setquantity(newText)}
          />
          <Picker
            selectedValue={outputvoltage}
            onValueChange={(itemValue, itemIndex) =>
              setoutputvoltage(itemValue)
            }>
            <Picker.Item label="Tensão de Saída: 220v" value="220" />
            <Picker.Item label="Tensão de Saída: 380v" value="380" />
            <Picker.Item label="Tensão de Saída: Outro" value="Outro" />
          </Picker>
          <Button
            style={styles.button}
            icon="send"
            mode="contained"
            onPress={() => pickImages()}>
            Adicionar Fotos
          </Button>
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
});

export default NewProduct;
