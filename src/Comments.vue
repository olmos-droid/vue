<template>
  <div id="app2">
    <div v-if="isAuthenticated">
      <p>Hello, {{ user.name }} (<router-link to="/logout">Cerrar sessión</router-link>)</p>
      <input v-model="nuevoComentario" placeholder="Deja tu comentario..." @keypress.enter="addComentario">      
    </div>
    <div v-else>
      <p>Debes <router-link to="/login">iniciar sesión</router-link> para dejar un comentario</p>
    </div>
    <p v-for="comentario in comentarios" :key="comentario.id">
      {{ comentario.contenido }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return{
      comentarios: [ { contenido: "Comments are loading... 🥱" }, ],
      nuevoComentario: '',
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated
    }
  },
  async created() {
    this.getComentarios();
    setInterval(this.getComentarios, 2000);
  },
  methods: {
    async getComentarios() {
      this.comentarios = await (await fetch(`/api/get`)).json();
    },
    async addComentario() {
      const token = await this.$auth0.getAccessTokenSilently();
      const comentario = await (await fetch(`/api/add?contenido=${this.nuevoComentario}`,{ headers: { Authorization: `Bearer ${token}`}})).json();
      this.comentarios.push({ contenido: this.nuevoComentario, id: comentario.insertId });
      this.nuevoComentario = '';
    }
  }
}
</script>