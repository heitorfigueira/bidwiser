<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="red">
              <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                prepend-icon="mdi-face"
                name="email"
                label="Email"
                type="email"
                v-model.lazy="email"
                :rules="emailRules"
                required
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                required
                v-model.lazy="password"
                :rules="passwordRules"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              color="red darken-4"
              :disabled="!valid"
              @click="submit"
              data-cy="joinSubmitBtn"
              >Entrar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'Esse campo é obrigatório',
                v => /.+@.+/.test(v) || 'Este E-mail não é válido'
            ],
            passwordRules: [
                v => !!v || 'Esse campo é obrigatório',
                v => v.length >= 6 || 'Senhas devem ter mais de 6 caractéres'
            ],
            loading: {
                signInButton: false,
            }
        };
    },
    methods: {
        ...mapActions([
            'signInUser',
            'googleSignIn',
            'facebookSignIn'
        ]),
        submit() {
            this.loading.signInButton = true
            let payload = {
                email: this.email,
                password: this.password
            }
            this.signInUser(payload).then(() => {
                this.$router.push({ name: 'Home' })
            })
        },
        googleLogin() {
            this.loading.signInButton = true
            this.googleSignIn().then(() => {
                this.$router.push({ name: 'Home' })
            })
        },
        facebookLogin() {
            this.loading.signInButton = true
            this.facebookSignIn().then(() => {
                this.$router.push({ name: 'Home' })
            })
        }
    }
};
</script>

<style scoped></style>
