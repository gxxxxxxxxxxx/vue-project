<template>
  <div class="m-padded-tb-big m-container animated fadeInUp">
    <div class="ui container">
      <form action="#" class="ui segment form">
        <div class="inline fields">
          <div class="filed">
            <input type="text" name="title" placeholder="标题" />
          </div>

          <div class="ui button m-margin-lr-small">搜索</div>
        </div>
      </form>

      <table class="ui table celled stackable">
        <thead>
          <tr>
            <th>#</th>
            <th>标题</th>
            <th>类型</th>
            <th>推荐</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="i in art_m" :key="i.phid">
            <td>{{i.phid}}</td>
            <td>{{i.title}}</td>
            <td>jhlilk22@yahoo.com</td>
            <td>No</td>
            <td>{{i.date[0]}}</td>
            <td>
              <a href="#" class="ui teal button mini"  @click="updateblog(i.phid)">编辑</a>
              <a class="ui red button mini"  @click="deleteblog(i.phid)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      art_m: []
    };
  },
  created() {
    this.artlist();
  },
  methods: {
    async artlist() {
      const { data: data } = await this.$http.get("/art/artlist", {
        params: {
          page: 1,
          pagemax:20
        }
      });
      this.art_m = data.artlist;
    },
    updateblog(phid) {
      console.log(phid);
      this.$router.push({
        path: `/manager/editblog/${phid}`
      });
    },
    deleteblog(phid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
         .then( async ()  =>  {
          
          const data = await this.$http.get('art/delete',{params:{
       phid:phid
     }})

console.log(data);
this.artlist();



          this.$message({
            type: "success",
            message: data.data.restext
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>