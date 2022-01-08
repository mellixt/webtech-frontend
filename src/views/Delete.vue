<template>
  <div class="main">
    <h1>Umfrage wurde gelöscht.</h1>
    <a href="/polls">Zurück zu allen Umfragen</a>
  </div>
</template>

<script>
export default {
  name: 'Delete',
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/polls/' + this.$route.params.id
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(data)
      })
    })
  }
}
</script>

<style scoped>

</style>
