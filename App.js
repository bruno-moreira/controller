import React from 'react';
import { StatusBar } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Feeds from './src/screen/Feeds';
import Detalhes from './src/screen/Detalhes';
import Validade from './src/screen/Validade';

const Navigator = createStackNavigator(
  {
    Feeds: { screen: Feeds },
    Detalhes: { screen: Detalhes },
    Validade: { screen: Validade }
  },
  {
    headerMode: 'none'
  }
);

const Container = createAppContainer(Navigator);

export default function App() {
  return (
    <MenuProvider>
      <StatusBar></StatusBar>
      <Container></Container>
    </MenuProvider>
  );
}