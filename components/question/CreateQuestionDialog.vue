<style lang="scss">
#create-question-form {
  .el-upload--picture-card,
  .el-upload-list__item {
    width: 72px !important;
    height: 72px !important;
    line-height: 80px !important;
  }

  .el-upload-list,
  .el-upload--picture-card {
    float: left;
  }

  .el-icon-upload-success {
    position: absolute;
    top: 0;
    left: 15px;
  }
}
</style>

<template>
  <v-dialog
    v-model="showQuestionModal"
    :footer="false"
    :click-close="false"
    title="写下你的问题"
  >
    <el-form
      id="create-question-form"
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="submitting"
      label-width="42px"
    >
      <el-form-item
        label="标题"
        prop="title"
      >
        <el-input
          v-model.trim="form.title"
          maxlength="30"
          placeholder="问题标题"
        />
      </el-form-item>
      <el-form-item
        label="番剧"
        prop="tags"
      >
        <bangumi-search
          v-model="form.tags"
          :multiple="true"
          :followed="true"
          :limit="5"
          placeholder="添加番剧标签"
        />
      </el-form-item>
      <el-form-item
        label="描述"
        prop="content"
      >
        <el-input
          v-model.trim="form.content"
          :rows="5"
          placeholder="问题背景，条件等详细信息"
          type="textarea"
          maxlength="1000"
        />
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          ref="uploader"
          :data="uploadHeaders"
          :on-error="handleError"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-exceed="handleExceed"
          :limit="exceed"
          :before-upload="beforeUpload"
          :action="imageUploadAction"
          :accept="imageUploadAccept"
          multiple
          list-type="picture-card"
        >
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="submitting"
          type="primary"
          @click="submit"
        >提交问题</el-button>
      </el-form-item>
    </el-form>
  </v-dialog>
</template>

<script>
import uploadMixin from '~/mixins/upload'
import Api from '~/api/questionApi'

export default {
  name: 'CreateQuestionDialog',
  mixins: [uploadMixin],
  data() {
    const validateTitle = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入问题标题'))
      }
      if (value.length > 30) {
        callback(new Error('标题最多 30 个字'))
      }
      callback()
    }
    const validateTag = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('至少选择一个相关番剧'))
      }
      if (value.length > 5) {
        callback(new Error('最多 5 个话题'))
      }
      callback()
    }
    return {
      showQuestionModal: false,
      form: {
        title: '',
        tags: [],
        content: ''
      },
      rules: {
        title: [{ validator: validateTitle, trigger: 'change' }],
        tags: [{ validator: validateTag, trigger: 'submit' }]
      },
      images: [],
      exceed: 7,
      submitting: false
    }
  },
  mounted() {
    this.$channel.$on('show-create-question-modal', () => {
      this.$store.state.login
        ? (this.showQuestionModal = true)
        : this.$channel.$emit('sign-in')
    })
  },
  methods: {
    beforeUpload(file) {
      this.uploadConfig.max = 5
      this.uploadConfig.pathPrefix = `user/${
        this.$store.state.user.id
      }/question`
      return this.beforeImageUpload(file)
    },
    handleError(err, file) {
      console.log(err)
      this.images.forEach((item, index) => {
        if (item.id === file.uid) {
          this.images.splice(index, 1)
        }
      })
      this.$toast.error(`图片：${file.name} 上传失败`)
    },
    handleRemove(file) {
      this.images.forEach((item, index) => {
        if (item.id === file.uid) {
          this.images.splice(index, 1)
        }
      })
    },
    handleExceed() {
      this.$toast.error(`最多可上传 ${this.exceed} 张图片!`)
    },
    handleSuccess(res, file) {
      this.images.push({
        id: file.uid,
        img: res.data
      })
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.submitting) {
            return
          }
          this.submitting = true
          this.$captcha({
            ctx: this,
            success: async ({ data }) => {
              const api = new Api(this)
              try {
                const result = await api.createQuestion({
                  title: this.form.title,
                  tags: this.form.tags,
                  intro: this.form.content.substring(0, 120),
                  content: this.form.content,
                  images: this.images.map(item => item.img),
                  geetest: data
                })
                this.images = []
                this.$refs.form.resetFields()
                this.$emit('submit')
                this.submitting = false
                this.$toast.success(result.message).then(() => {
                  window.location = this.$alias.question(result.data)
                })
              } catch (err) {
                this.$toast.error(err)
                this.submitting = false
              }
            },
            close: () => {
              this.submitting = false
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
