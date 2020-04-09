<template>
  <div class="m-padded-tb-big m-container animated fadeInLeft">
    <div class="ui container">
      <div class="ui segment">
        <el-form :inline="true" class="demo-ruleForm" :model="art_form">
          <el-form-item label="标题">
            <el-input v-model="art_form.title"></el-input>
          </el-form-item>

          <el-form-item label="简介">
            <el-input placeholder="简介" v-model="art_form.jianjie"></el-input>
          </el-form-item>
          <el-form-item label="选择分类">
            <el-select placeholder="选择分类"  v-model="art_form.typesvalue">
              <el-option :label="i.name" :value="i.phid" v-for="i in typesdata" :key="i.phid" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item size="large">
            <el-button type="primary" @click="blogsave" v-if="this.$route.params.phid ==9999">保存</el-button>
            <el-button type="warm" @click="updateblog" v-if="this.$route.params.phid !=9999">更新</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
        <el-upload
        
          :action="qiniuuploadURL"
          :drag="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeUpload"
          :data="postData"
        >
          <img v-if="art_form.imageUrl" :src="art_form.imageUrl" class="avatar" />
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不 超过500kb</div>
        </el-upload>
      </div>

      <div class="ui segment">
        <mavon-editor class="md" ref="editor" :value="value"></mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      value: "### test",
      doc: "", // markdown语法
      phid: "",
      art_form: {
        title: "",
        jianjie:"",
        imageurl: "",
        typesvalue: ''
      },

      postData: {
        token: ""
      },
      qiniuuploadURL: "http://up-z0.qiniup.com",
      typesdata: []
    };
  },
  methods: {
    async blogsave() {
      let markdown = Base64.encode(this.$refs.editor.d_value);

      const data = await this.$http.post("/art/artlist", {
        markdown,
        art: this.art_form
      });
     
      
      if (data.status == 200) {
        this.$router.push("/manager/bloglist");
        this.$message.success("保存成功");
        return;
      }
      this.$message.info("服务器繁忙");
    },
    async artdetail() {
      const { data: data } = await this.$http.get("/art/page", {
        params: {
          phid: this.$route.params.phid
        }
      });

      this.art_form.title = data[0].title;
      this.value = Base64.decode(data[0].content);
      this.art_form.imageurl = data[0].imageurl;
      this.art_form.typesvalue = parseInt(data[0].types);
    },

    async updateblog() {
      let markdown = Base64.encode(this.$refs.editor.d_value);

      const data = await this.$http.post("/art/update", {
        phid: this.phid,
        markdown,
        art: this.art_form
      });

      if (data.status == 200) {
        this.$router.push("/manager/bloglist");
        this.$message.success("更新成功");
        return;
      }
      this.$message.info("服务器繁忙");
    },
    handleAvatarSuccess(response, file) {
      
      
      this.art_form.imageurl =
        "https://img.ganxx.cn/" + response.key;
    },
    beforeUpload() {
      this.$http.get("/token").then(res => {
        this.postData.token = res.data;
       
        
      });
    },
    async gettypes() {
      const types = await this.$http.get("/pageconfig/types");
      this.typesdata = types.data;
    },
    
  },
  created() {
    if (this.$route.params.phid != 9999) {
     

      this.artdetail();
    }

    this.value = "";
    this.art_form.title = "";
    this.phid = this.$route.params.phid;
    this.beforeUpload();
    this.gettypes();
  }
};
</script>

<style>
</style>