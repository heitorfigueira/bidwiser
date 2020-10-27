<template>
  <v-app id="app">
    <v-main transition="slide-x-transition">
      <v-toolbar dense
        color="grey lighten-1">
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

        <v-toolbar-title>
          <v-btn dark
            color="red darken-4"
            :to="{ name: 'ListaItems' }">
            <b>BIDWiser</b></v-btn>
        </v-toolbar-title>
 
        <v-spacer></v-spacer>

        <v-menu left bottom slide-y-transition>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon
              v-bind="attrs"
              v-on="on">
              <v-icon v-if="isAuthorized">mdi-face</v-icon>
              <v-icon v-else>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(option, index) in menuOptions"
              :to="{ name: option.route }"
              :key="'option ' + index">
              <v-list-item-title>
                <v-icon class="mr-1">{{ option.icon }}</v-icon> {{ option.name }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isAuthorized"
              v-on:click="logout">
              <v-list-item-title>
                <v-icon class="mr-1">mdi-exit-to-app</v-icon> Sair
              </v-list-item-title>
            </v-list-item>
          </v-list>    
        </v-menu>
      </v-toolbar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'App',
    components: {},
    computed: {
      ...mapGetters([
        'isAuthorized'
      ]),
      menuOptions() {
        if (!this.isAuthorized)
          return [
            { route: 'Login', icon: 'mdi-login', name: 'Login'},
            { route: 'Cadastro', icon: 'mdi-account-plus', name: 'Cadastro'},
            { route: 'ListaItems', icon: 'mdi-order-bool-ascending', name: 'Lista de Items'},
            ]
        else
          return [
            { route: 'Perfil', icon: 'mdi-face-profile', name: 'Perfil'},
            { route: 'SubmeterItem', icon: 'mdi-send', name: 'Submeter Item'},
            { route: 'ListaItems', icon: 'mdi-order-bool-ascending', name: 'Lista de Items'},
            { route: '', icon: 'mdi-clipboard-arrow-down', name: 'Lances e Items'}
          ]
      }
    },
    methods: {
      ...mapActions([
        'signUserOut'
      ]),
      logout() {
        this.signUserOut()
      }
    }
};
</script>
