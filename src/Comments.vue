<template>
  <Auth :isAuthenticated="isAuthenticated" :username="user?.name">
    <input v-model="nuevoContenido" placeholder="Deja tu comentario..." @keypress.enter="addComentario">      
  </Auth>
  <Comment v-for="comentario in comentarios" :key="comentario.id" :contenido="comentario.contenido + ' {id:' + comentario.id + '}'" />
</template>

<script>
import Comment from './components/Comment.vue'
import Auth from './components/Auth.vue'

export default {
  components: {
    Comment, Auth
  },
  
  data () {
    return{
      comentarios: [ { contenido: "Comments are loading... 🥱" }, ],
      nuevoContenido: '',
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

      const position = -1 + this.comentarios.push({ contenido: this.nuevoContenido, id: -1 });

      const token = await this.$auth0.getAccessTokenSilently();
      const insertResultado = await (await fetch(`/api/add?contenido=${this.nuevoContenido}`,{ headers: { Authorization: `Bearer ${token}`}})).json();

      console.log(insertResultado)
      this.comentarios[position].id = insertResultado.insertId;

      this.nuevoContenido = '';
    }
  }
}
</script>


<style src="./Comments.css" scoped />