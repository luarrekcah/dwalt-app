import React from 'react';
import {ScrollView} from 'react-native';
import {List, Chip} from 'react-native-paper';

import ConfigSwitchs from './ConfigSwitchs';
import Colors from '../../../globalStyles/colors';

const Home = ({navigation}) => {
  return (
    <ScrollView>
      <List.Section title="Ferramentas">
        <List.Item
          title="Registrar Cliente"
          description="Todas as informações necessárias para os procedimentos da homologação"
          left={() => <List.Icon color={Colors.color.primary} icon="tools" />}
          onPress={() => navigation.navigate('RegistrarCliente')}
        />
      </List.Section>
      <List.Section title="Administração do site">
        <List.Item
          title="Informações Gerais do Site"
          description="Gerencie dados de contato e outras informações"
          left={() => <List.Icon color={Colors.color.primary} icon="web" />}
          onPress={() => {
            navigation.navigate('InfosSite');
          }}
        />
        <List.Item
          title="Projetos"
          description="Gerencie os Projetos à amostra no site"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="solar-panel" />
          )}
          onPress={() => {
            navigation.navigate('GenProjects');
          }}
        />
        <List.Item
          title="Vagas da Staff"
          description="Gerencie as vagas de trabalho na empresa"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="find-replace" />
          )}
          onPress={() => {
            navigation.navigate('GenVagasStaff');
          }}
        />
        <List.Item
          title="Staff"
          description="Gerencie os dados de Staffs/Crachá Virtual"
          left={() => <List.Icon color={Colors.color.primary} icon="shield" />}
          onPress={() => {
            navigation.navigate('GenStaffs');
          }}
        />
        <List.Item
          title="Clientes"
          description="Acessar os dados de clientes cadastrados"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="account-multiple" />
          )}
          onPress={() => {
            navigation.navigate('GenCustomers');
          }}
        />
        <List.Item
          title="Serviços"
          description="Serviços e Descrições"
          left={() => <List.Icon color={Colors.color.primary} icon="tools" />}
          onPress={() => {
            navigation.navigate('Services');
          }}
        />
        <List.Item
          title="F.A.Q"
          description="Perguntas Frequentes"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="clipboard-list" />
          )}
          onPress={() => {
            navigation.navigate('Faq');
          }}
        />
        <List.Item
          title="Blog"
          description="Postagens no site"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="newspaper" />
          )}
          onPress={() => {
            navigation.navigate('Blog');
          }}
        />
        <ConfigSwitchs />
      </List.Section>
      <Chip icon="information">ALPHA V0.1</Chip>
    </ScrollView>
  );
};

export default Home;
