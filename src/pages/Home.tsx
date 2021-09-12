import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Title, Input } from './styles'
import { Button } from '../components/button/Button';
import { CadastroCard } from '../components/cadastroCards/Index';
import { FlatList  } from 'react-native';

interface ICadastroData{
  id: string;
  nome: string;
  email: string;
  telefone: string;
}
export function Home (){
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [myCadastro, setMyCadastro] = useState<ICadastroData[]>([]);

  function handleAddNewCadastro() {
    const data = {
      id: String(new Date().getTime()),
      nome: nome,
      email: email,
      telefone: telefone,
    } 
    if (nome == '' || email == '' || telefone == '') {
      return;
    }
    setMyCadastro([...myCadastro, data])
    setNome('')
    setEmail('')
    setTelefone('')
  }

  function handleRemoveCadastro (id: string){
    setMyCadastro(myCadastro => myCadastro.filter(nome => nome.id !== id))
  }

  useEffect(() => {
    async function loadData() {
      const storagedCadastro = await AsyncStorage.getItem('@myCadastro:cadastro')
      if (storagedCadastro){
        setMyCadastro(JSON.parse(storagedCadastro))
      }
    }
    loadData()
  }, []) 

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem('@myCadastro:cadastro', JSON.stringify(myCadastro))
    }
    saveData()
  }, [myCadastro])
  
  return (
    <Container>
      <StatusBar hidden />
      <Title>FAÇA SEU CADASTRO</Title>
      <Input
        placeholder="Nome" 
        value={nome}
        onChangeText={value => setNome(value)} 
      />
      <Input
        placeholder="Email" 
        value={email}
        onChangeText={value => setEmail(value)} 
      />
      <Input
        placeholder="Telefone" 
        value={telefone} 
        onChangeText={value => setTelefone(value)} 
      />

      <Button
        title="ADICIONAR"
        onPress={handleAddNewCadastro} 
       />
  
      <Title>Usuários Cadastrados</Title>

      <FlatList
          data={myCadastro}
          keyExtractor={item => item.id}
          renderItem={({item})=>(
          <CadastroCard 
            nome={item.nome}
            email={item.email}
            telefone={item.telefone}
            onPress={() => handleRemoveCadastro(item.id)}
          />
        )}
      />
    </Container>
  );
}
