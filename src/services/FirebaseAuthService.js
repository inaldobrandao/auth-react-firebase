import firebase from 'firebase/app';
require("firebase/auth");

class FirebaseAuthService {
    
    static createUser(user, callbackSucess) {
        firebase.auth().createUserWithEmailAndPassword(user.userName, user.password)
            .then(() => {
                callbackSucess();
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });
    }
    
   static verifyLogged(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('logged')
                localStorage.setItem("logged", "true")
            } else {
                console.log('user not logged')
                localStorage.setItem("logged", "false")
            }
          });
    }

    static currentUser(){
        return firebase.auth().currentUser;
    }

    static login(user, callbackSuccess){
        firebase.auth().signInWithEmailAndPassword(user.userName, user.password)
            .then(user => {
                console.log(user)
                localStorage.setItem("logged", "true")
                callbackSuccess(user)
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    static signOut(callbackSuccess){
        firebase.auth().signOut().then(function() {
            callbackSuccess(true);
            localStorage.removeItem("logged");
        }).catch(function(error) {
            callbackSuccess(false);
            console.error('Falha ao deslogar');
        });
    }

    static authExternal(provider, callbackSuccess){
        let providerAuth
        if(provider === "google"){
            providerAuth = new firebase.auth.GoogleAuthProvider();
            providerAuth.addScope('profile');
            providerAuth.addScope('email');
        } else if(provider === "facebook"){
            providerAuth = new firebase.auth.FacebookAuthProvider();            
        }

        firebase.auth().signInWithPopup(providerAuth)
            .then(function(result) {
                console.log(result)    
                let token = result.credential.accessToken;        
                console.log(token)
                let user = result.user;
                console.log(user)
                callbackSuccess();
            })
            .catch(err => {
                console.error(err);
            });            
    }
}

export default FirebaseAuthService;