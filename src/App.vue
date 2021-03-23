<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value='inputVal' @change="handleChange"/>
    <!-- <a-input placeholder="请输入任务" class="my_ipt" :value='inputVal' @change="setInputValue(e.target.value)"/> -->
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="listInfo" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbStatusChecked(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{UndoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewkey==='all'? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewkey==='undone'? 'primary' : 'default'"  @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewkey==='done'? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapActions,mapMutations,mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  created() {
    // ...mapActions(['getList'])
    this.$store.dispatch('getList') //触发actions
  },
  computed: {
    ...mapState(['inputVal','viewkey']),
		...mapGetters(['UndoneLength','listInfo'])
  },
	methods:{
// 监听文本框内容变化
		handleChange(e){
		console.log(e.target.value);
		this.$store.commit('setInputValue',e.target.value) //触发mutation
		// ...mapMutations(['setInputValue'])
	},
//添加事项
addItem(){
	if(this.inputVal.trim().length <=0) {
		return this.$message.warning('文本框内容不能为空! ')
	}
	this.$store.commit('addItemList')
},
// 删除事项
removeItemById(id){
console.log(id);
this.$store.commit('removeListById',id)
},
// 修改复选框状态
cbStatusChecked(e,id){
console.log(e.target.checked); //获取复选框状态值
console.log(id); //获取点击的对应复选框
const parm = {
id:id,
done:e.target.checked
}
this.$store.commit('changeCheckedSataus',parm)
},

// 清除已完成数据
clean(){
this.$store.commit('cleanDone')
},

// 点击按钮切换成高亮状态
changeList(key){
console.log(key);
this.$store.commit('changeViewKey',key)
}

}
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
