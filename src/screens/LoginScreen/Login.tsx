import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {firebaseAuth} from '../../../firebase-config';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, useAppDispatch} from '../../App';
import {setUser} from '../../appReducer';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('password');

  // const login = async () => {
  //   try {
  //     await setPersistence(firebaseAuth, browserLocalPersistence).then(() => {
  //       return signInWithEmailAndPassword(firebaseAuth, email, password);
  //     });
  //     await onAuthStateChanged(firebaseAuth, currentUser => {
  //       console.log(currentUser);
  //       currentUser && dispatch(setUser(currentUser));
  //     });
  //     navigation.navigate('Home');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      await onAuthStateChanged(firebaseAuth, currentUser => {
        // console.log(currentUser);
        currentUser && dispatch(setUser(currentUser));
      });
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.form}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Login</Text>
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              defaultValue={email}
              onChangeText={text => setEmail(text)}
              placeholder="email"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              defaultValue={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              placeholder="password"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>ログイン</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.buttonText}>新規登録</Text>
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
  inputWrap: {
    marginTop: 32,
  },
  input: {
    fontSize: 14,
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

export default Login;
