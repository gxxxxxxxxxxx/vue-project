<template>
  <div class="m-padded-tb-big m-container">
    <div class="ui container">
      <div class="ui stackable grid">
        <!-- 左边博客内容列表 -->
        <div class="eleven wide column">
          <div class="ui top attached segment">
            <!-- 内容头部 -->
            <div class="ui middle aligned two column grid">
              <div class="column">
                <h3 class="ui black header">文章</h3>
              </div>

              <div class="right aligned column">
                共
                <h2 class="ui black header m-inline-block m-text-thin">{{total}}</h2>篇
              </div>
            </div>
          </div>
          <div class="ui segment attached" v-loading="loading">
            <!-- 内容 -->

            <div
              class="ui segment padded vertical m-padded-tb-large"
              v-for="i in art_m"
              :key="i.phid"
            >
              <div class="ui grid stackable mobile reversed">
                <div class="eleven wide column">
                  <!-- 内容区 -->
                  <a class="ui header" @click="gotopage(i.phid)">{{i.title}}</a>
                  <p class="m-text">{{i.jianjie}}</p>

                  <!-- 布局 -->
                  <div class="ui grid bottomui">
                    <div class="eleven wide column">
                      <!-- 头像 -->
                      <div class="ui link horizontal list mini">
                        <!-- 头像 -->

                        <!-- 名字 -->
                        <div class="item">
                          <i class="icon calendar"></i>
                          {{i.date[0]}}
                        </div>

                        <div class="item">
                          <i class="icon eye"></i> 32
                        </div>
                      </div>
                    </div>
                    <div class="five wide column right aligned">
                      <a
                        href="#"
                        target="_blank"
                        class="ui basic gray label m-padded-mini m-text"
                      >{{i.name}}</a>
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
          <div class="ui bottom attached segment">
            <!-- 内容尾巴 -->
            <div class="ui middle aligned two column grid">
              <div class="column">
                <a href="#" class="ui gray basic mini button" @click="lastpage">上一页</a>
              </div>

              <div class="right aligned column">
                <a href="#" class="ui gray basic mini button" @click="nextpage">下一页</a>
              </div>
            </div>
          </div>
        </div>

        <!-- 右边卡片 -->
        <div class="five wide column">
          <div class="ui segments">
            <!-- 分类 -->
            <div class="ui secondary segment">
              <div class="ui two column grid">
                <div class="column">
                  <i class="icon idea"></i>分类
                </div>
                <div class="right aligned column">
                  <a @click="gototypes">more >></a>
                </div>
              </div>
            </div>
            <div class="ui gray segment">
              <div class="ui fluid vertical menu" v-for="type in types" :key="type.phid">
                <a href="#" class="item">
                  {{type.name}}
                  <div class="ui gray basic label left pointing">{{type.total}}</div>
                </a>
              </div>
            </div>
          </div>

          <div class="ui segments m-margin-top-small">
            <!-- 分类 -->
            <div class="ui secondary segment">
              <div class="ui two column grid">
                <div class="column">
                  <i class="icon bookmark"></i>最新推荐
                </div>
                <div class="right aligned column">
                  <a href="#">more >></a>
                </div>
              </div>
            </div>
            <div class="ui segment" v-for=" n in news" :key="n.phid">
              <a href="#" target="_blank">{{n.title}}</a>
            </div>
          </div>

          <!-- 二维码 -->

          <div class="ui horizontal divider header m-text m-margin-top-small">扫码关注</div>

          <div class="ui card centered m-margin-top-small" style="width:11em;">
            <img src="https://picsum.photos/id/1027/800/450" alt class="ui image rounded" />
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
      art_m: [],
      news: [],
      page: 1,
      total: 0,
      pagemax: 4,
      types: [],
      loading: false
    };
  },
  created() {
    this.artlist();
    
  },

  methods: {
    async artlist() {
      const { data: data } = await this.$http.get("/art/artlist", {
        params: {
          page: this.page,
          pagemax: this.pagemax
        }
      });

      data.artlist.forEach((item, idex) => {
        item.date = item.date.split("T", 1);
      });
      this.art_m = data.artlist;

      this.total = data.total[0].total;

      this.types = data.types;

      this.news = data.news;


    },

    gotopage(phid) {
      this.$router.push({
        path: `/page/${phid}`
      });
    },
    nextpage() {
      if (this.page == parseInt(this.total / 4 + 1)) {
        return this.$message.info("已经是最后一页了");
      } else {
        this.loading = true;

        this.page += 1;
        setTimeout(() => {
          this.loading = false;
          this.artlist();
        }, 500);
      }
    },
    lastpage() {
      if (this.page == 1) {
        return this.$message.info("已经是第一页了");
      } else if (this.page != 1) {
        this.loading = true;

        this.page -= 1;
        setTimeout(() => {
          this.loading = false;
          this.artlist();
        }, 500);
      }
    },
    gototypes() {
      this.$router.push("types");
    }
  }
};
</script>

<style>
.bottomui {
  margin-top: 4em !important;
}
</style>