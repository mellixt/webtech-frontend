<template>
  <div class="poll__container" v-for="sPoll in poll" :key="sPoll.id">
    <div class="info__container">
      <h1>{{ sPoll.title }}</h1>
      <p>von {{ sPoll.username }}</p>
    </div>
    <div class="options__container">
      <p>Stimme jetzt ab:</p>

      <div class="option" v-for="idx in sPoll.options.split(',').length" :key="idx">
        <h3 class="optionText">{{ sPoll.options.split(',')[idx - 1] }}</h3>
        <p class="votes">{{ sPoll.votes.split(',')[idx - 1] }} Stimmen</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Poll',
  data () {
    return {
      poll: []
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/polls/' + this.$route.params.id
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(data)
        this.poll.push(data)
        console.log(this.poll[0])
      })
    })
  }
}
</script>

<style scoped>
.poll__container {
  padding: 48px;
}
.info__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.options__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10vh;
}
.option {
  padding: 6px 0px;
}
.optionText {
  text-transform: capitalize;
}
.votes {
  text-align: left;
}
</style>
