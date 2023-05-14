import { 
    afterAll, 
    afterEach, 
    beforeAll, 
    beforeEach, 
    describe, 
    expect, 
    it,
    vi
} from "vitest";
import todoList from "../pages/todoList.vue"
import { componentFactory, router } from "./baseTests.js";
import { setActivePinia, createPinia } from 'pinia';

describe("notification.vue", () => {
    let wrapper = null;
    
    afterEach(  async () => { 
        // Reset environment
        await wrapper.unmount(); 
        await setActivePinia( null );
    } );
    beforeEach( async () => { 
        // Setup environmen
        setActivePinia( createPinia() );
        wrapper = await componentFactory( todoList ); 
    } );

    beforeAll(  () => router.push( { name : "todo" } ) );
    afterAll(   () => {} ); 

    // Happy paths
    it( "Can be rendered", async() => {
        expect( wrapper.exists() ).toBeTruthy();
    } );

    it( "can add a new item", async() => {
        await wrapper.find( "button[id=add]").trigger( "click" );
        const input   = wrapper.find( "input" );
        const save    = wrapper.find( "button[id=save]" );
        const saveSpy = vi.spyOn( wrapper.vm, 'save' );
        await input.setValue( "Test 1" );
        await save.trigger( "click" );
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        const tbody = wrapper.find( "tbody" );
        expect( saveSpy ).toHaveBeenCalled();
        expect( tbody.text() ).toContain( "Test 1" );
    } );

    it( "can edit an item", async () => {
        await wrapper.vm.todoStore.addItem( { id : 2, name : "Test to edit" } );
        const saveSpy = vi.spyOn( wrapper.vm, 'update' );
        const tbody = wrapper.find( "tbody" );
        const edit =  tbody.findAll( "td" )[ 1 ].findAll( "a" )[ 1 ];
        await edit.trigger( "click" ); 
        const input = wrapper.find( "input" );
        const save  = wrapper.find( "button[id=save]" );
        await input.setValue( "I have been updated!" );
        await save.trigger( "click" ); 
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        expect( saveSpy ).toHaveBeenCalledOnce();
        expect( wrapper.find( "tbody" ).text() ).toContain( "I have been updated!" );
    } );

    it( "can remove an item", async () => {
        await wrapper.vm.todoStore.addItem( { id : 6, name : "Element to delete" } );
        const removeSpy = vi.spyOn( wrapper.vm, 'remove' );
        const tbody = wrapper.find( "tbody" );
        const deleteBTN = tbody.findAll( "td" )[ 1 ].findAll( "a" )[ 0 ];
        await deleteBTN.trigger( "click" );
        await wrapper.find( "button[id=confirm]").trigger( "click" );
        expect( removeSpy ).toHaveBeenCalledOnce();
        expect( wrapper.find( "tbody" ).text() ).toContain( "Record not found" );
    } );

    it( "can render a list of items", async() => {
        await wrapper.vm.todoStore.addItem( { id : 5, name : "Test 2" } );
        await wrapper.vm.todoStore.addItem( { id : 6, name : "Test 3" } );
        await wrapper.vm.todoStore.addItem( { id : 7, name : "Test 4" } );
        const tbody = wrapper.find( "tbody" );
        expect( tbody.findAll( "tr" ).length ).toBe( 3 );
        expect( tbody.text() ).toContain( "Test 2" );
        expect( tbody.text() ).toContain( "Test 3" );
        expect( tbody.text() ).toContain( "Test 4" );
    } );

    it( "can render `Record not found` when there are no records", async () => {
        wrapper.vm.todoStore.items = [];
        expect( wrapper.find( "tbody").text() ).toContain( "Record not found" );
    } );

    // Unhappy paths
    /* it( "can show an error when an invalid name is filled and try to save it", async () => {
        expect( wrapper.text() ).toContain( "Please use more than 4 characters." );
    } ); */

    /* it( "can show an error when the item name is empty and try to save it", async () => {
        expect( wrapper.text() ).toContain( "Field is required." );
    } ); */
} );   