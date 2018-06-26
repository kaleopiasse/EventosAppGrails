package rest.api

import grails.gorm.transactions.Transactional
import org.grails.web.json.JSONObject
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus

import javax.servlet.http.HttpServletResponse

@Transactional
class UserService {

    MessageSource messageSource

    def serviceMethod() {

    }

    def findAllOrderByName(HttpServletResponse response) {
        JSONObject responseJSONObject = new JSONObject()
        try {
            List<User> users = User.findAll().sort( { it.username.toLowerCase() } )
            //List<Evento> eventos = Evento.findAll(sort:"data", order:"asc")
            responseJSONObject = UserUtil.instance.getUserJSONObjectArray(users)
            response.status = HttpStatus.OK.value()
        } catch(IllegalArgumentException e) {
            responseJSONObject.put('errors', e.getMessages(messageSource))
            response.setStatus(e.getHttpCode())
        }
        return responseJSONObject
    }
}
