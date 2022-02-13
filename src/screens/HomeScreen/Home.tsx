import React, {useEffect, useState} from 'react';
import {signOut} from 'firebase/auth';
import {firebaseAuth} from '../../../firebase-config';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, useAppState} from '../../App';
import {
  getDatabase,
  ref as firebaseRef,
  child,
  set,
  get,
  push,
} from 'firebase/database';
import {useHomeState} from './index';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation}) => {
  const user = useAppState(state => state.user);
  const taskList = useHomeState(state => state.taskList);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskComment, setTaskComment] = useState('');

  const logout = async () => {
    await signOut(firebaseAuth);
    navigation.navigate('Login');
  };

  const postTask = async (title: string, comment: string) => {
    try {
      const db = getDatabase();
      const postListRef = firebaseRef(db, 'tasks/' + user?.uid);
      const newPostRef = push(postListRef);
      await set(newPostRef, {
        title: title,
        comment: comment ? comment : undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const postTask = (userId: number, email: string) => {
  //   const db = getDatabase();
  //   set(firebaseRef(db, 'task/' + user?.uid + '/' + ), {
  //     email: email,
  //   });
  // };

  useEffect(() => {
    const dbRef = firebaseRef(getDatabase());
    get(child(dbRef, 'tasks/' + user?.uid))
      .then(snapshot => {
        if (snapshot) {
          console.log(snapshot.val());
        } else {
          console.log('no data');
        }
      })
      .catch(error => {
        console.error(error);
      });
  });

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  // useEffect(()=>{
  //
  // },[]);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.form}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Home</Text>
          </View>
          <View style={styles.titleWrap}>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              defaultValue={taskTitle}
              onChangeText={text => setTaskTitle(text)}
              placeholder="text"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              defaultValue={taskComment}
              onChangeText={text => setTaskComment(text)}
              style={styles.input}
              placeholder="text"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => postTask(taskTitle, taskComment)}>
            <Text style={styles.buttonText}>データ登録</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>サインアウト</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    paddingTop: 100,
    paddingBottom: 200,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: 300,
    height: 400,
    alignItems: 'center',
  },
  titleWrap: {
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputWrap: {
    marginTop: 32,
  },
  input: {
    fontSize: 20,
    backgroundColor: '#f2f2f2',
    height: 40,
    width: 200,
  },
  button: {
    marginTop: 20,
    width: 100,
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default Home;
