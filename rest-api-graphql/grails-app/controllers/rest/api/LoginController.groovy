package rest.api


import grails.rest.*
import grails.converters.*

class LoginController {

	static responseFormats = ['json']

    static allowedMethods = [
            login : "POST"
    ]

    LoginService loginService

    def login(){
        render loginService.login(request, response)
    }
}
