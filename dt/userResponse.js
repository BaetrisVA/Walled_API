//DTO
class UserReponse{
    constructor(user){
        this.id =user.id
        this.username = user.username;
        this.fullname = user.fullname;
        this.email = user.email;
        this.balance = user.balance;
    }
}

module.exports = {UserReponse};