<template>
  <div class="poll__container" v-for="sPoll in poll" :key="sPoll.id">
    <div class="info__container">
      <h1>{{ sPoll.title }}</h1>
      <p>von {{ sPoll.username }}</p>
    </div>
    <div class="options__container">
      <p>Stimme jetzt ab:</p>
      <div class="option" v-for="option in options" :key="option">
        <input type="radio" id="one" name="optionRadios" v-bind:value=option v-model="chosen"> {{ option }}
      </div>
      <router-link to="/polls" tag="button" class="btn btn-primary" type="submit" @click.prevent="vote"><b> Submit </b> </router-link>
      You have selected : {{optionRadios}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Poll',
  data () {
    return {
      poll: [],
      options: [],
      votes: [],
      chosen: ''
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
        // console.log(data)
        this.poll.push(data)
        // console.log(this.poll)
        this.options = this.poll[0].options.split(',')
        this.votes = this.poll[0].votes.split(',')
          .map(number => parseInt(number, 10))
      })
    })
  },
  methods: {
    vote () {
      // rauskriegen welche option gewählt wurde und dementsprechend um 1 erhöhen
      const numberOfOption = this.options.findIndex(element => element === this.chosen)

      // um 1 erhöhen
      this.votes[numberOfOption] += 1
      const voteString = this.votes.join(',')
      console.log('votesstring', voteString)

      // votes wieder zu string convertieren
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/polls/' + this.$route.params.id
      const poll = this.poll[0]
      const payload = JSON.stringify({
        username: poll.username,
        title: poll.title,
        options: poll.options,
        creationDate: poll.creationDate,
        endDate: poll.endDate,
        votes: voteString
      })

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: payload,
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .catch(error => console.log('error', error))
    }

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
</style>
