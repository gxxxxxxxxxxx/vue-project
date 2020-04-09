<template>
  
    <div>
    <nav class="ui inverted attached segment m-padded-tb-mini">
      <div class="ui container">
        <div class="ui inverted secondary stackable menu" ref="abc">
          <h2 class="ui header white item">X-M</h2>
          <a  v-bind:class="[mitem, item]" v-show="menudisplay==true" @click="gotobloglist">
            <i class="icon home"></i> 博客
          </a>
          <a  v-bind:class="[mitem, item]" v-show="menudisplay==true" @click="gotoedittypes">
            <i class="icon idea"></i>分类
          </a>
          <a  v-bind:class="[mitem, item]" v-show="menudisplay==true" >
            <i class="icon tags"></i>标签
          </a>
          <a  v-bind:class="[mitem, item]" v-show="menudisplay==true"  @click="gotoeditblog">
            <i class="icon edit"></i>写博客
          </a>

          <div class="right center aligned menu" v-show="menudisplay==true">
              <div class="ui dropdown item">
                  <div class="text">
                      <img src="https://picsum.photos/id/1027/800/450" alt="" class="ui avatar image">
                      甘小星
                      
                  </div>
                  
              </div>
              <div class="item">
                  <div class="ui m-margin-lr-small    button">注销</div>
              </div>
          </div>
        </div>
      </div>

      <!-- 缩放图标 -->
      <a class="ui black button m-top-right m-mobile-show" @click="showmenu">
        <i class="sidebar icon"></i>
      </a>


       


    </nav>

    <!-- 内容区 -->

    
      <router-view></router-view>
  



  </div>




</template>

<script>
export default {
 data() {
    return {
      screenWidth: document.body.clientWidth,
      menudisplay: true,
      mitem: "m-item",
      item: "item",
      right: "right",
      aligned: "aligned"
    };
  },

  methods: {
    showmenu() {
      this.menudisplay = !this.menudisplay;
    },
    gotoeditblog(){
      this.$router.push('/manager/editblog/'+'9999')
    },
    gotobloglist(){
      this.$router.push('/manager/bloglist')
      
    },
    gotoedittypes(){
      this.$router.push('/manager/edittypes')
    }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  watch: {
    screenWidth(val) {
      console.log(val);
      if (val < 768) {
        this.menudisplay = false;
        console.log(this.menudisplay);
      } else if (val > 768) {
        this.menudisplay = true;
        console.log(this.menudisplay);
      }
    },
    
  }
};

</script>

<style scope>

.m-mobile-show {
  display: none !important;
}

@media screen and (max-width: 768px) {
  .m-mobile-show {
    display: block !important;
  }
}

</style>