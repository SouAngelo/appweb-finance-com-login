import {createContext, useState, useEffect} from 'react'
import firebase from '../services/firebaseConnection'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const authContext = createContext({})

function AuthProvider({children}){

  const [user, setUser] = useState('')
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const signed = !!user
  
  useEffect(() => {

    function loadStorage(){
        const storageUser = localStorage.getItem('SistemaUser')

        if(storageUser){
           setUser(JSON.parse(storageUser))
           setLoading(false)
        }
   
        setLoading(false)
    }

    loadStorage()

     
  }, [])

  // login do usuário

  async function signIn(email, password){
      setLoadingAuth(true)

      await firebase.auth().signInWithEmailAndPassword(email, password)
      .then( async (value) => {
           let uid = value.user.uid 

           const userProfile = await firebase.firestore().collection('users')
           .doc(uid).get()

           let data = {
            uid: uid,
            nome: userProfile.data().nome,
            email: value.user.email
           }

           setUser(data)
           userStorage(data)
           setLoadingAuth(false)
           toast.success('Bem vindo de volta!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
           
      })
      .catch((error) => {
        toast.error('Ops algo deu errado!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setLoadingAuth(false)
      })
  }


  // Cadastrar usuário

  async function signUp(email, password, nome){
    setLoadingAuth(true)

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async (value)=>{
        let uid = value.user.uid 

        await firebase.firestore().collection('users')
        .doc(uid).set({
          nome: nome    
        })
        .then( () => {
          let data = {
            uid: uid,
            nome: nome, 
            email: value.user.email,
          }

          setUser(data)
          userStorage(data)
          setLoadingAuth(false)
          toast.success('Seja bem vindo!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        })
    })

    .catch((error) => {
      console.log(error)
      toast.error('Ops algo deu errado!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setLoadingAuth(false)
    })
  }

  function userStorage(data){
    localStorage.setItem('SistemaUser', JSON.stringify(data))
  }

  // LogOut do usuário

  async function signOut(){
    await firebase.auth().signOut()
    localStorage.removeItem('SistemaUser')
    setUser(null)
  }
  
    return(
       <authContext.Provider value={{ signed, user, loading,
        signUp, signOut, signIn, loadingAuth, setUser, userStorage}}>
        {children}
       </authContext.Provider>
    )
}

export default AuthProvider