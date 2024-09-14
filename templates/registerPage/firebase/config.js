 //firebasee

    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

function showMessage(message,divId){
    var messageDiv=document.getElementById(divId)
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000)
}

    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
    import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
    import { getFirestore , setDoc,doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-store.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCBBfQJyqOObxExoSpJtraLMRVPhmVQk_A",
      authDomain: "kazakistan-129c5.firebaseapp.com",
      projectId: "kazakistan-129c5",
      storageBucket: "kazakistan-129c5.appspot.com",
      messagingSenderId: "501108345763",
      appId: "1:501108345763:web:cc889fbbe3f814e6b36816",
      measurementId: "G-362RZL2HSF"
    };
    const app = initializeApp(firebaseConfig);
    const signup=document.getElementById('submit')
    signup.addEventListener('click', (event)=>{
        event.preventDefault();
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        const name=document.getElementById('name').value;
    
        const auth = getAuth()
        const db=getFirestore()
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user= userCredential.user
            const userData={
                email: email,
                name:name,
                password:password
            }
            showMessage('Account created' , 'singupmessage');
            const docRef=doc(db,'users',user.uid);
            setDoc(docRef,userData)
            .then(()=>{
                window.location.href='index.html'
            })
            .catch((error)=>{
                console.error('erorr writing document', error)
            });
        })
        .catch((error)=>{
            const erorrCode=error.code
            if(erorrCode=='auth/enail already in use'){
                showMessage('email adress already exsist','sigupMessage');
            }
            else{
                showMessage('uanble to create ');

            }
        })
    })