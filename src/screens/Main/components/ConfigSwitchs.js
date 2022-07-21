import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Switch, List, Snackbar} from 'react-native-paper';
import database from '@react-native-firebase/database';

const ConfigSwitchs = () => {
  const [visible, setVisible] = React.useState(false);
  const [isSwitchManuOn, setIsSwitchManuOn] = React.useState(false);
  const [isSwitchCompComOn, setIsSwitchCompComOn] = React.useState(false);
  const [isSwitchSimuBVOn, setIsSwitchSimuBVOn] = React.useState(false);
  const [isSwitchlojaOn, setIsSwitchlojaOn] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  database()
    .ref('/switches')
    .once('value')
    .then(snapshot => {
      console.log(snapshot.val());
      setIsSwitchCompComOn(snapshot.val().compsGeral);
      setIsSwitchManuOn(snapshot.val().modoManutencao);
      setIsSwitchSimuBVOn(snapshot.val().simuladorBV);
      setIsSwitchlojaOn(snapshot.val().loja);
    });

  return (
    <View>
      <List.Section title="Desenvolvedor">
        <View style={styles.switchs}>
          <Text>Modo Manutenção</Text>
          <Switch
            value={isSwitchManuOn}
            onValueChange={() => {
              setIsSwitchManuOn(!isSwitchManuOn);
              onToggleSnackBar();
              database()
                .ref('/switches')
                .update({
                  modoManutencao: !isSwitchManuOn,
                })
                .then(() => console.log('Data set.'));
              console.log('Manutenção : ' + !isSwitchManuOn);
            }}
          />
        </View>
        <View style={styles.switchs}>
          <Text>Componentes Complementares</Text>
          <Switch
            value={isSwitchCompComOn}
            onValueChange={() => {
              setIsSwitchCompComOn(!isSwitchCompComOn);
              onToggleSnackBar();
              database().ref('/switches').update({
                compsGeral: !isSwitchCompComOn,
              });
              console.log('Complementar : ' + !isSwitchCompComOn);
            }}
          />
        </View>
        <View style={styles.switchs}>
          <Text>Loja do Site</Text>
          <Switch
            value={isSwitchlojaOn}
            onValueChange={() => {
              setIsSwitchlojaOn(!isSwitchlojaOn);
              onToggleSnackBar();
              database().ref('/switches').update({
                loja: !isSwitchlojaOn,
              });
              console.log('Loja : ' + !isSwitchlojaOn);
            }}
          />
        </View>
        <View style={styles.switchs}>
          <Text>Simulador BV</Text>
          <Switch
            value={isSwitchSimuBVOn}
            onValueChange={() => {
              setIsSwitchSimuBVOn(!isSwitchSimuBVOn);
              onToggleSnackBar();
              database().ref('/switches').update({
                simuladorBV: !isSwitchSimuBVOn,
              });
              console.log('Simulador : ' + !isSwitchSimuBVOn);
            }}
          />
        </View>
      </List.Section>
      <View style={styles.snackbarAlert}>
        <Snackbar
          style={styles.snackbarAlert}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Fechar',
            onPress: () => {
              // Do something
            },
          }}>
          Cuidado, ao alterar esses interruptores, você pode comprometer o
          funcionamento do site
        </Snackbar>
      </View>
    </View>
  );
};

export default ConfigSwitchs;

const styles = StyleSheet.create({
  switchs: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snackbarAlert: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
