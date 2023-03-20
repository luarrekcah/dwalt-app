import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, List, TextInput} from 'react-native-paper';
import Colors from '../../globalStyles/colors';

import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const GenProposal = () => {
  const [num_identify, setNumIdentify] = React.useState('0000-00');
  const [client_name, setClientName] = React.useState('');
  const [cpf_cnpj, setCpfCnpj] = React.useState('000.000.000-00');
  const [num_inv, setNumInv] = React.useState('00');
  const [num_p, setNumP] = React.useState('00');
  const [kwp, setKwp] = React.useState('0,0');
  const [name_inv, setNameInv] = React.useState('');
  const [comp_inv, setCompInv] = React.useState('');
  const [prod_media, setProdMedia] = React.useState('00000 kWh/mês');
  const [anual, setAnual] = React.useState('00000 kWh');
  const [total_v, setTotalV] = React.useState('R$00.000,00');
  const [entrada, setEntrada] = React.useState('R$00.000,00');
  const [forma_p, setFormaP] = React.useState('Financiamento');
  const [valor_f, setValorF] = React.useState('R$00.000,00');
  const [cartao, setCartao] = React.useState('R$00.000,00');
  const [value24x, set24x] = React.useState('000,00');
  const [value36x, set36x] = React.useState('000,00');
  const [value48x, set48x] = React.useState('000,00');
  const [value60x, set60x] = React.useState('000,00');
  const [value72x, set72x] = React.useState('000,00');
  const [value84x, set84x] = React.useState('000,00');

  const generate = async () => {
    try {
      const date = new Date();

      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const ano = date.getFullYear();
      const hora = date.getHours().toString().padStart(2, '0');
      const minutos = date.getMinutes().toString().padStart(2, '0');
      const segundos = date.getSeconds().toString().padStart(2, '0');

      console.log('CALL');

      const templatePath = RNFS.MainBundlePath + '/template.docx';

      const data = {
        num_identify: num_identify,
        client_name: client_name,
        cpf_cnpj: cpf_cnpj,
        date_now_proposal: `${dia}/${mes}/${ano} - ${hora}:${minutos}:${segundos}`,
        num_inv: num_inv,
        num_p: num_p,
        kwpSpc: kwp,
        kwp: kwp,
        name_inv: name_inv,
        comp_inv: comp_inv,
        prod_media: prod_media,
        anual: anual,
        total_v: total_v,
        entrada: entrada,
        forma_p: forma_p,
        valor_f: valor_f,
        cartao: cartao,
        '24x': value24x,
        '36x': value36x,
        '48x': value48x,
        '60x': value60x,
        '72x': value72x,
        '84x': value84x,
      };

      const template = await RNFS.readFile(templatePath, 'base64');

      const doc = new Docxtemplater().loadZip(new JSZip(template));
      doc.setData(data);
      doc.render();
      const generatedDocument = doc.getZip().generate({type: 'base64'});

      console.log(generatedDocument);

      await Share(
        {
          url: `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${generatedDocument}`,
          title: 'titulo',
          message: 'descricao',
        },
        {
          dialogTitle: 'Compartilhar arquivo via:',
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section title="Preencha os dados">
          <TextInput
            style={styles.textinput}
            label="Número de Identificação"
            placeholder="00001-23"
            value={num_identify}
            onChangeText={newText => setNumIdentify(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Nome do Cliente"
            placeholder="Fulano"
            value={client_name}
            onChangeText={newText => setClientName(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="CPF/CNPJ"
            placeholder="000.000.000-00"
            value={cpf_cnpj}
            onChangeText={newText => setCpfCnpj(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Número de Inversores"
            placeholder="1"
            value={num_inv}
            onChangeText={newText => setNumInv(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Número de Placas"
            placeholder="20"
            value={num_p}
            onChangeText={newText => setNumP(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Kwp"
            placeholder="34"
            value={kwp}
            onChangeText={newText => setKwp(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Nome do Inversor"
            placeholder="Nome completo do inversor"
            value={name_inv}
            onChangeText={newText => setNameInv(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Componentes do Inversor"
            placeholder="Copie e cole aqui"
            value={comp_inv}
            onChangeText={newText => setCompInv(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Produção Média"
            placeholder="1000kwh/mês"
            value={prod_media}
            onChangeText={newText => setProdMedia(newText)}
          />
          <TextInput
            style={styles.textinput}
            label="Produção Anual"
            placeholder="Digite o valor anual"
            value={anual}
            onChangeText={setAnual}
          />
          <TextInput
            style={styles.textinput}
            label="Valor total"
            placeholder="Digite o valor"
            value={total_v}
            onChangeText={setTotalV}
          />
          <TextInput
            style={styles.textinput}
            label="Valor de entrada"
            placeholder="Digite o valor"
            value={entrada}
            onChangeText={setEntrada}
          />
          <TextInput
            style={styles.textinput}
            label="Forma de pagamento"
            placeholder="Digite o valor"
            value={forma_p}
            onChangeText={setFormaP}
          />
          <TextInput
            style={styles.textinput}
            label="Valor Financiado"
            placeholder="Digite o valor"
            value={valor_f}
            onChangeText={setValorF}
          />
          <TextInput
            style={styles.textinput}
            label="Valor no Cartão"
            placeholder="Digite o valor de cartao"
            value={cartao}
            onChangeText={setCartao}
          />
          <TextInput
            style={styles.textinput}
            label="24x"
            placeholder="Digite o valor de 24x"
            value={value24x}
            onChangeText={newText => {
              set24x(newText);
            }}
          />
          <TextInput
            style={styles.textinput}
            label="36x"
            placeholder="Digite o valor de 36x"
            value={value36x}
            onChangeText={newText => {
              set36x(newText);
            }}
          />
          <TextInput
            style={styles.textinput}
            label="48x"
            placeholder="Digite o valor de 48x"
            value={value48x}
            onChangeText={newText => {
              set48x(newText);
            }}
          />
          <TextInput
            style={styles.textinput}
            label="60x"
            placeholder="Digite o valor de 60x"
            value={value60x}
            onChangeText={newText => {
              set60x(newText);
            }}
          />
          <TextInput
            style={styles.textinput}
            label="72x"
            placeholder="Digite o valor de 72x"
            value={value72x}
            onChangeText={newText => {
              set72x(newText);
            }}
          />
          <TextInput
            style={styles.textinput}
            label="84x"
            placeholder="Digite o valor de 84x"
            value={value84x}
            onChangeText={newText => {
              set84x(newText);
            }}
          />
        </List.Section>

        <Button
          style={styles.button}
          icon="send"
          mode="contained"
          onPress={() => generate()}>
          Gerar e Compartilhar
        </Button>
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

export default GenProposal;
