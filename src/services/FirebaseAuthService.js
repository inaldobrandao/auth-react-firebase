import firebase from 'firebase/app';
require("firebase/auth");

class FirebaseAuthService {
    
    static createUser(user, callbackSucess, callbackError) {
        firebase.auth().createUserWithEmailAndPassword(user.userName, user.password)
            .then(u => {
                callbackSucess(user);
            })
            .catch(function(error) {
                callbackError(error)
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

    static signIn(user, callbackSuccess, callbackError){
        firebase.auth().signInWithEmailAndPassword(user.userName, user.password)
            .then(user => {
                localStorage.setItem("logged", "true")
                callbackSuccess(user)
            })
            .catch(function(error) {
                callbackError(error)                
            });
    }

    static errorCodeInvalidPassword(){
        return "auth/wrong-password";
    }

    static errorUserExists(){
        return "auth/email-already-in-use";
    }

    static signOut(callbackSuccess){
        firebase.auth().signOut().then(function() {
            callbackSuccess(true);
            localStorage.removeItem("logged");
        }).catch(function(error) {
            callbackSuccess(false);
        });
    }

    static authExternal(provider, callbackSuccess, callbackError){
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
                callbackSuccess(user);
            })
            .catch(err => {
                callbackError(err)
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