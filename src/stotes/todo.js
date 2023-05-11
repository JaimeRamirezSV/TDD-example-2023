import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore( "todo", () => {

  const items = ref( [] );

  const baseItem = ref( {
    id   : "",
    name : ""
  } );
  
  function addItem( item ){
    item.id = Math.random();
    items.value.push( { ...item } );
    baseItem.value.id = "";
    baseItem.value.name = "";
  }

  function updateItem( item ){
    let index = items.value.findIndex( ( row ) => row.id == item.id );
    items.value[ index ] = item;
    baseItem.value.id = "";
    baseItem.value.name = "";
  }

  function removeItem( el ){
    items.value = items.value.filter( ( item ) => item.id !== el.id  );
  }

  return { items, addItem, updateItem, removeItem, baseItem };
} );