<template>
  <div class="m-padded-tb-big m-container">
    <div class="ui container">
      
      <!-- 归档内容 -->
      <div class="m-margin-top-small" v-for="year in archives" :key="year.year">
        <h2 class="ui gray header center aligned">{{year.year}}</h2>
        <div class="ui segment attached" v-for="i in year.children" :key="i.phid">
          <div class="ui two column grid">
            <div class="column">
              <a  target="_blank" @click="gotopage(i.phid)">{{i.title}} </a>
              
            </div>

            <div class="right aligned column">
             <a target="_blank" class="ui basic blue label m-padded-mini m-text">{{i.date}}</a>
              <a target="_blank" class="ui basic gray label m-padded-mini m-text">{{i.typename}}</a>
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
export default {
  //     computed:{
  // month_year:() =>{
  //     return this.month.filter((m) =>{
  //  m.year = y
  //     })
  // }

  created() {
    this.getarchive();
  },
  data() {
    return {
      archives: [],
      year: [],
      month: []
    };
  },
  methods: {
    async getarchive() {
      const results = await this.$http.get("/art/archive");

      this.archives = results.data;

    },
    gotopage(phid){
 this.$router.push({
        path: `page/${phid}`
      });
    }
  }
};
</script>

<style>
</style>