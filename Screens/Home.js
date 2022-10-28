import { View, Text,FlatList,StyleSheet,TextInput,TouchableOpacity,Keyboard, Pressable } from 'react-native';
import React,{useState,useEffect} from 'react';
import {firebase} from '../config';
import {FontAwesome} from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const [notes,setNotes] =useState([]);
    const notesRef =firebase.firestore().collection('notes');
    const [addData,setAddData] =useState('');
    const navigation =useNavigation();

    useEffect(()=>{
        notesRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const notes =[]
            querySnapshot.forEach((doc)=>{
                const {heading} =doc.data()
                notes.push({
                    id:doc.id,
                    heading,

                })

            })
            setNotes(notes)
        }

        )

    },[])

    //delete a notes from firebase

    const deleteNotes =(notes)=>{
        notesRef
        .doc(notes.id)
        .delete()
        .then(()=>{
            //show alert for delete notes
            alert('Deleted successfully!')
        })
        .catch(error=>{
            alert(error);
        })

    }
    //add a notes
    const addNote =()=>{
        if(addData && addData.length >0){
            const timetamp =firebase.firestore.FieldValue.serverTimestamp();
            const data ={
                heading:addData,
                createdAt:timetamp
            };
            notesRef.add(data)
            .then(()=>{
                setAddData('');
                    //release keyboard
                Keyboard.dismiss();
            })
            .catch((error)=>{
                alert(error);
            })
        }

    }
    return (
        <View style={{flex:1}}>
            <View style={Styles.formContainer}>
                <TextInput
                style={styles.input}
                placeholder='Add new note'
                placeholderTextColor='#aaaaaa'
                onChangeText={(heading)=>setAddData(heading)}
                value={addData}
                underlineColorAndroid='transparent'
                autoCapitalize='none'

                />
                <TouchableOpacity style={styles.button} onPress={addNote}>
                    <Text style={styles.button}>Add Note</Text>

                </TouchableOpacity>

            </View>
            <FlatList
            data={notes}
            numColumns={1}
            renderItem={({item})=>(
                <View>
                    <Pressable 
                    style={styles.container}
                    onPress={()=>navigation.navigate('Detail',{item})}
                    
                    >
                        <FontAwesome
                        name='trash-o'
                        color='red'
                        onPress={()=>deleteNotes(item)}
                        style={styles.noteIcon}
                        />
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>
                                {item.heading[0].touppercase()+ item.heading.slice(1)}

                            </Text>

                        </View>

                    </Pressable>
                </View>

            )}
            
            />

            

        </View>
    )
 
}

export default Home;