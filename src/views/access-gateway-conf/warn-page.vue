<template>
  <div class="content-container">
    <div class="content-title">警告页面</div>
    <div class="content-body">
      <el-form
        ref="warnPageForm"
        :model="warnPageForm"
        label-width="auto"
        size="small"
        style="width: 700px; margin: 25px auto"
      >
        <el-form-item label="警告页面设置：" prop="type">
          <el-select
            v-model="warnPageForm.type"
            placeholder="请选择模式"
            style="width: 100%"
          >
            <el-option label="默认警告内容" value="default"></el-option>
            <el-option label="自定义警告链接" value="link"></el-option>
            <el-option label="上传HTML压缩文件" value="file"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="warnPageForm.type == 'default'">
          <el-form-item label="显示图片：" prop="picSrc">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handlePicChange"
              :file-list="fileList"
            >
              <el-button type="primary" class="custom-btn">
                {{ fileList.length > 0 ? "更换图片" : "选择图片" }}
              </el-button>
              <p slot="tip">请选择 png/jpg/jpeg 图片，图片不能大于2M</p>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="警告标题：" prop="title">
            <el-input
              clearable
              v-model="warnPageForm.title"
              placeholder="请输入警告标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="警告内容：" prop="content">
            <el-input
              type="textarea"
              v-model="warnPageForm.content"
              placeholder="请输入警告内容"
              rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户端下载链接：" prop="clientLink">
            <el-input
              clearable
              v-model="warnPageForm.clientLink"
              placeholder="请输入客户端下载链接"
            ></el-input>
          </el-form-item>
        </template>
        <template v-else-if="warnPageForm.type == 'link'">
          <el-form-item label="自定义的链接：" prop="customLink">
            <el-input
              clearable
              v-model="warnPageForm.link"
              placeholder="请输入自定义的链接"
            ></el-input>
          </el-form-item>
        </template>
        <template v-else-if="warnPageForm.type == 'file'">
          <el-form-item label="上传文件：" prop="HTMLFile">
            <el-input
              v-model="warnPageForm.HTMLFile.name"
              readonly
              placeholder="未选择任何文件"
            >
              <el-upload
                action="#"
                :auto-upload="false"
                :on-change="handleFileChange"
                :show-file-list="false"
                slot="prepend"
              >
                <el-button type="primary">选择文件</el-button>
              </el-upload>
            </el-input>
          </el-form-item>
        </template>
        <el-form-item label="触发警告端口：" prop="ports">
          <el-input
            clearable
            v-model="warnPageForm.ports"
            placeholder="请输入端口，多个请使用逗号分隔开"
          ></el-input>
        </el-form-item>
        <el-form-item prop="showVistorLoginInfo">
          <el-checkbox class="custom-ck" v-model="warnPageForm.showVistorLoginInfo">
            不显示访客登录信息
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="custom-btn"> 保存 </el-button>
          <el-button class="custom-btn" @click="handleReviewWarnPage"> 预览 </el-button>
          <el-button class="custom-btn"> 重置 </el-button>
          <p class="save-tip">* 修改设置后需要保存才生效</p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warnPageForm: {
        type: "default",
        picSrc: "",
        title: "",
        content: "",
        clientLink: "",
        customLink: "",
        HTMLFile: "",
        ports: "",
        showVisitorLoginInfo: false,
      },
      fileList: [],
      currentRoute: window.location.pathname,
    };
  },
  computed: {},
  methods: {
    handlePicChange(file, fileList) {
      let regex = /(.jpg|.jpeg|.png)$/;

      const isJPG = regex.test(file.name.toLowerCase());
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 PNG/JPG/JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      if (isJPG && isLt2M) {
        this.fileList = [file];
      } else {
        if (this.fileList.length > 0) {
          this.fileList = [this.fileList[0]];
        } else {
          this.fileList = [];
        }
      }
    },
    handleFileChange(file, fileList) {
      this.warnPageForm.HTMLFile = file;
    },
    handleReviewWarnPage() {
      if (this.warnPageForm.type == "default") {
        let defaultOptions = {
          picSrc: this.warnPageForm.picSrc,
          title: this.warnPageForm.title,
          content: this.warnPageForm.content,
          clientLink: this.warnPageForm.clientLink,
        };
        this.$router.push({
          name: "defaultWarnPage",
          params: { sad: 11 },
        });
      }
    },
  },
};
</script>

<style lang="scss"></style>
