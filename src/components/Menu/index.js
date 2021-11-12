import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import empresasEstaticas from '../../assets/dicionarios/empresas.json';

import { 
    Avatar, 
    NomeEmpresa,
    Espacador, 
    ContainerMenu, 
    EsquerdaDaMesmaLinha, 
    DivisorMenu 
} from '../../assets/styles';
import avatar from '../../assets/img/avatar.png';
export default class Menu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
           filtrar:  props.filtragem
        }
    }

    mostrarEmpresa = (empresa) => {
        const { filtrar} = this.state
        return (
            <TouchableOpacity onPress={() => {
                filtrar(empresa)
            }}>
                <DivisorMenu/>
                <EsquerdaDaMesmaLinha>
                    <Avatar source={avatar} />
                    <NomeEmpresa>{empresa.name}</NomeEmpresa>
                </EsquerdaDaMesmaLinha>                
            </TouchableOpacity>
        );
    }

    render = () => {
        const empresas = empresasEstaticas.empresas;

        return(
            <SafeAreaInsetsContext.Consumer>
                {insets => 
                    <ScrollView style={{ paddingTop: insets.top }}>
                        <ContainerMenu>
                            {empresas.map((empresa) => this.mostrarEmpresa(empresa))}
                        </ContainerMenu>
                    </ScrollView>
                }
            </SafeAreaInsetsContext.Consumer>
        );
    }
}