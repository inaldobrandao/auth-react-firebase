import firebase from 'firebase/app';
require("firebase/firestore");

class BaseRepository {

    constructor(collection){
        this.collection = collection
        this.db = firebase.firestore();
        this.batch = this.db.batch()
    }

    collectionReference(){
        return this.db.collection(this.collection);
    }

    create(item){
        let document = this.collectionReference().doc();
        this.batch.set(document, Object.assign({}, item));
    }
}

export default BaseRepository;