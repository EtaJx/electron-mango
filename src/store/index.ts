import Vue from 'vue'
import Vuex from 'vuex'
import {Link,DbInfo,TreeType} from '../type/database'

interface State {
  treeTrance: number,
  treeData: Map<string,Link>
}

const state: State = {
  treeTrance:0,
  treeData:new Map()
}

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations: {
    ADD_DB(state: State, { dbs, name }) {
      dbs = dbs.map((db: any):DbInfo => {
        return {
          id: `${name}-${db.name}`,
          name: db.name,
          type: TreeType.Db,
          sizeOnDisk: parseFloat((db.sizeOnDisk / 1024).toFixed(2)),
          child:[]
        }
      })
      const link:Link = {
        id: name,
        name: name,
        type: TreeType.Link,
        child: dbs
      }
      state.treeData.set(name,link)
      state.treeTrance++
    }
  },
  actions: {
  }
})
