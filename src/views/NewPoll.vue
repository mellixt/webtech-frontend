<template>
  <div class="main">
    <h1>Create a new poll</h1>
    <form method="POST" action="/">
      <div class="form-group">
        <label for="userName">Dein Name</label>
        <input type="text" class="form-control" id="userName" placeholder="Name eingeben" v-model="username">
      </div>
      <div class="form-group">
        <label for="pollTitle">Titel</label>
        <input type="text" class="form-control" id="pollTitle" placeholder="Titel eingeben" v-model="title">
      </div>
      <div class="form-group">
        <label for="pollOptions">Optionen</label>
        <input type="text" class="form-control" id="pollOptions" placeholder="Optionen eingeben, durch Komma (,) getrennt" v-model="options">
      </div>
      <div class="form-group">
        <label for="startDate">Startdatum</label>
        <input type="date" class="form-control" id="startDate" v-model="creationDate">
      </div>
      <div class="form-group">
        <label for="endDate">Enddatum</label>
        <input type="date" class="form-control" id="endDate" placeholder="Enddatum eingeben" v-model="endDate">
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="createPolls">Submit</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'NewPoll',
  data () {
    return {
      username: '',
      title: '',
      options: '',
      creation_date: Date.now(),
      end_date: Date.now()
    }
  },
  methods: {
    createPolls () {
      console.log(this.username)
      console.log(this.title)
      console.log(this.options)
      console.log(this.creationDate)
      console.log(this.endDate)

      let voteString = ''
      const optionQty = this.options.split(',').length
      for (let i = 0; i < optionQty; i++) {
        if (i === optionQty - 1) {
          voteString += '0'
        } else {
          voteString += '0,'
        }
      }

      console.log(voteString)

      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/polls'

      const payload = JSON.stringify({
        username: this.username,
        title: this.title,
        options: this.options,
        creationDate: this.creationDate,
        endDate: this.endDate,
        votes: voteString
      })

      const requestOptions = {
        method: 'POST',
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
  .main {
    padding: 0px 100px;
  }
  .form-group {
    margin-bottom: 24px;
  }
</style>
