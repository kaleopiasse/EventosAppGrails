package rest.api

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class UserController {

    UserService userService

    static allowedMethods = [delete: "DELETE", index: "GET", save: "POST", show: "GET", update: "PUT"]

    def index() {
        render userService.findAllOrderByName(response)
    }

    /*
    def delete() {
        render eventoService.delete (params, request, response)
    }

    def show() {
        render eventoService.show(params, response)
    }

    def save() {
        render eventoService.save(request, response)
    }

    def update() {
        render eventoService.update(params, request, response)
    }
    */
}
