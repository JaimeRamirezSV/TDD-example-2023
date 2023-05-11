
import pinia from "../plugins/pinia";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from "../plugins/router";

export const router = createRouter( {
    history: createWebHistory(),
    routes: routes,
} );

export function componentFactory( component, props = {} ){
    setActivePinia( createPinia() );
    return mount( 
        component,
        {
            propsData: props,
            global: {
                plugins: [ router, pinia ]
            }
        }
    );
}