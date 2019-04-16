<template>
  <div class="app-container">
    <el-form ref="productForm" :model="product" :rules="rules" label-width="100px">
      <el-form-item label="商品名字" prop="name">
        <el-input v-model="product.name"/>
      </el-form-item>
      <el-form-item label="商品简介" prop="descriptions">
        <el-input v-model="product.descriptions" type="textarea"/>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-col :span="4">
          <el-input v-model.number="product.price">
            <template slot="append">元</template>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="库存" prop="quantity">
        <el-col :span="2">
          <el-input v-model.number="product.quantity"/>
        </el-col>
      </el-form-item>
      <el-form-item label="主图" prop="price">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          :action="fileUploadUrl"
          name="file">
          <!-- 通过name指定上传文件的字段名, 需要和服务器端约定好 -->
          <img v-if="product.coverImg" :src="coverImgShow" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('productForm')">立即创建</el-button>
        <el-button @click="resetForm('productForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { serverUrl } from '@/utils/config'
import { createProduct } from '@/api/products'

export default {
  name: 'ProductEditor',
  data() {
    var validateQuantity = (rule, value, callback) => {
      const reg = /^[0-9]*[1-9][0-9]*$/
      if (!value) {
        return callback(new Error('请填写整数'))
      } else if (!reg.test(value)) {
        return callback(new Error('请输入整数'))
      } else if (value < 0) {
        return callback(new Error('库存不能小于0'))
      } else {
        callback()
      }
    }
    return {
      product: {
        name: '',
        descriptions: '',
        price: 0,
        quantity: 10,
        coverImg: ''
      },
      rules: {
        name: {
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        },
        quantity: [{
          required: true,
          message: '请输入商品库存',
          trigger: 'blur'
        }, {
          validator: validateQuantity,
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    // 使用计算属性设置显示服务器端图片的地址
    coverImgShow() {
      return serverUrl + this.product.coverImg
    },
    fileUploadUrl() {
      return `${serverUrl}/api/v1/common/file_upload`
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await createProduct(this.product)
          if (res.code === 'error') {
            this.$notify({
              title: '警告',
              message: res.message,
              type: 'warning'
            })
          } else {
            this.$router.push({
              name: 'ProductList'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.product.coverImg = ''
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess(res, file) {
      // this.product.coverImg = URL.createObjectURL(file.raw);
      // console.log(res);
      this.product.coverImg = res.info
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
