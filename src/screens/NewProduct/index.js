import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {List, TextInput} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {Picker} from '@react-native-picker/picker';
//https://github.com/ivpusic/react-native-image-crop-picker

const NewProduct = ({navigation}) => {
  let [code, setcode] = React.useState('');
  let [composition, setcomposition] = React.useState('');
  let [title, settitle] = React.useState('');
  let [resumedtitle, setresumedtitle] = React.useState('');
  let [description, setdescription] = React.useState('');
  let [value, setvalue] = React.useState('');

  const [systemtype, setsystemtype] = React.useState();

  let [brand, setbrand] = React.useState('');
  let [power, setpower] = React.useState('');
  let [quantity, setquantity] = React.useState('');
  let [outputvoltage, setoutputvoltage] = React.useState('');

  const [enviado, setEnviado] = React.useState(false);

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
          postedDate: '',
          title,
          resumedtitle,
          description,
          value,
          mediaSrc: ['aa'],
          datasheet: {
            systemType: 'ongrid',
            inverter: {
              brand: 'Growatt',
              power: '2',
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
            label="Composição"
            value={composition}
            onChangeText={newText => setcomposition(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Título"
            value={title}
            onChangeText={newText => settitle(newText)}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Gerador XXXkW"
            label="Título Resumo"
            value={resumedtitle}
            onChangeText={newText => setresumedtitle(newText)}
          />
        </List.Section>
        <List.Section title="Informações Técnicas">
          <Picker
            selectedValue={systemtype}
            onValueChange={(itemValue, itemIndex) => setsystemtype(itemValue)}>
            <Picker.Item label="Tipo de Sistema: Ongrid" value="Ongrid" />
            <Picker.Item label="Tipo de Sistema: Offgrid" value="Offgrid" />
          </Picker>
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
});

export default NewProduct;
