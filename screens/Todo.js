import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    // const {id} = route.params;
    const navigation = useNavigation();

    const fetchTodo = async () => {
        try {
          const response = await axios.get("http://192.168.251.140:3000/api/todo");
          const todo = response.data.data;
    
          setTodos(todo);
        } catch (error) {
          console.log("error", error);
        }
    };
    
    // Actualiser les données à chaque fois que l'on change de page
    useFocusEffect(
        useCallback(() => {
            fetchTodo();
        }, [])
    );

    console.log("Liste de taches :", JSON.stringify(todos, null, 2));

    const handleEditTodo = () => {
        navigation.navigate('Modifier', { id: todos._id });
    };

    const handleDeleteTodo = () => {
        Alert.alert(
            'Confirmation',
            'Êtes-vous sûr de vouloir supprimer cette tâche ?',
            [
                {
                    text: 'Annuler',
                    style: 'cancel'
                },
                {
                    text: 'Supprimer',
                    onPress: () => deleteTodo()
                }
            ]
        );
    };

    const deleteTodo = async () => {
        try {
            await axios.delete(`http://192.168.251.140:3000/api/todo/delete/66133f55232d24b12866985e`);
            Alert.alert("Félicitations", "La tache a été supprimée avec succès !");
            console.log(todos);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginTop: 8, marginLeft: 5 }}>Liste de tâches</Text>
            <TouchableOpacity style={{ fontSize: 20, marginRight: 5 }} onPress={() => navigation.navigate('Ajouter')}>
                <AntDesign name="pluscircle" size={30} color="blue" />
            </TouchableOpacity>
        </View>
            <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#718093', paddingVertical: 5 }}>
                <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>ID</Text>
                <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Titre</Text>
                <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Statut</Text>
                <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Actions</Text>
            </View>
            {todos.map((todo) => (
                <View key={todo._id} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#718093', paddingVertical: 5 }}>
                    <Text style={{ flex: 1, textAlign: 'center' }}>{todo._id}</Text>
                    <Text style={{ flex: 1, textAlign: 'center' }}>{todo.title}</Text>
                    <Text style={{ flex: 1, textAlign: 'center' }}>{todo.status}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={handleEditTodo}>
                            <FontAwesome name="pencil-square-o" size={24} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeleteTodo}>
                            <FontAwesome6 name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            </View>
        </ScrollView>
    </ScrollView>
  )
}

export default Todo