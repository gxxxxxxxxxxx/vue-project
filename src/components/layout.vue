<template>
  <div>
    <nav class="ui inverted attached segment m-padded-tb-mini ">
      <div class="ui  container ">
        <div class="ui inverted secondary stackable menu" ref="abc">
          <h2 class="ui header white item">X</h2>
          <a v-bind:class="[mitem, item]" v-show="menudisplay==true" @click="gotohome">
            <i class="icon home"></i> 首页
          </a>
          <a v-bind:class="[mitem, item]" v-show="menudisplay==true" @click="gototypes">
            <i class="icon idea"></i>分类
          </a>

          <a v-bind:class="[mitem, item]" v-show="menudisplay==true" @click="gotoarchive">
            <i class="icon clone"></i>归档
          </a>
          <a v-bind:class="[mitem, item]" v-show="menudisplay==true" @click="gotoabout">
            <i class="icon info"></i>关于我
          </a>
          
        </div>
      </div>

      <!-- 缩放图标 -->
      <div class="ui black button m-top-right m-mobile-show" @click="showmenu">
        <i class="sidebar icon"></i>
      </div>
    </nav>

    <!-- 内容区 -->
    <vue-particles
      color="#555"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#555"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      class="particles-js"
    ></vue-particles>

    <router-view>
      
    </router-view>
    
<footer class="ui inverted attached segment m-padded-tb-mini" >

<p class="text_center">琼ICP备20000806号-1<p>


</footer>

  </div>
</template>

<script>
export default {
 created(){
  if (this.screenWidth < 768) {
        this.menudisplay = false;
      } else if (this.screenWidth > 768) {
        this.menudisplay = true;
      }
   
 },
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
    gotohome() {
      this.$router.push("/");
    },
    gototypes() {
      this.$router.push("/types");
    },
    gotoarchive() {
      this.$router.push("/archive");
    },
    gotoabout() {
      this.$router.push("/about");
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
      if (val < 768) {
        this.menudisplay = false;
      } else if (val > 768) {
        this.menudisplay = true;
      }
      
    }
    
    
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

.particles-js {
  position: absolute;
  width: 100%;
}


</style>