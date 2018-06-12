package rest.api

import org.grails.web.json.JSONArray
import org.grails.web.json.JSONObject

import java.text.SimpleDateFormat

@Singleton
class EventoUtil {

    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy")

    JSONObject getEventoJSONObject(Evento evento) {
        JSONObject eventoJSONObject = new JSONObject(
                [
                        'id': evento.id,
                        'titulo': evento.titulo,
                        'data': sdf.format(evento.data),
                        'horaInicio': evento.horaInicio,
                        'horaFim': evento.horaFim,
                        'descricao': evento.descricao
                ]
        )
        return eventoJSONObject
    }

    JSONObject getEventoJSONObjectArray(List<Evento> eventos) {

        JSONObject responseJSONObject = new JSONObject()
        JSONArray eventosJSONArray = new JSONArray()

        eventos.each { Evento evento ->
            JSONObject eventoJSONObject = new JSONObject()
            eventoJSONObject = getEventoJSONObject(evento)

            eventosJSONArray.put(eventoJSONObject)
        }
        return responseJSONObject.put('eventos', eventosJSONArray)
    }
}
