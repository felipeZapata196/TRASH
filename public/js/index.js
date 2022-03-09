import '@babel/polyfill';
import {login, logout} from './login';
import {updateData} from './updateSettings';
import {signUp} from './signUp';



const loginForm =document.querySelector('.loginForm');   
const  logOutBtn = document.querySelector('.logout')
const updateSettings = document.querySelector('.updateSetings')
const updatePassword = document.querySelector('.user-setings')
const signUpForm = document.querySelector('.signUp');


if(loginForm)
    loginForm.addEventListener('submit', e=> {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
      
        login(email, password)
        


    });


if(logOutBtn) logOutBtn.addEventListener('click', logout)


if(updateSettings)
   
    updateSettings.addEventListener('submit', e=> {
        e.preventDefault();

        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);

       
        
    updateData(form, 'data');
    });


    if(updatePassword)
   
    updatePassword.addEventListener('submit', async e=> {
        e.preventDefault();

        document.querySelector('.botonPassword').textContent  ='Updating...'
        const passwordCurrent = document.getElementById('passwordCurrent').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
       
        
    await updateData({passwordCurrent, password, passwordConfirm}, 'password');
    
    document.querySelector('.botonPassword').textContent  = 'Save password'
    document.getElementById('passwordCurrent').value= '';
    document.getElementById('password').value= '';
    document.getElementById('passwordConfirm').value = '';
    
});





if(signUpForm)

    signUpForm.addEventListener('submit', async e=> {
        e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('passwordConfirm').value;
           
            
    

    await signUp(name, email, password, passwordConfirm)


})