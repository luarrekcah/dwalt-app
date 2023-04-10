import React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';

import Colors from '../../../globalStyles/colors';

const Home = ({navigation}) => {
  return (
    <ScrollView>
      <List.Section title="D | Walt Engenharia">
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
        {/**
           <List.Item
          title="Serviços"
          description="Serviços e Descrições"
          left={() => <List.Icon color={Colors.color.primary} icon="tools" />}
          onPress={() => {
            navigation.navigate('Services');
          }}
        />
         */}

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
          title="Produtos"
          description="Ofertas da semana"
          left={() => <List.Icon color={Colors.color.primary} icon="cart" />}
          onPress={() => {
            navigation.navigate('WeekOffers');
          }}
        />
        {/**
         * <List.Item
          title="Blog"
          description="Postagens no site"
          left={() => (
            <List.Icon color={Colors.color.primary} icon="newspaper" />
          )}
          onPress={() => {
            navigation.navigate('Blog');
          }}
        />
         */}
      </List.Section>
      {/*
      <List.Section title="D | Walt Connect">
        <List.Item
          title="Emitir notificação"
          description="Notificações para empresas."
          left={() => <List.Icon color={Colors.color.primary} icon="send" />}
          onPress={() => {
            navigation.navigate('GenProposal');
          }}
        />
      </List.Section>
       */}
    </ScrollView>
  );
};

export default Home;
