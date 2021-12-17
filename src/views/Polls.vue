<template>
  <h1>Welcome to your Polls</h1>
  <div class="container-fluid">
  <div class="row row-cols-1 row-cols-md-4 g-4">
   <div class="col" v-for="poll in polls" :key="poll.id">
      <div class="card h-100">
        <div class="card-body">
          <img src="https://www.voxco.com/wp-content/uploads/2021/09/Opinion-Polls1.png" class="card-img-top" alt="...">
          <h5 class="card-title">{{ poll.title}} {{ poll.name }}</h5>
          <p class="card-text">
            Der Poll "{{ poll.title }}" von {{ poll.username }} wurde am {{ poll.creationDate }} erstellt und
            hat {{ poll.options.length }} Optionen.
          </p>
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
      polls: [
        {
          id: 1,
          title: 'Wann könnt ihr?',
          username: 'timtomthomas',
          creationDate: '12.12.2021',
          endDate: '18.12.2021',
          options: [
            '16.12.21',
            '17.12.21',
            '18.12.21'
          ]
        },
        {
          id: 1,
          title: 'Wo treffen wir uns?',
          username: 'timtomthomas',
          creationDate: '12.12.2021',
          endDate: '16.12.2021',
          options: [
            'draußen',
            'zuhause'
          ]
        }
      ]
    }
  }
}
</script>
<style scoped>

</style>
