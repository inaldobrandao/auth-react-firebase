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
                console.error(errorCode)
                console.error(errorMessage)
            });
    }
    
   static verifyLogged(callbackSuccess){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                callbackSuccess(user)
                localStorage.setItem("logged", "true")
            } else {
                callbackSuccess(null)
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
                localStorage.setItem("logged", "true")
                callbackSuccess(user)
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode);
                console.error(errorMessage);
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
                let user = result.user;
                callbackSuccess();
            })
            .catch(err => {
                console.error(err);
            });            
    }

    static sendEmailResetPassword(email, callback){
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            callback(true);
          }).catch(function(error) {
            // An error happened.
            callback(false);
          });
    }
}

export default FirebaseAuthService;