import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [],
        // 文本框的值
        inputVal: 'aaa',
        // id
        nextid: 5,
        // 按钮显示状态值
        viewkey: 'all'
    },
    mutations: {
        initList(state, list) {
            state.list = list
        },
        // 为store 中的inputvalue 赋值
        setInputValue(state, val) {
            state.inputVal = val
        },
        // 添加事项
        addItemList(state) {
            var obj = {
                id: state.nextid,
                info: state.inputVal.trim(),
                done: false
            }
            state.list.push(obj)
            state.nextid++
                state.inputVal = ''
        },
        // 删除事项
        removeListById(state, id) {
            // 根据传进来的id去list查找
            // 把找到id对应项用splice删除掉
            const i = state.list.findIndex(x => x.id === id)
            if (i !== -1) {
                state.list.splice(i, 1)
            }
        },
        // 修改复选框状态
        changeCheckedSataus(state, parm) {
            const i = state.list.findIndex(x => x.id === parm.id)
            if (i !== -1) {
                state.list[i].done = parm.done
            }
        },
        // 清除已完成数据
        cleanDone(state) {
            return state.list = state.list.filter(x => x.done === false)
        },
        // 按钮高亮状态
        changeViewKey(state, key) {
            state.viewkey = key
        }
    },
    actions: {
        getList(context) {
            axios.get('/list.json').then(({ data }) => {
                console.log(data)
                context.commit('initList', data)
            })
        }
    },
    getters: {
        // 统计未完成的条数
        UndoneLength(state) {
            return state.list.filter(x => x.done === false).length
        },
        // 根据切换不同状态的按钮 过滤对应的数据
        listInfo(state) {
            if (state.viewkey === 'all') {
                return state.list
            }
            if (state.viewkey === 'undone') {
                return state.list.filter(x => !x.done)
            }
            if (state.viewkey === 'done') {
                return state.list.filter(x => x.done)
            }
            return state.list
        }
    },
    modules: {}
})