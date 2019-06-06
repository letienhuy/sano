import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

export class Validation{
    validateAll(data, message){
            let errors = {};
            Object.keys(data).forEach((key, index) => {
            if(_.isEmpty(data[key]) || _.isNull(data[key])){
                errors[key] = message[index];
            }
        });
        if(Object.keys(errors).length) return errors;
        return true;
    }
    error(name, errors){
        if(errors && errors[name])
            return <span className="error">{errors[name]}</span>;
    }
}

$(document).on('click', (event) => {
    let actionMenu = $('.action-menu');
    let btnAction = $('.btn-action');
    let toggleNavigation = $('.toggle-navigation');
    let sidebar = $('.sidebar');
    if(!actionMenu.is(event.target) && !btnAction.is(event.target)){
        actionMenu.removeClass('active');
    }
    if(!sidebar.is(event.target) && !toggleNavigation.is(event.target) && !toggleNavigation.children(event.target)){
        sidebar.removeClass('sidebar-active');
        toggleNavigation.removeClass('toggled');
    }
})

$(document).on('click', '.btn-action', function(event){
    let actionMenu = $(this).parent().find('.action-menu');
    actionMenu.toggleClass('active');
});