package rest.api

import grails.databinding.BindingFormat

class Evento {

    //Integer id
    String titulo
    @BindingFormat('dd/MM/yyyy')
    Date data
    String horaInicio
    String horaFim
    String descricao
    User user

    static belongsTo = [user: User]

    static constraints = {
        //id nullable: false, blank: false
        user nullable: false, blank:false
        data nullable: false, blank: true
        titulo nullable: false, blank: false
        horaInicio nullable: false, blank: false
        horaFim nullable: false, blank: false
        descricao nullable: false, blank: false
    }
}