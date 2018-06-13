package rest.api

class BootStrap {

    def init = { servletContext ->
        new User (username: "user", password:"81dc9bdb52d04dc20036dbd8313ed055").save()
    }
    def destroy = {
    }
}
