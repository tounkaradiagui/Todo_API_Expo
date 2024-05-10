import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const EditTodo = ({id}) => {
    const [title, setTitle] = useState("")
    const [todo, setTodo] = useState([])
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    useEffect(() => {
      setLoading(true);
      axios.get(`http://192.168.251.140:3000/api/todo/edit/${id}`)
        .then((res) => {
          setTodo(res.data[0]);
          setTitle(res.data.title);
          setStatus(res.data.status);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, [id]);

  return (
    <View style={{padding:10}}>
        <Text style={{fontSize:16, fontWeight:"600"}}>Modification d'une tâche</Text>
        <View style={{padding:10, borderWidth:1, marginTop:10, borderColor:"#D0D0D0"}}>
            <TextInput placeholder="Entrez le nom de la tache" value={title} onChangeText={text=>setTitle(text)}/>
        </View>

        <View style={{padding:10, borderWidth:1, marginTop:10, borderColor:"#D0D0D0"}}>
            <TextInput placeholder="Définissez le status de la tache" value={status} onChangeText={text=>setStatus(text)}/>
        </View>

        <TouchableOpacity style={{padding:15, backgroundColor:"gold", width:110, marginTop:20, }} >
            <Text style={{fontSize:16, fontWeight:"500"}}>Modifier</Text>
        </TouchableOpacity>
    </View>
  )
}

export default EditTodo