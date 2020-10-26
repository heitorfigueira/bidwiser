<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar dark color="red darken-4">
                <v-toolbar-title>Perfil</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" :disabled="!editMode">
                <v-container>
                  <v-row align="center">
                    <v-col cols=6>
                      <v-text-field
                        name="nome"
                        label="Nome*"
                        type="text"
                        v-model.lazy="profile.nome"
                        :rules="requiredRules"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols=6>
                      <v-text-field
                        name="sobrenome"
                        label="Sobrenome*"
                        type="text"
                        v-model.lazy="profile.sobrenome"
                        :rules="requiredRules"
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        name="email"
                        label="Email"
                        type="text"
                        v-model.lazy="profile.email"
                        :disabled="true"
                      >
                      </v-text-field>
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
                            v-model="profile.aniversario"
                            label="Aniversario*"
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
                          v-model="profile.aniversario"
                          :show-current="maxDate"
                          :max="maxDate"
                          @input="dateSelection = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="profile.biografia"
                        auto-grow
                        filled
                        label="Biografia"
                        rows="6"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    dark
                    color="red darken-2"
                    class="ml-3"
                    @click="editMode = true"
                    >Editar</v-btn
                >              
                <v-spacer></v-spacer>
                <v-btn
                    dark
                    color="green"
                    class="ml-3"
                    :disabled="!valid || !editMode"
                    @click="submit"
                    >Salvar</v-btn
                >
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LancesItems',
  data() {
    return {
      dateSelection: false,
      valid: false,
      editMode: false,
      profile: {},
      requiredRules: [
          v => !!v || 'Esse campo é obrigatório'
      ],
    };
  },
  computed: {
    ...mapGetters([
      'fetchProfile',
      'getUser'
    ]),
    maxDate() {
      return new Date().toISOString().substr(0, 10);
    }
  },
  methods: {
    ...mapActions([
      'updateProfile'
    ]),
    submit() {
      this.editMode = false
      let payload = {
        key: this.fetchProfile.key,
        content: this.profile
      }
      this.updateProfile(payload)
    }
  },
  beforeMount() {
    this.profile = this.fetchProfile.content
  }
};
</script>

<style scoped></style>
