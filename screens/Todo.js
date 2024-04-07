import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const Todo = () => {
    const [todo, setTodo] = useState([]);
    const navigation = useNavigation();

    const fetchTodo = async () => {
        try {
          const response = await axios.get("http://192.168.251.140:3000/api/todo");
          const todo = response.data.data;
    
          setTodo(todo);
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

    console.log("Liste de taches :", JSON.stringify(todo, null, 2));
    

    const handleEdit = () => {
        axios.get(`http://192.168.251.140:3000/api/todo/edit/${id}`).then((res) => {
            setTodo(res.data.data);
            setLoading(false)
            navigate('Modifier');
        }).catch(() => {
            console.log(error);
        })

    }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View>
            <View style={{flexDirection:"row", padding:10, alignItems:"center", justifyContent:"space-between", marginBottom:10}}>
                <Text style={{fontWeight:"bold", fontSize:20}}>Liste de tâches :</Text>
                <Pressable onPress={() => navigation.navigate('Ajouter')}>
                    <AntDesign name="pluscircle" size={30} color="blue" />
                </Pressable>
            </View>
            {todo?.map((item) => (
                <View style={{borderWidth:1, borderColor:"#d0D0D0", justifyContent:"space-between", flexDirection: "row", paddingHorizontal:10}}>
                    <Text key={item._id} style={{padding:10}}>{item.title}</Text>
                    <View style={{flexDirection:"row", gap:25, alignItems:"center"}}>
                        <TouchableOpacity onPress={handleEdit}>
                            <FontAwesome name="pencil-square-o" size={24} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome6 name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    </ScrollView>
  )
}

export default Todo

const styles = StyleSheet.create({})