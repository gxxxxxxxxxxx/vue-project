<template>
<!-- <vue-scroll :ops="ops" style="width:100%;height:100%"></vue-scroll> -->
  <div id="app">
    
 <router-view>
   
 </router-view>

   

 
 
  </div>
  
</template>

<script>

export default {
  name: 'App',
   data: () => ({
    ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#000000",//滚动条颜色
          opacity: 0.5,//滚动条透明度
          "overflow-x": "hidden"
        }
      }
  }),
 
}
</script>

<style>
.__bar-is-vertical {
  right: -1px !important;
}

.__bar-is-horizontal {
  display: none !important;
}


/* #nprogress .bar {
      background: gray !important; 
    } */


</style>
