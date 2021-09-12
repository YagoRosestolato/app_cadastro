import React from 'react';
import { TouchableOpacityButton, CadastroTitle  } from './style';
import {  Text } from 'react-native'

interface ICadastroData{
  nome: string;
  email: string;
  telefone: string;
  onPress: () => void;
}

export function CadastroCard({nome, email, telefone, ...rest}: ICadastroData){
  return (
    <TouchableOpacityButton 
    {...rest}
    >
      <CadastroTitle>{nome}</CadastroTitle>
      <CadastroTitle>{email}</CadastroTitle>
      <CadastroTitle>{telefone}</CadastroTitle>
    </TouchableOpacityButton>
  )
} 

