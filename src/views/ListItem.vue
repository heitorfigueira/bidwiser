<template>
  <v-list-item>
    <v-list-item-avatar v-if="item.content.imageUrl">
      <v-img :src="item.content.imageUrl"></v-img>
    </v-list-item-avatar>
    <v-list-item-icon v-else><v-icon>mdi-file-image</v-icon></v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title v-html="item.content.name"></v-list-item-title>
      <v-list-item-subtitle v-html="item.content.description"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-dialog
        ref="dialog"
        v-model="bidDialog"
        :return-value.sync="item.content.imageUrl"
        persistent
        width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on"
            color="red lighten-1">
            <b>BID!</b>
          </v-btn>
        </template>

        <v-form ref="form" v-model="valid">
          <v-card width="600">
            <v-toolbar dark
              color="red">
              <v-toolbar-title>{{ itemTitle }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col col="6">
                  <v-img v-if="item.content.imageUrl != ''"
                    :src="item.content.imageUrl">
                  </v-img>
                  <v-icon v-else>mdi-file-image</v-icon>
                </v-col>
                <v-col col="6">
                  <v-row>
                    <v-col>
                      <b>Maior lance: </b>
                    </v-col>
                    <v-col>
                      {{ biggestBidValue() }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <b>Autor do Lance: </b>
                    </v-col>
                    <v-col>
                      {{ biggestBid().author }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <b>Data de expiração: </b>
                    </v-col>
                    <v-col>
                      {{ item.content.expireDate }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      {{ item.content.description }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="red"
                @click="bidDialog = false"
              >
                Cancelar
              </v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                width="100"
                class="anti-arrow"
                label="Novo lance"
                v-model.lazy="newBid"
                type="number"
                required
                :rules="bidRules">
              </v-text-field>
              <v-btn
                class="ml-4"
                color="red"
                :disabled="!valid || !isAuthorized || authorBiggestBid || itemAuthor" 
                @click="bid">
                BID
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ListItem',
  data() {
    return {
      bidDialog: false,
      newBid: this.biggestBidValue(),
      valid: false,
      bidRules: [
          v => v > 0 || 'O novo lance tem que ser maior que 0.',
          v => !!v || 'O lance tem que ser maior que 0.',
          v => v > this.biggestBidValue() || 'O novo lance tem que ser superior ao maior lance atual.',
      ],
    }
  },
  props: {
    index: Number
  },
  computed: {
    ...mapGetters([
      'isAuthorized',
      'getUser'
    ]),
    item() {
      return this.$store.getters.getItemListFiltered[this.index]
    },
    authorBiggestBid() {
      return this.getUser.email == this.biggestBid().author
    },
    itemAuthor() {
      return this.getUser.email == this.$store.getters.getItemListFiltered[this.index].content.email
    },
    itemTitle() {
      return this.$store.getters.getItemListFiltered[this.index].content.name + ' (' + this.$store.getters.getItemListFiltered[this.index].content.email + ')'
    }
  },
  methods: {
    ...mapActions([
      'sendNewBid'
    ]),
    bid() {
      let addBid = {
        value: this.newBid,
        date: new Date().toISOString(),
        author: this.getUser.email
      }
      let newItem = this.item
      newItem.content.lances.push(addBid)
      this.sendNewBid(newItem)
      this.bidDialog = false
    },
    biggestBid() {
      if (this.item.content.lances && this.item.content.lances.length > 0)
        return this.item.content.lances.find((bid) => bid.value == this.biggestBidValue())
      else
        return {
          value: 0,
          author: ''
        }
    },
    biggestBidValue() {
      if (this.item && this.item.content.lances && this.item.content.lances.length > 0)
        return Math.max.apply(Math, this.item.content.lances.map((lance) => { return lance.value; }))
      else if (this.item && this.item.content.minimal)
        return this.item.content.minimalValue
      else 
        return 0
    }
  }
}
</script>
<style lang="scss">
.anti-arrow input[type='number'] {
    -moz-appearance:textfield;
}
.anti-arrow input::-webkit-outer-spin-button,
.anti-arrow input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>