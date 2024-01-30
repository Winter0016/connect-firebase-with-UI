import { auth,googleprovider } from '../config/firebase-config.js';
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth';
import {useState} from "react"

export const Auth = () => {
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");

    //console.log(auth?.currentUser?.photoURL);
    const signIn = async() => {
        try{
            await createUserWithEmailAndPassword(auth, email,password);
        }
        catch (err){
            console.log(err);
        }
    };
    const signin2 = async() => {
        try{
            await signInWithPopup(auth,googleprovider);
        }catch(err){
            console.log(err);
        }

    };
    const logout = async() => {
        try{
            await signOut(auth);
        }catch(err){
            console.log(err);
        }

    };
    return (
        <div>
            <input placeholder="Email..."
                onChange={(e) => setemail(e.target.value)}
            />
            <input placeholder = "Password...."
                type='password' 
                onChange={(e) => setpassword(e.target.value)}
            />
            <button type="submit" onClick={signIn}>Sign in</button>
            <button onClick={signin2}> Sign in with Google</button>
            <button onClick={logout}>Log out</button>
        </div>
    )
}