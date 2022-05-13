import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'


interface AuthProps {
    
}
 
const Auth: React.FunctionComponent<AuthProps> = () => {

    const [storage, setStorage]:any = useState([])

    const router = useRouter()

    const [username, setUsername] = useState('')

    useEffect(() => {
        const store = JSON.parse(localStorage.getItem('users') || "{}")
        const session:any = sessionStorage.getItem('lastSession')
        if(!store){
            localStorage.setItem('users', "[]")
        }
        else{
            setStorage(store)
            if(session){
                const lastuser = (store[store.length-1].username)
                sessionStorage.setItem('lastSession', lastuser)
                router.push(`./users/${lastuser}`)
            }
        }

    }, [])

    const login = () => {
        //const w = 'http://localhost:3000/users/gbendd'
        // const openedWindow = window.open(
        //   );
          
        //   // check if the window is in opened or closed state
        //   console.log(openedWindow.closed);
        if (username){
            sessionStorage.setItem('lastSession', username)
            const store = JSON.parse(localStorage.getItem('users') || "{}")
            const removeExisitingUser = storage.filter((user: any) => user.username !== username)
            let newUser = {
                username,
                active: true
            }
            localStorage.setItem('users', JSON.stringify([...removeExisitingUser, newUser]));
            router.push(`./users/${username}`)

            // 
            // localStorage.setItem('users', JSON.stringify([...lastlast, newUser]));
            // setStorage([...lastlast, newUser])
        }
        else{

        }
    }

    return ( 
        <>
            <div className='container'>
                <input className='w-72 p-2 bord' type='text' placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <button onClick={login}>Log In</button>
            </div>
        </>
     );
}
 
export default Auth;