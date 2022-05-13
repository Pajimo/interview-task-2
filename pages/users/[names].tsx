import { useRouter } from 'next/router'
import {useEffect, useState} from 'react'

interface UsersProps {
    username: string
}

interface myStore {
    username: string,
    active: boolean
}
 
const Users: React.FunctionComponent<UsersProps> = () => {

    
    const router = useRouter()
    //const { query: { username }}:any = router

    const [storage, setStorage]: any = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [username, setUsername] = useState('')


    let time : any;
    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(() => {
            const store = JSON.parse(localStorage.getItem('users') || "{}")
            const lastlast = storage.filter((user: any) => user.username !== username)
            let newUser = {
                username,
                active: false
            }
            localStorage.setItem('users', JSON.stringify([...lastlast, newUser]));
            setStorage([...lastlast, newUser])

        }, 60000)
    }

    useEffect(() =>{
        window.addEventListener('load', resetTimer);
        window.addEventListener('mousemove', resetTimer)
    }, [storage])

    useEffect(() => {
        const lastuser:any = sessionStorage.getItem('lastSession')
        setUsername(lastuser)
        const store = JSON.parse(localStorage.getItem('users') || "{}")
        setStorage(store)
        // store.forEach((element : any )=> {
        //     if(element.username !== username){
        //         console.log(element.username)
        //     }
        // });
        if(store){
            let newUser = {
                username: lastuser,
                active: true
            }
            localStorage.setItem('users', JSON.stringify([...store, newUser]));
        }
          
    }, [])

    useEffect(() => {
        const store = JSON.parse(localStorage.getItem('users') || "{}")
        window.addEventListener('storage', () => setStorage(store))
    }, [])
//     useEffect(() => {
//         const store = JSON.parse(localStorage.getItem('users') || "{}")
//         setStorage(store)
//         window.addEventListener('mousemove', resetTimer)  
//    },[])


useEffect(() => {
    console.log(storage)
}, [storage])

const logOut = () => {
    sessionStorage.removeItem('lastSession')
    router.push('../')
}

    return ( 
        <>
            <div className='container'>
                <p>Hi {username}</p> 
                <button onClick={logOut}>Log out</button>

                {storage.map((users: any) => {
                    return(
                        <div key={users.username}>
                            <p>{users.active ? 
                            <div>
                                <p className='.username'>{users.username}</p>
                                <p className='btn'>{users.active ? 'Active state' : ''}</p>
                            </div> : ''}</p>
                            
                        </div>
                    )
                })}
            </div>
        </>
     );
}
 
export default Users;