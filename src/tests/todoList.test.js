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

describe("notification.vue", () => {
    
    afterEach(  () => {} );
    beforeEach( () => {} );
    beforeAll(  () => router.push( { name : "home" } ) );
    afterAll(   () => {} ); 

    // Happy paths
    it( "Can be rendered", async()=> {
        const wrapper = await componentFactory( todoList );
        expect( wrapper.exists() ).toBeTruthy();
    } );

    it( "can add a new item", async() => {
        const wrapper = componentFactory( todoList );
        const input   = wrapper.find( "input" );
        const save    = wrapper.find( "button[id=save]" );
        const saveSpy = vi.spyOn( wrapper.vm, 'save' );
        input.setValue( "Test 1" );
        await save.trigger( "click" );
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        const liElements = wrapper.findAll( "li" );
        expect( saveSpy ).toHaveBeenCalled();
        expect( liElements[ 0 ].find( "span" ).text() ).toContain( "Test 1" );
    } );

    it( "can edit an item", async () => {
        const wrapper = componentFactory( todoList );
        await wrapper.vm.todoStore.addItem( { id : 2, name : "test2" } );
        await wrapper.findAll( "li" )[ 1 ].findAll( "a" )[ 1 ].trigger( 'click' );
        await wrapper.vm.$nextTick();
        const input = wrapper.find( "input" );
        const save  = wrapper.find( "button[id=save]" );
        input.setValue( "I have been updated!" );
        const saveSpy = vi.spyOn( wrapper.vm, 'update' );
        await save.trigger( "click" );
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        expect( saveSpy ).toHaveBeenCalledOnce();
        expect( wrapper.findAll( "li" )[ 1 ].find( "span" ).text() ).toContain( "I have been updated!" );
    } );

    it( "can remove an item", async () => {
        const wrapper = componentFactory( todoList );
        const removeSpy = vi.spyOn( wrapper.vm, 'remove' );
        await wrapper.findAll( "li" )[ 1 ].findAll( "a" )[ 0 ].trigger( 'click' );
        await wrapper.vm.$nextTick();
        expect( removeSpy ).toHaveBeenCalledOnce();
        expect( wrapper.findAll( "li" ).length ).toBe( 1 );
    } );

    it( "can render a list of items", async() => {
        const wrapper = componentFactory( todoList );
        await wrapper.vm.todoStore.addItem( { id : 2, name : "Test 2" } );
        await wrapper.vm.todoStore.addItem( { id : 3, name : "Test 3" } );
        await wrapper.vm.todoStore.addItem( { id : 4, name : "Test 4" } );
        await wrapper.vm.$nextTick();
        const ul = wrapper.find( "ul" );
        expect( ul.findAll( "li" ).length ).toBe( 4 );
        expect( ul.text() ).toContain( "Test 1" );
        expect( ul.text() ).toContain( "Test 2" );
        expect( ul.text() ).toContain( "Test 3" );
        expect( ul.text() ).toContain( "Test 4" );
    } );

    it( "can render `not found` when there are no records", async () => {
        const wrapper = componentFactory( todoList );
        wrapper.vm.todoStore.items = [];
        await wrapper.vm.$nextTick();
        expect( wrapper.find( "ul" ).find( "li" ).exists() ).toBeFalsy();
        expect( wrapper.text() ).toContain( "Records not found." );
    } );

    // Unhappy paths
    it.todo( "can show an error when an invalid name is filled and try to save it" );

    it.todo( "can show an error when the item name is empty and try to save it" );
} );   