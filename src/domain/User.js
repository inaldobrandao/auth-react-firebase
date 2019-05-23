import BaseModel from "./BaseModel";

export default class User extends BaseModel {
    constructor(name, email){
        super();
        this.name = name;
        this.email = email;        
    }
}