package rest.api

import grails.core.GrailsApplication
import org.springframework.http.HttpStatus

import javax.xml.bind.DatatypeConverter;
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.Claims;



class AuthInterceptor {

    public AuthInterceptor() {
        println("Construtor auth")
        matchAll().excludes(controller: 'login')
    }


    boolean before() {
        println("before auth")
        println(request)
        String token = request.getHeader("token")
        if(token == null) {
            println("NAO VEIO TOKEN")
        }
        try {
            String key = grailsApplication.config.getProperty('jwt.token.key')
            Jwts.parser().setSigningKey(key).parseClaimsJws(token)
            return true
            //OK, we can trust this JWT

        } catch (Exception e) {
            println("JWT NAO VALIDO")
            response.status = HttpStatus.UNAUTHORIZED.value()
            //don't trust the JWT!
        }
        return false
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
