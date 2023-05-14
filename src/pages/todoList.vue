<template>
    <section class="w-screen h-90 pt-16"> 
        <!-- Confirm -->
        <div v-if="isRevealed" class="modal-layout bg-white w-4/12 mx-auto rounded-md p-4">
            <div class="modal text-right">
                <h1 class="text-left">Would you like to delete this item?</h1>
                <button 
                    @click="cancel( true )" 
                    id="cancel"
                    class="mt-2.5 inline-block rounded-md bg-red-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mr-4"
                > 
                    Cancel
                </button>
                <button 
                    @click.stop="confirm( true )" 
                    id="confirm"
                    class="mt-2.5 inline-block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Yes
                </button>
            </div>
        </div>
        
        <!-- List -->
        <section 
            v-if="!showForm" 
            class="w-8/12 mx-auto bg-gray-800 px-3 py-3 rounded-md"
        >
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <h1 class="text-xl font-semibold leading-6 text-white">List</h1>
                    </div>
                    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button 
                            id="add"
                            @click="showForm = !showForm" 
                            v-if="!showForm"
                            class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div class="mt-8 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white" v-if="todoStore.items.length">
                                <tr  
                                    v-for="( item, index ) in todoStore.items" 
                                    :key="index" 
                                >
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.name }}</td>
                                    <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium sm:pr-3">
                                        <a 
                                            href="#" 
                                            class="font-medium text-indigo-600 hover:text-indigo-500 mr-4" 
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
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="text-center bg-white">
                                    <td colspan="2" class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-red-500 sm:pl-6">
                                        Record not found
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <!-- Form -->
        <form 
            v-if="showForm" 
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
                    @click="form.id != '' ? update( form ) : save( form )" 
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
import { ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import { useConfirmDialog } from "@vueuse/core";
const {
  isRevealed,
  reveal,
  confirm,
  cancel,
} = useConfirmDialog();

const toast = useToast(); 
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
        toast( "Item added!" );
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
            toast.success( "Item updated!" );
        }
        } );
}

function edit( item = {} ){
    form.value = { ...item };
    showForm.value = true;
}

async function remove( item = {} ){
    const { data, isCanceled } = await reveal();
    if ( !isCanceled ) {
        todoStore.removeItem( item );
        toast.success( "Item removed!" );
    }
}

onMounted( () => { 
    form.value = { ...todoStore.baseItem }; 
} );
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

.h-90 {
    height: 91vh !important;
 } 
</style>