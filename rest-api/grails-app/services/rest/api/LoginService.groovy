package rest.api

import grails.core.GrailsApplication
import grails.gorm.transactions.Transactional
import io.jsonwebtoken.JwtBuilder
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.apache.catalina.connector.RequestFacade
import org.apache.commons.codec.digest.DigestUtils
import org.grails.web.json.JSONObject
import org.springframework.context.MessageSource
import org.springframework.http.HttpStatus

import javax.servlet.http.HttpServletResponse

@Transactional
class LoginService {

    GrailsApplication grailsApplication
    MessageSource messageSource

    JSONObject login(RequestFacade request, HttpServletResponse response) {

        JSONObject responseJSONObject = new JSONObject()

        String username = request.JSON.username as String
        String password = request.JSON.password as String

        println(username + " " +password)

        try{
            if (!username) {
                response.status = HttpStatus.BAD_REQUEST.value()
                throw new Exception()
            }

            if (!password) {
                response.status = HttpStatus.BAD_REQUEST.value()
                throw new Exception()
            }


            User user = User.findByUsername(username)
            println(user.username)
            println(user.password)
            println(DigestUtils.md5Hex(password))
            if (!user || user.password != DigestUtils.md5Hex(password)) {
                response.status = HttpStatus.UNAUTHORIZED.value()
                throw new Exception()
            }

//            user.save(flush: true, failOnError: true)

            responseJSONObject = new JSONObject([
                    'username': user.username,
                    'token': getToken(username),
                    'id': user.id,
            ])
        } catch (Exception e) {
            responseJSONObject.put('errors', 'Usuário não encontrado')
            response.setStatus(HttpStatus.UNAUTHORIZED.value())
        }

        println(responseJSONObject)
        return responseJSONObject
    }

    private String getToken(String username) {
        String key = grailsApplication.config.getProperty('jwt.token.key')
        long expirationTime = grailsApplication.config.getProperty('jwt.token.expirationTime') as long

        long nowMiliSeconds = System.currentTimeMillis()
        Date now = new Date(nowMiliSeconds)

        JwtBuilder builder = Jwts.builder()
                .setIssuedAt(now)
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS256, key)
                .setExpiration(new Date(nowMiliSeconds + expirationTime))

        return builder.compact()
    }
}
