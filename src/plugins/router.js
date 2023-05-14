import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { 
        path : '', 
        component   : () => import( "../layouts/mainLayout.vue" ),
        children : [ {
            name : "todo",
            component: () => import( '../pages/todoList.vue' ),
            path : ""
        } ] 
    }
]

const router = createRouter( {
    routes,
    history: createWebHistory()
} )

export default router

export { routes }