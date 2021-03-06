package rest.api

class User {

    String username
    String password

    static hasMany = [eventos: Evento]

    static constraints = {
        username nullable: false, blank: false, maxSize: 255, unique: true
        password nullable: false, blank: false
    }
}
