import BaseRepository from './base/BaseRepository';

class FirestoreUserRepository extends BaseRepository {

    constructor(){
        super("users");        
    }
}

export default FirestoreUserRepository;