<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(menu, index) in menus" :key="index" @click="goto(menu.path)">
            <v-list-item-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>GorentHub</v-toolbar-title>
      <v-spacer />
      <!-- <v-btn text icon @click="dark = !dark">
        <v-icon>{{ dark ? 'mdi-brightness-4' : 'mdi-brightness-6'}}</v-icon>
      </v-btn> -->
      <v-btn text icon @click="logOut()"><v-icon>mdi-logout</v-icon></v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <div class="flex text-center">
        <span class="lead text--secondary text-center" >
          <a href="" class="text-decoration-none" target="_blank">GorentHub</a>
        </span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase';
import { mapActions } from 'vuex';

export default {
  data: () => ({
    dark: false,
    path: '/admin',
    drawer: null,
    menus: [
      { path: '', title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { path: '/sounds', title: 'Properties', icon: 'mdi mdi-home'},
      { path: '/categories', title: 'Categories', icon: 'mdi mdi-home' },
    ]
  }),
  created() {
    this.dark = this.$vuetify.theme.dark
    this.loadSounds;
    this.loadCategories;
  },
  computed: {
    ...mapActions({
        loadSounds: 'sounds/loadSounds',
        loadCategories: 'categories/loadCategories',
    }),
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({path: '/'});
        });
    },
    goto(newPath) {
      this.$router.push({path: this.path + newPath}).catch(()=>{});
    }
  },
  watch: {
    dark: function() {
      this.$vuetify.theme.dark = this.dark;
    }
  }
}
</script>