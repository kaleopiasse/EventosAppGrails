package rest.api

import org.grails.web.json.JSONArray
import org.grails.web.json.JSONObject

@Singleton
class UserUtil {

    JSONObject getUserJSONObject(User user) {
        JSONObject userJSONObject = new JSONObject(
                [
                        'id': user.id,
                        'username': user.username,
                        'password': user.password
                ]
        )
        return userJSONObject
    }

    JSONObject getUserJSONObjectArray(List<User> users) {

        JSONObject responseJSONObject = new JSONObject()
        JSONArray usersJSONArray = new JSONArray()

        users.each { User user ->
            JSONObject userJSONObject = new JSONObject()
            userJSONObject = getUserJSONObject(user)

            usersJSONArray.put(userJSONObject)
        }
        return responseJSONObject.put('users', usersJSONArray)
    }
}
