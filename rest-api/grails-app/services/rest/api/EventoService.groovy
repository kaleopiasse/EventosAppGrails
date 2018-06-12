package rest.api

import grails.gorm.transactions.Transactional
import grails.web.servlet.mvc.GrailsParameterMap
import groovy.json.JsonSlurper
import org.grails.web.json.JSONObject
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Transactional
class EventoService {

    MessageSource messageSource

    def serviceMethod() {

    }

    def findAllOrderByName(HttpServletResponse response) {
        JSONObject responseJSONObject = new JSONObject()
        try {
            List<Evento> eventos = Evento.findAll().sort( { it.titulo.toLowerCase() } )
            responseJSONObject = EventoUtil.instance.getEventoJSONObjectArray(eventos)
            response.status = HttpStatus.OK.value()
        } catch(IllegalArgumentException e) {
            responseJSONObject.put('errors', e.getMessages(messageSource))
            response.setStatus(e.getHttpCode())
        }
        return responseJSONObject
    }

    def show(GrailsParameterMap params, HttpServletResponse response) {
        JSONObject responseJSONObject = new JSONObject()

        try {
            Evento evento = Evento.read(DataUtil.instance.getLong(params.id))

            if(!evento) {
                throw new IllegalArgumentException(HttpStatus.NOT_FOUND.value())
            }
            responseJSONObject = EventoUtil.instance.getEventoJSONObject(evento)
            response.status = HttpStatus.OK.value()

        } catch(IllegalArgumentException e) {
            responseJSONObject.put('errors', e.getMessages(messageSource))
            response.setStatus(e.getHttpCode())
        }
        return responseJSONObject
    }

    JSONObject save(HttpServletRequest request, HttpServletResponse response) {
        JSONObject responseJSONObject = new JSONObject()
        JSONObject jsonObject = request.JSON

        try {
            JsonSlurper jsonSlurper = new JsonSlurper()
            Evento evento = new Evento(jsonSlurper.parseText(jsonObject.toString()))

            if(!evento.validate()) {
                throw new IllegalArgumentException(evento.errors)
            }

            evento.save(flush: true, failOnError: true)

            responseJSONObject = EventoUtil.instance.getEventoJSONObject(evento)

            response.status = HttpStatus.CREATED.value()

        } catch(IllegalArgumentException e) {
            responseJSONObject.put('errors', e.getMessages(messageSource))
            response.setStatus(e.getHttpCode())
        }

        return responseJSONObject
    }

    def update(GrailsParameterMap params, HttpServletRequest request, HttpServletResponse response) {
        JSONObject responseJSONObject = new JSONObject()
        JSONObject jsonObject = request.JSON

        Evento evento = Evento.findById(DataUtil.instance.getLong(params.id))

        if(evento) {
            try {
                JsonSlurper jsonSlurper = new JsonSlurper()
                evento.properties = jsonSlurper.parseText(jsonObject.toString())
                if (!evento.validate()) {
                    throw new IllegalArgumentException(evento.errors)
                }

                evento.save(flush: true, failOnError: true)

                responseJSONObject = EventoUtil.instance.getEventoJSONObject(evento)
                response.status = HttpStatus.OK.value()

            } catch(IllegalArgumentException e) {
                responseJSONObject.put 'errors', e.getMessages(messageSource)
                response.setStatus(e.getHttpCode())
            }
        } else {
            responseJSONObject = NotFoundResponseUtil.instance.createNotFoundResponse(messageSource.getMessage(null, null))
            response.status = HttpStatus.NOT_FOUND.value()
        }
        return responseJSONObject
    }

    def delete(GrailsParameterMap params, HttpServletRequest request, HttpServletResponse response) {
        JSONObject responseJSONObject = new JSONObject()
        JSONObject jsonObject = request.JSON

        Evento evento = Evento.findById(DataUtil.instance.getLong(params.id))

        if(evento) {
            try {
                JsonSlurper jsonSlurper = new JsonSlurper()
                evento.properties = jsonSlurper.parseText(jsonObject.toString())
                if (!evento.validate()) {
                    throw new IllegalArgumentException(evento.errors)
                }

                evento.delete(flush: true, failOnError: true)

                responseJSONObject = EventoUtil.instance.getEventoJSONObject(evento)
                response.status = HttpStatus.OK.value()

            } catch(IllegalArgumentException e) {
                responseJSONObject.put 'errors', e.getMessages(messageSource)
                response.setStatus(e.getHttpCode())
            }
        } else {
            responseJSONObject = NotFoundResponseUtil.instance.createNotFoundResponse(messageSource.getMessage(null, null))
            response.status = HttpStatus.NOT_FOUND.value()
        }
        return responseJSONObject
    }

}
