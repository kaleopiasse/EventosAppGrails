package rest.api

class BootStrap {

    def init = { servletContext ->
        new User (username: "user", password:"81dc9bdb52d04dc20036dbd8313ed055").save()
        new User (username: "kaleopiasse@gmail.com", password:"81dc9bdb52d04dc20036dbd8313ed055").save()
        new User (username: "admin", password:"81dc9bdb52d04dc20036dbd8313ed055").save()
        //new Evento (titulo: "teste", data: "15/04/1991", horaInicio: "09:00", horaFim: "10:00")
    }
    def destroy = {
    }
}
