<template>
  <div class="m-padded-tb-big m-container">
    <div class="ui container">
      <div class="ui top attached segment">
        <div class="ui link horizontal list mini">
          <!-- 头像 -->
          <div class="item">
            <img :src="imageurl" alt class="ui avatar image" />
            <div class="content">
              <a href="#" class="ui header m-text">GANXX</a>
            </div>
          </div>
          <!-- 名字 -->
          <div class="item">
            <i class="icon calendar"></i> 2020-01-23
          </div>

          <div class="item">
            <i class="icon eye"></i> 32
          </div>
        </div>
      </div>
      <div class="ui attached segment">
        <img :src="imageurl" alt class="ui fluid image rounded imagestyle" />
        <div class="ui right aligned basic segment">
          <div class="ui label basic orange">原创</div>
        </div>

        <h2 class="ui center aligned header">{{title}}</h2>
      </div>

      <div id="ui stackable one column divided grid container m-mobile-bottom">
        <div class="row">
          <div class="column"></div>
        </div>
        <mavon-editor
          v-model="value"
          :defaultOpen="'preview'"
          :editable="false"
          :toolbarsFlag="false"
          :subfield="false"
          previewBackground="#ffffff"
          :boxShadow="true"
          class="markdown"
          :ishljs="true"
        />
      </div>

      <div class="ui segment center aligned basic">
        <button class="ui orange button basic circular">打赏我</button>
      </div>

      <div class="ui bottom attached segment">
        <div class="ui middle aligned grid">
          <div class="eleven wide column">
            <ul class="list">
              <li>欢迎关注</li>
            </ul>
          </div>
          <div class="five wide column">
            <img src="https://picsum.photos/id/1027/800/450" alt class="ui rounded bordered image" />
          </div>
        </div>
        <div class="ui attached segment m-mobile-bottom">
          <div class="ui comments">
            <h3 class="ui dividing header">留言板</h3>

            <div class="comment" v-for="c in comments" :key="c.phid">
              <a class="avatar">
                <img
                  src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1583835689&di=1aa154634a90736cf1edb334b9f5e801&src=http://b-ssl.duitang.com/uploads/item/201704/27/20170427155254_Kctx8.thumb.700_0.jpeg"
                />
              </a>
              <div class="content">
                <a class="author">{{c.name}} {{c.address}}网友</a>
                <div class="metadata">
                  <span class="date">{{c.date1}}</span>
                </div>
                <div class="text">
                  <p>{{c.content}}</p>
                </div>
                <div class="actions">
                  <a class="reply" @click="replyparent(c)">回复</a>
                </div>
              </div>
              <div class="comments" v-for="c1 in c.children" :key="c1.phid">
                <div class="comment">
                  <a class="avatar">
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1583835689&di=1aa154634a90736cf1edb334b9f5e801&src=http://b-ssl.duitang.com/uploads/item/201704/27/20170427155254_Kctx8.thumb.700_0.jpeg"
                    />
                  </a>
                  <div class="content">
                    <a class="author">{{c1.name}} {{c1.address}}网友</a>
                    <div class="metadata">
                      <span class="date">{{c1.date1}}</span>
                    </div>
                    <div class="text">{{c1.content}}</div>
                    <div class="actions">
                      <a class="reply" @click="replychild(c1)">回复</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-alert
          :title="replyto"
          type="success"
          v-show="message"
          class="m-mobile-top-bottom"
          @close="closereplyto"
        ></el-alert>

        <el-alert title="不允许为空" type="error" class="m-mobile-top-bottom" v-show="nullopen"></el-alert>

        <el-form class="ui reply form m-mobile-bottom" :model="Comment">
          <div class="required field">
            <textarea v-model="Comment.pinglun" ref="inputVal"></textarea>
          </div>
          <div class="required fields">
            <div class="field m-mobile-wide m-mobile-bottom">
              <div class="ui input left icon">
                <i class="icon user"></i>
                <input type="text" v-model="Comment.user" />
              </div>
            </div>
            <div class="required field m-mobile-wide m-mobile-bottom">
              <div class="ui input left icon">
                <i class="icon mail"></i>
                <input type="text" v-model="Comment.email" />
              </div>
            </div>
            <div
              class="ui blue labeled submit icon button m-mobile-wide m-mobile-bottom"
              @click="sendcomment"
            >
              <i class="icon edit"></i> 留言
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <div class="gotop" v-show="gotop" @click="toTop">Top</div>
    </div>
  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      title: "",
      value: '',
      value1:
        "前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问对移动端访问进行前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问进行前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问进行前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问进行前端采用Semantic UI进行敏捷式开发，完成响应式页面布局，对移动端访问进行",
      imageurl: "",
      message: false,
      nullopen: false,
      replyto: "",
      Comment: {
        user: "",
        email: "",
        pinglun: "",
        p_id: 0,
        page_id: this.$route.params.phid,
        ip: "",
        address: ""
      },
      comments: [],
      gotop: true
    };
  },

  created() {
    // chrome
    document.body.scrollTop = 0;
    // firefox
    document.documentElement.scrollTop = 0;
    // safari
    window.pageYOffset = 0;

    //console.log(this.$route.params.phid);
    this.artdetail();
    this.getcomment();

    const Ip = returnCitySN["cip"];
    const address = returnCitySN["cname"];
    localStorage.setItem("cip", Ip);
    localStorage.setItem("cname", address);
    this.Comment.ip = Ip;
    this.Comment.address = address;
  },
  methods: {
    async artdetail() {
      const { data: data } = await this.$http.get("/art/page", {
        params: {
          phid: this.$route.params.phid
        }
      });

      this.title = data[0].title;
      this.value = Base64.decode(data[0].content);
      this.imageurl = data[0].imageurl;
    },
    async getcomment() {
      const comment = await this.$http.get("/art/comment", {
        params: {
          page_id: this.$route.params.phid
        }
      });

      this.comments = comment.data;
    },
    async sendcomment() {
      if (!this.Comment.user || !this.Comment.email || !this.Comment.pinglun) {
        this.nullopen = true;
        return setTimeout(() => {
          this.nullopen = false;
        }, 3000);
      }

      const sendresults = await this.$http.post("/art/comment", this.Comment);
      this.getcomment();
      this.$message.success(sendresults.data);
      this.Comment.pinglun = "";
    },
    replyparent(c) {
      this.Comment.p_id = c.phid;
      this.message = true;
      this.replyto =
        "正在回复" + "    " + c.name + "               " + "关闭标签回复主贴";
      this.$refs.inputVal.focus();
    },
    replychild(c1) {
      this.Comment.p_id = c1.p_id;
      this.message = true;
      this.replyto =
        "正在回复" +
        "    " +
        c1.name +
        "                 " +
        "关闭标签回复主贴";
      this.$refs.inputVal.focus();
    },

    closereplyto() {
      this.message = false;
      this.Comment.p_id = 0;
    },
    handleScroll(e) {
      let top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      

      let scrolltop = e.target.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    },
    toTop() {
     

      let top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;

      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  },
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener("scroll", this.handleScroll, true);
  }
};
</script>

<style>
.footer .gotop {
  text-align: center;
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  background: white;
  color: #000000;
}
</style>