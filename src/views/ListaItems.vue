<template>
  <v-container>
    <v-card>
      <v-toolbar dark
        color="red">
        <v-toolbar-title>Itens do Leilão</v-toolbar-title>
      </v-toolbar>
      <v-list three-line>
        <template v-for="(item, index) in getItemListFiltered">
          <list-item :key="'item ' + index"
            :index="index">
          </list-item>
          <v-divider :key="'divider' + index"></v-divider>
        </template>
      </v-list>
    </v-card>

  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ListItem from './ListItem'

export default {
  name: 'ListaItems',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'getItemList',
      'getItemListFiltered'
    ])
  },
  methods: {
    ...mapActions([
      'signUpUser',
      'fetchItemList'
    ])
  },
  components: {
    ListItem
  },
  beforeMount() {
    this.fetchItemList()
  }
};
</script>

<style scoped></style>
