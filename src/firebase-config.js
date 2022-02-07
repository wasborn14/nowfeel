import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB4GWKxagNngetG3mKRQkwtI4bf2fnCvIs',
  authDomain: 'nowfeel-3292e.firebaseapp.com',
  projectId: 'nowfeel-3292e',
  storageBucket: 'nowfeel-3292e.appspot.com',
  messagingSenderId: '249982474625',
  appId: '1:249982474625:web:bf59c7653b5fc941087080',
  measurementId: 'G-4RW4JZDC7Y',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
