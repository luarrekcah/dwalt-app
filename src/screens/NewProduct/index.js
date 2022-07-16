import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const NewProduct = () => {
  let [produto, setProduto] = React.useState({
    codigo: '',
    title: 'Gerador',
  });

  console.log(produto);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.space}
          label="Código do Produto"
          value={produto.codigo}
          onChangeText={newText => {
            produto.codigo = newText;
            setProduto(produto);
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {},
});

export default NewProduct;
