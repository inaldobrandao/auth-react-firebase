import FirestoreUserRepository from '../repositories/FirestoreUserRepository';

class FirestoreUserService {

    createUser(user){
        const userRepo = new FirestoreUserRepository();
        userRepo.create(user);
        return userRepo.batch.commit();
    }
}

export default FirestoreUserService