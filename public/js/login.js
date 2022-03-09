/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {


    try{
       
    const res= await axios({
        method: 'POST',
        url: '/home/users/login',
        data: {
            email,
            password
        }
    });
    if(res.data.status === 'success'){
        showAlert('success', 'logged in successfully');
        window.setTimeout(()=>{
            location.assign('/');
        }, 1500);
    }


}catch(err){
   showAlert('error', err)
}
}
 
export const logout = async () =>{
    try{
        const res = await axios({
            method: 'GET',
            url:'/home/users/logout',

        });  
        if(res.data.status = 'success') location.reload(true);

    }catch(err){
        showAlert('error', err)
    }
}