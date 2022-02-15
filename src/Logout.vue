<script>
export default {
  created() {
    this.$auth0.logout({
      returnTo: window.location.origin
    });
  }
};
</script>