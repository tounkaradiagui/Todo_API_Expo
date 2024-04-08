import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const CreateTodo = () => {
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    const handleAddTodo = () => {
        setLoading(true)
        const data = {title}
        if(!title || title === "") {
            Alert.alert("Le titre est obligatoire")
        }

        axios.post(`http://192.168.251.140:3000/api/todo/create`, data).then((res) => {
            setTitle(res.data.title);
            Alert.alert("Félicitations !", "La tache ajoutée avec succès");
            setTimeout(() => {
                navigation.goBack("Todo")
            }, 5000)
            
        }).catch((error) => {
            console.log(error);
        })
    }


  return (
    <View style={{padding:10}}>
        <Text style={{fontSize:16, fontWeight:"600"}}>Ajout d'une tâche</Text>
        <View style={{padding:10, borderWidth:1, marginTop:10, borderColor:"#D0D0D0"}}>
            <TextInput placeholder="Entrez le nom de la tache" value={title} onChangeText={text=>setTitle(text)}/>
        </View>

        <TouchableOpacity style={{padding:15, backgroundColor:"gold", width:110, marginTop:20, }} onPress={handleAddTodo}>
            <Text style={{fontSize:16, fontWeight:"500"}}>Enregistrer</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CreateTodo