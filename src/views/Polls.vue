<template>
  <h1>Welcome to your Polls</h1>
  <div class="container-fluid">
  <div class="row row-cols-1 row-cols-md-4 g-4">
   <div class="col" v-for="poll in polls" :key="poll.id">
      <div class="card h-100">
        <div class="card-body">
          <img src="https://www.voxco.com/wp-content/uploads/2021/09/Opinion-Polls1.png" class="card-img-top" alt="...">
          <h5 class="card-title">{{ poll.title}} von {{ poll.username }}</h5>
          <p class="card-text">
            Der Poll "{{ poll.title }}" von {{ poll.username }} wurde am {{ poll.creationDate }} erstellt und
            hat die Optionen "{{ poll.options}}".
          </p>
          <div class="button-div">
            <a id="vote-btn" :href="'/vote-poll/'+poll.id">Abstimmen</a>
            <a id="delete-btn" :href="'/delete/'+poll.id">Löschen</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Polls',
  data () {
    return {
      polls: []
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/polls'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(poll => {
        this.polls.push(poll)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>
<style scoped>
.button-div {
  display: flex;
  align-items: center;
  justify-content: center;
}
#vote-btn {
  padding: 6px;
  background: lightblue;
  border-radius: 6px;
  border: none;
}
#delete-btn {
  background: transparent;
  border: none;
  color: red;
  padding: 6px;
}
</style>
