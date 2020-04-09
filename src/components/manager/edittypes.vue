<template>
  <div>
    <div class="m-padded-tb-big m-container animated fadeInUp">
      <div class="ui container">
        <div class="ui button m-margin-lr-small" @click="dialogVisible = true">新增</div>

        <table class="ui table celled stackable">
          <thead>
            <tr>
              <th>phid</th>
              <th>分类名称</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="i in types" :key="i.phid">
              <td>{{i.phid}}</td>
              <td>{{i.name}}</td>
              <td>
                <a href="#" class="ui teal button mini" :key="i.phid" @click="updateblog(i.phid)">编辑</a>
                <a class="ui red button mini" :key="i.phid" @click="deleteblog(i.phid)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%" :before-close="handleClose">
      <el-form :inline="true" class="demo-ruleForm" :model="types_form">
        <el-form-item label="分类名称">
          <el-input v-model="types_form.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savetypes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: [],
      dialogVisible: false,
      types_form: {
        name: ""
      }
    };
  },
  methods: {
    async gettypes() {
      const types = await this.$http.get("/pageconfig/types");
      this.types = types.data;
    },
    async savetypes() {
      if (!this.types_form.name) {
        return this.$message.info("请输入分类名称");
      }
      const types = await this.$http.post("/pageconfig/types", this.types_form);
      console.log(types);
      if(types.status !==200){
        return this.$message.info("服务器繁忙");
      }
      this.$message.success(types.data);
      this.dialogVisible = false;
      this.gettypes()
    }
  },
  created() {
    this.gettypes();
  }
};
</script>

<style>
</style>