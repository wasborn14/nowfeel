import React, {useEffect, useState} from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../../../firebase-config';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {User as FirebaseUser} from 'firebase/auth';
type Props = NativeStackScreenProps<RootStackParamList, 'LoggedIn'>;

const LoggedIn: React.FC<Props> = ({navigation}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.form}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>LoggedIn</Text>
          </View>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{user?.email}</Text>
          </View>
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

export default LoggedIn;
