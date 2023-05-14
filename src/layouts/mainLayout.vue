<template>
    <header class="bg-gray-900 h-10">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="" />
                </a>
            </div>
            <div class="flex lg:hidden">
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400" @click="mobileMenuOpen = true">
                <span class="sr-only">Open main menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm font-semibold leading-6 text-white">{{ item.name }}</a>
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <a href="https://www.intothebox.org/" class="text-sm font-semibold leading-6 text-white"> ITB - 2023 <span aria-hidden="true">&rarr;</span></a>
            </div>
        </nav>
    </header>
    <router-view class="bg-gray-800"/>
</template>

<script setup>
import { ref } from 'vue';

const navigation = [
  { name: 'List', href: '#' },
  { name: 'Vue', href: 'https://vuejs.org/' },
  { name: 'Vite', href: 'https://vitejs.dev/' },
  { name: 'Vitest', href: 'https://vitest.dev/' }
];

const mobileMenuOpen = ref( false );
</script>

<style>
.h-10 {
    height: 10vh !important;
 }
</style>