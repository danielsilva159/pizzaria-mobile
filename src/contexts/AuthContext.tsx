import React, {useState, createContext, ReactNode} from 'react'
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: ( credentials: SignInProps) => Promise<void>
}


type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        token: ''
    });
    const [loadingAuth, setLoadingAuth] = useState(false);
    const isAuthenticated = !!user.name;

    async function signIn({email, password}: SignInProps){
        setLoadingAuth(true);
        try {
            const response = await api.post('/session', {email, password});
           const {id, name, token} = response.data;
           const data = {
            ...response.data
           }
            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data))
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
           setUser({id, name, email, token})
            
            
        } catch (error) {
            console.log('erro ao acessa', error);
            setLoadingAuth(false)
             
        }

    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}