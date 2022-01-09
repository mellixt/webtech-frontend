<template>
  <h1>Welcome to your Polls</h1>
  <p style="color:#E1E1E1 ; font-size:80%;" ><b>Image from:</b> https://www.voxco.com/wp-content/uploads/2021/09/Opinion-Polls1.png</p>
  <div class="container-fluid">
  <div class="row row-cols-1 row-cols-md-4 g-4">
   <div class="col" v-for="poll in polls" :key="poll.id">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title" align="left"> <b>{{ poll.title}}</b></h5>
          <p class="card-text" align="left">
            Created by: {{ poll.username }}<br>
            Date: {{ poll.creationDate }}<br>
            Options: "{{ poll.options}}".
          </p>
          <div class="button-div">
            <a id="vote-btn" :href="'/vote-poll/'+poll.id">Vote</a>
            <a id="delete-btn" :href="'/delete/'+poll.id">Delete</a>
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
