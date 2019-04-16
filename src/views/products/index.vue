<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="名字" width="230">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="图片" width="110" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.coverImg | addHostUrl" :alt="scope.row.name" class="cover-img">
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.descriptions }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="库存" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.quantity }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="editHandle(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="delHandle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="totalCount"
      background
      layout="prev, pager, next"
      @current-change="pageChandle"/>
  </div>
</template>

<script>
import { getProductList } from '@/api/products'
import { serverUrl } from '@/utils/config'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    addHostUrl(url) {
      if (url.startsWith('/')) {
        return serverUrl + url
      } else {
        return url
      }
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      totalCount: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData(page = 1) {
      this.listLoading = true
      const list = await getProductList({
        page
      })
      this.list = list.products
      this.totalCount = list.totalCount
      this.listLoading = false
    },
    pageChandle(page) {
      console.log(page)
      this.fetchData(page)
    },
    editHandle(item) {
      console.log(item)
    },
    delHandle(item) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 此处便携删除逻辑
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      console.log(item)
    }
  }
}
</script>
<style scoped>
.cover-img{
  width: 100px;
  max-height: 100px;
}
</style>

