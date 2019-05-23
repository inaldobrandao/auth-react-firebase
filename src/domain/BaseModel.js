export default class BaseModel {
    constructor(){
        this.createdAt = new Date();
        this.updateAt = new Date();
        this.active = true;
    }
}