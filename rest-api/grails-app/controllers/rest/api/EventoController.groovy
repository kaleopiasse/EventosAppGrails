package rest.api


import grails.rest.*
import grails.converters.*

class EventoController {
    static allowedMethods = [delete: "DELETE", index: "GET", save: "POST", show: "GET", update: "PUT"]

    EventoService eventoService

    def index() {
        render eventoService.findAllOrderByName(response)
    }

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
}
