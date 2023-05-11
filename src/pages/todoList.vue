<template>
    <section class="w-screen h-screen flex items-center">    
        <!-- List -->
        <section v-if="!showForm" class="w-4/12 mx-auto bg-gray-100 px-3 py-3 rounded-md">
            <div class="flex justify-between">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 mb-2.5">
                    Items
                </h2>
                <button 
                    @click="showForm = !showForm" 
                    v-if="!showForm"
                    class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add
                </button>
            </div>
            
            <ul v-show="!showForm">
                <li 
                    v-for="( item, index ) in todoStore.items" 
                    :key="index" 
                    class="flex justify-between"
                >
                    <span class="item"> {{ index + 1 }} - {{  item.name  }} </span>
                    <a 
                        href="#" 
                        class="font-medium text-indigo-600 hover:text-indigo-500" 
                        @click="remove( item )"
                    >
                        Delete
                    </a>
                    <a
                        href="#" 
                        class="font-medium text-indigo-600 hover:text-indigo-500" 
                        @click="edit( item )"
                    >
                        Edit
                    </a>
                </li>
            </ul>

            <section v-if="!todoStore.items.length" class="text-red-500 text-center">
                Records not found.
            </section>
        </section>

        <!-- Form -->
        <form 
            v-show="showForm" 
            @submit.prevent 
            class="w-4/12 mx-auto bg-gray-100 px-3 py-3 rounded-md"
        >
            <h2 
                class="text-3xl font-bold tracking-tight text-gray-900 mb-2.5"
            >
                {{ form.id != '' ? "Update" : "Create" }} item
            </h2>

            <div>
                <label 
                    for="name" 
                    class="block text-sm font-semibold leading-6 text-gray-900">
                        Name
                </label>
                <div class="mt-2.5">
                    <input 
                        type="text" 
                        name="name" 

                        id="name" 
                        autocomplete="given-name" 
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                        v-model="$vuelidate.form.name.$model"
                    />
                    <span 
                        v-if="$vuelidate.form.name.$error"
                        v-text="$vuelidate.form.name.$errors[ 0 ]?.$message"
                        class="block text-red-500 mt-1 text-sm"
                    />
                </div>
            </div>

            <div class="flex justify-between gap-x-10">
                <button 
                    id="save"
                    class="mt-2.5 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click.stop="form.id != '' ? update( form ) : save( form )" 
                > 
                    Save 
                </button>

                <button 
                    id="cancel"
                    class="mt-2.5 block w-full rounded-md bg-red-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    @click.stop="showForm = false;  $vuelidate.$reset();" 
                > 
                    Cancel
                </button>

            </div>
        </form>
    </section>
</template>

<script setup>
import { useTodoStore } from "../stotes/todo";
import { ref, reactive, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";

const todoStore = useTodoStore();
const showForm = ref( false ); 
const form = ref( {
    id : "",
    name : ""
} );

// Implement validations using vuelidate
const rules = {
    form : { 
        name : { 
            required  : helpers.withMessage( "Field is required.", required ), 
            minLength : helpers.withMessage( "Please use more than 4 characters.", minLength( 5 ) ), 
            maxLength : helpers.withMessage( "Please use less than 26 characters.", maxLength( 25 ) )
        }
    }
};
const $vuelidate = useVuelidate( rules, { form } );

async function save( item = {} ){
    await $vuelidate.value.$validate()
    .then( ( isValid ) => {
      if( isValid ){ 
        todoStore.addItem( form.value ); 
        showForm.value = false;
        form.value = { ...todoStore.baseItem };
        $vuelidate.value.$reset();
      }
    } );
}


async function update( item = {} ){
    await $vuelidate.value.$validate()
    .then( ( isValid ) => {
      if( isValid ){ 
        todoStore.updateItem( form.value ); 
        showForm.value = false;
        form.value = { ...todoStore.baseItem };
        $vuelidate.value.$reset();
      }
    } );
}

function edit( item = {} ){
    form.value = { ...item };
    showForm.value = true;
}

function remove( item = {} ){
    todoStore.removeItem( item )
}

onMounted( () => { form.value = { ...todoStore.baseItem }; } );
</script>

<style>
 .ml-3{
    margin-left: 3rem ;
 }

 input {
    height: 1.85rem;
 }

 .item {
    display: inline-block;
    width: 20em;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
 }

 li {
    list-style-type: none;
    padding-top: 1rem;
 }
</style>