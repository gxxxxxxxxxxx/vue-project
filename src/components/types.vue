<template>
  <div class="m-padded-tb-big m-container">
    <div class="ui container">
      <div class="ui top attached segment">
        <!-- 内容头部 -->
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui gray header">分类</h3>
          </div>

          <div class="right aligned column">
            共
            <h2 class="ui gray header m-inline-block m-text-thin">{{types.length}}</h2>个
          </div>
        </div>
      </div>
      <div class="ui attached segment">
        <div
          class="ui labeled button m-margin-lr-small m-mobile-bottom"
          v-for="i in types"
          :key="i.phid"
          
        >
          <a class="ui button gray basic" @click="changetype(i.phid)">{{i.name}}</a>
          <div class="ui label gray basic">{{i.total}}</div>
        </div>
      </div>

      <div class="ui gray padded segment" v-for="i in type_page" :key="i.phid" v-loading="loading">
        <div class="ui grid stackable mobile reversed">
          <div class="eleven wide column">
            <!-- 内容区 -->
            <a class="ui header"  @click="gotopage(i.phid)">{{i.title}}</a>
            <p class="m-text">{{i.jianjie}}</p>

            <!-- 布局 -->
            <div class="ui grid bottomui">
              <div class="eleven wide column margin-top">
                <!-- 头像 -->
                <div class="ui link horizontal list mini  ">
                  <!-- 名字 -->
                  <div class="item">
                    <i class="icon calendar"></i> 2020-01-23
                  </div>

                  <div class="item">
                    <i class="icon eye"></i> 32
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="five wide column">
            <!-- 图片 -->
            <a href="#" target="_blank">
              <img :src="i.imageurl" alt class="ui image rounded" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: [],
      type_page: [],
      type_id: "",
      loading: false
    };
  },
  methods: {
    async gettypes() {
      const types = await this.$http.get("/pageconfig/types");
      this.types = types.data;
    },
    async types_page() {
      const types = await this.$http.get("/art/type_page", {
        params: {
          phid: this.type_id
        }
      });
     this.loading = true;
      setTimeout(() => {
          this.loading = false;
          this.type_page = types.data;
        }, 500);
      
    },
    changetype(phid) {
      this.type_id = phid;
      this.types_page();
      
    },
    gotopage(phid){
      this.$router.push({
        path: `/page/${phid}`
      });
    }
  },
  created() {
    this.gettypes();
    this.types_page();
  }
};
</script>

<style>
.bottomui {
  margin-top: 9em !important;
}
</style>