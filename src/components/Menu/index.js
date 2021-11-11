import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
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
                <EsquerdaDaMesmaLinha>
                    <Avatar source={avatar} />
                    <NomeEmpresa>{empresa.name}</NomeEmpresa>
                </EsquerdaDaMesmaLinha>
                <DivisorMenu/>
            </TouchableOpacity>
        );
    }

    render = () => {
        const empresas = empresasEstaticas.empresas;
        return (
            <ScrollView>
                <Espacador/>
                <ContainerMenu>
                    {empresas.map((empresa) => this.mostrarEmpresa(empresa))}
                </ContainerMenu>
            </ScrollView>
        );
    }
}