<template>
  <div class="poll__container" v-for="sPoll in poll" :key="sPoll.id">
    <div class="info__container">
      <h1>{{ sPoll.title }}</h1>
      <p>von {{ sPoll.username }}</p>
    </div>
    <div class="options__container">
      <br>
      <p>Stimme jetzt ab:</p>
      <div class="option" v-for="option in pollOptions" :key="option">
        <input type="radio" id="one" name="optionRadios" v-bind:value=option v-model="chosen"> {{ option }}
      </div>
      <router-link to="/polls" tag="button" class="btn btn-primary " type="submit" @click.prevent="vote"><b> Submit </b> </router-link>
      <br>
    <span class="badge bg-success" @mouseover="hover = true" @mouseleave="hover = false" >
      ERGEBNISSE
    </span>
      <table v-if="hover"  align="left" class="table-bordered">
         <tr>
           <th> Option </th>
           <th> Stimmen </th>
         </tr>
          <tr v-for="(option, index) in pollOptions" :key="option">
            <th> {{ option }} </th>
            <th>{{ votes[index] }} </th>
          </tr>
      </table>
      <br>
      <button type="button" class="btn-clipboard" title="" data-bs-original-title="Copy to clipboard"  @click.prevent="copyURL">Teile deine Umfrage</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Poll',
  data () {
    return {
      // our vars
      hover: false,
      poll: [],
      pollOptions: [],
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
        this.pollOptions = this.poll[0].options.split(',')
        this.votes = this.poll[0].votes.split(',')
          .map(number => parseInt(number, 10))
      })
    })
  },
  methods: {
    vote () {
      // rauskriegen welche option gewählt wurde und dementsprechend um 1 erhöhen
      const numberOfOption = this.pollOptions.findIndex(element => element === this.chosen)

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
    },
    copyURL () {
      const copyText = 'localhost:3000/vote-poll/' + this.$route.params.id
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText)

      /* Alert the copied text */
      alert('Copied the text: ' + copyText)
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
}
.option {
  padding: 6px 0px;
}
</style>
