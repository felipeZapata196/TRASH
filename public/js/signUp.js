
/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';


export const signUp = async (name, email, password, passwordConfirm) => {

    

    try{
    const res= await axios({
        method: 'POST',
        url: 'http://localhost:3000/home/users/signup',
        data: {
            name,
            email,
            password,
            passwordConfirm

        }
    })
    if(res.data.status === 'success'){
        showAlert('success', 'logged in successfully');
        window.setTimeout(()=>{
            location.assign('/');
        }, 1500);
    }


    console.log(res);
}catch(err){
    showAlert('error', err)
}
}
 