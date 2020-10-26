<template>
  <v-container  fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar dark color="red darken-4">
                <v-toolbar-title>Submeter Item para Leilão</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-container>
                  <v-row align="center">
                    <v-col>
                      <v-text-field
                        name="nome"
                        label="Nome do item*"
                        type="text"
                        v-model.lazy="item.name"
                        :rules="requiredRules"
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col cols="1">
                      <v-checkbox
                        v-model="item.minimal"
                        hide-details
                        class="shrink mr-0 mt-0"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        :disabled="!item.minimal"
                        label="Lance mínimo inicial"
                        v-model="item.minimalValue"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1">
                      <v-checkbox
                        v-model="item.desired"
                        hide-details
                        class="shrink mr-0 mt-0"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        :disabled="!item.desired"
                        label="Valor desejado"
                        v-model="item.desiredValue"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-menu
                        v-model="dateSelection"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="item.expireDate"
                            label="Data de expiração*"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="requiredRules"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          color="red darken-2"
                          v-model="item.expireDate"
                          :show-current="minDate"
                          :min="minDate"
                          @input="dateSelection = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                  </v-row>
                  <v-row>
                    <v-col cols=6>
                      <v-textarea
                        v-model="item.description"
                        auto-grow
                        filled
                        label="Descrição do item*"
                        rows="6"
                        required
                        :rules="requiredRules"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="6" align-self="center">
                      <v-dialog
                        ref="dialog"
                        v-model="imageSelection"
                        :return-value.sync="item.imageUrl"
                        persistent
                        width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-img v-if="item.imageUrl != ''"
                            v-bind="attrs" v-on="on"
                            :src="item.imageUrl">
                          </v-img>
                          <v-icon v-else
                            v-bind="attrs" v-on="on">mdi-file-image</v-icon>
                        </template>
                        <v-card>
                          <v-card-text>
                            <v-text-field
                              v-model="item.imageUrl"
                              label="URL da imagem"
                              prepend-icon="mdi-file-image"
                            ></v-text-field>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn
                              text
                              color="red"
                              @click="imageSelection = false"
                            >
                              Cancelar
                            </v-btn>
                            <v-btn
                              text
                              color="red"
                              @click="$refs.dialog.save(item.imageUrl)"
                            >
                              OK
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    dark
                    color="red darken-2"
                    class="ml-3"
                    :disabled="!valid"
                    @click="submit"
                    >Submeter</v-btn
                >
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {  
    return {
      valid: false,
      item: {
        name: '',
        minimal: false,
        minimalValue: null,
        desired: false,
        desiredValue: null,
        expireDate: this.minDate,
        imageUrl: '',
      },
      requiredRules: [
          v => !!v || 'Esse campo é obrigatório'
      ],
      imageSelection: false,
      dateSelection: false
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ]),
    minDate() {
      var date = new Date();
      date.setDate(date.getDate() + 7);
      return date.toISOString().substr(0, 10);
    }
  },
  methods: {
    ...mapActions([
      'createItem'
    ]),
    submit() {
      let payload = {
        ...this.item,
        email: this.getUser.email,
        lances: [],
        lanceMaximo: this.item.minimal ? this.item.minimalValue : 0
      }
      this.createItem(payload)
    }
  }
}
</script>