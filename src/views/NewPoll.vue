<template>
  <div class="main">
    <h1>Create a new poll</h1>
    <br>
    <br>
    <form action="/" method="POST">
      <div class="form-group">
        <label for="userName">Your name</label>
        <input id="userName" v-model="username" class="form-control" placeholder="Enter name" type="text">
      </div>
      <div class="form-group">
        <label for="pollTitle">Title</label>
        <input id="pollTitle" v-model="title" class="form-control" placeholder="Enter title" type="text">
      </div>
      <div class="form-group">
        <label for="pollOptions">Options</label>
        <input id="pollOptions" v-model="options" class="form-control"
               placeholder="Insert options, please separate options by comma (,)" type="text">
      </div>
      <div class="form-group" style="display: none;">
        <label for="startDate">Start date</label>
        <input id="startDate" v-model="creationDate" class="form-control" type="date">
      </div>
      <div class="form-group">
        <label for="endDate">End date</label>
        <input id="endDate" v-model="endDate" class="form-control" placeholder="Enddatum eingeben" type="date">
      </div>
      <!-- <button class="btn btn-primary" type="submit" @click.prevent="createPolls">Submit</button> -->
      <router-link to="/" tag="button" class="btn btn-primary" type="submit" @click.prevent="createPolls"><b> Submit </b> </router-link>
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
      creationDate: new Date(),
      endDate: new Date()
    }
  },
  methods: {
    createPolls () {
      console.log(this.username)
      console.log(this.title)
      console.log(this.options)
      console.log(this.creationDate)
      console.log(this.endDate)

      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/polls'

      // create string with votes set to null depending on number of options
      let votes = ''
      let numberOfOptions
      try {
        numberOfOptions = this.options.split(',').length
      } catch (error) {
        console.error(error)
      }

      for (let i = 0; i < numberOfOptions; i++) {
        if (i === 0) { votes += '0' } else votes += ',0'
      }

      const payload = JSON.stringify({
        username: this.username,
        title: this.title,
        options: this.options,
        creationDate: (new Date(this.creationDate)).toLocaleDateString('de-DE'),
        endDate: (new Date(this.endDate)).toLocaleDateString('de-DE'),
        votes: votes
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
