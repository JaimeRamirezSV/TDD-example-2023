
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from "../plugins/router";

export const router = createRouter( {
    history: createWebHistory(),
    routes: routes,
} );

/**
 * Mount the current components and its dependencies
 */
export function componentFactory( component, props = {} ){
    return mount( 
        component,
        {
            propsData: props,
            global: {
                plugins: [ router ]
            }
        }
    );
}
  