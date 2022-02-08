<template>
  <div id="app">
    <input v-model="nuevoComentario" placeholder="Deja tu comentario..." @keypress.enter="addComentario">
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
      comentarios: [
        { contenido: "First comment" },
        { contenido: "Second comment" },
        { contenido: "Comments are loading... 🥱" },
      ],
      nuevoComentario: ''
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
      const comentario = await (await fetch(`/api/add?contenido=${this.nuevoComentario}`)).json();
      this.comentarios.push({ value: this.nuevoComentario, id: comentario.insertId });
      this.nuevoComentario = '';
    }
  }
}
</script>

<style>
#app {
  font-family: sans-serif;
  text-align: center;
}
</style>