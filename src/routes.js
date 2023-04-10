import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './screens/Main';
import GenProjects from './screens/GenProjects';
import GenVagasStaff from './screens/GenVagasStaff';
import GenStaffs from './screens/GenStaffs';
import NewProduct from './screens/NewProduct';
import NewProject from './screens/NewProject';
import Faq from './screens/Faq';
import Blog from './screens/Blog';
import Services from './screens/Services';
import WeekOffers from './screens/WeekOffers';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{title: 'D Walt Engenharia'}}
        />
        <Stack.Screen
          name="GenProjects"
          component={GenProjects}
          options={{title: 'Gerenciar Projetos'}}
        />
        <Stack.Screen
          name="NewProject"
          component={NewProject}
          options={{title: 'Novo Projeto'}}
        />
        <Stack.Screen
          name="GenVagasStaff"
          component={GenVagasStaff}
          options={{title: 'Gerenciar Vagas Staff'}}
        />
        <Stack.Screen
          name="GenStaffs"
          component={GenStaffs}
          options={{title: 'Gerenciar Staffs'}}
        />
        <Stack.Screen
          name="NewProduct"
          component={NewProduct}
          options={{title: 'Novo produto'}}
        />
        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{title: 'Perguntas Frequentes'}}
        />
        <Stack.Screen
          name="Blog"
          component={Blog}
          options={{title: 'Blog - Postagens'}}
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{title: 'Especialidades'}}
        />
        <Stack.Screen
          name="WeekOffers"
          component={WeekOffers}
          options={{title: 'Ofertas'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
