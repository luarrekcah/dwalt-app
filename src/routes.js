import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './screens/Main';
import RegistrarCliente from './screens/RegistrarCliente';
import BancoDados from './screens/BancoDados';
import InfosSite from './screens/InfosSite';
import GenProjects from './screens/GenProjects';
import GenVagasStaff from './screens/GenVagasStaff';
import GenStaffs from './screens/GenStaffs';
import GenCustomers from './screens/GenCustomers';
import NewProduct from './screens/NewProduct';
import NewProject from './screens/NewProject';

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
          name="RegistrarCliente"
          component={RegistrarCliente}
          options={{title: 'Registro de Cliente'}}
        />
        <Stack.Screen
          name="BancoDados"
          component={BancoDados}
          options={{title: 'Banco de Dados'}}
        />
        <Stack.Screen
          name="InfosSite"
          component={InfosSite}
          options={{title: 'Gerenciar Informações'}}
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
          name="GenCustomers"
          component={GenCustomers}
          options={{title: 'Gerenciar Clientes'}}
        />
        <Stack.Screen
          name="NewProduct"
          component={NewProduct}
          options={{title: 'Novo produto'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
