import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {List, TextInput, Button} from 'react-native-paper';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-crop-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Project = ({navigation}) => {
  let [id, setid] = React.useState('');
  let [title, settitle] = React.useState('');
  let [desc, setdesc] = React.useState('');
  let [customer, setcustomer] = React.useState('');
  let [coords, setcoords] = React.useState('');

  let [media, setmedia] = React.useState([]);

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
    database()
      .ref('/dataWebSite/projects')
      .once('value')
      .then(snapshot => {
        if (snapshot.val() !== null) {
          projects = snapshot.val();
        }
        projects.push({
          id,
          title,
          desc,
          customer,
          coords,
          date: {
            initial: '',
            end: '',
          },
          type,
          media,
        });

        database()
          .ref('/dataWebSite/projects')
          .set(projects)
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
            label="Título do Projeto"
            value={title}
            onChangeText={newText => settitle(newText)}
          />
        </List.Section>
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
});

export default Project;
