<template>
  <div class="resuce_flex">
      <!-- <div class="resuce-title">课件列表</div> -->
    <div class="resuce_flexlf" >
        <div class="resuce-title">课件列表</div>
        <div class="search-box">
            <!-- <el-select v-model="search_value" placeholder="请选择" style="width: 80px;margin-right: 10px"  size="small">
                            <el-option
                            v-for="item in search_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>  -->
                <el-input v-if="search_value == 0" v-model="SearchFormData.title" size="small" style="width: 60%;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>
      <!-- stripe -->
      <el-table
        :data="rece_rows"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        :row-style="{
          height: '40px',
          fontSize: '14px',
          color: '#3F434C',
          background: 'white',
          fontWeight: '400',
          fontFamily: 'SimSun Regular',
        }"
        :header-cell-style="{
          height: '40px',
          background: '#f4f8fe',
          color: '#2a2f3b',
          fontSize: '14px',
          fontWeight: '400',
        }"
        :height="height - 370"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        :highlight-current-row="true"
        style="width: 100%"
        size="mini"
      >
        <el-table-column type="selection"> </el-table-column>

        <el-table-column
          show-overflow-tooltip
          prop="title"
          label="课件名称"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="min_num"
          label="金额"
          align="left"
        ></el-table-column>
      </el-table>
      <div class="page-footer" >
                <!-- <span class="demonstration">直接前往</span> -->
                <el-pagination
                background
                small
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
                :page-sizes="[10]"
                layout="prev, pager, next"
                :total="total">
                </el-pagination>
        </div>
      <div class="flex-footer">{{sel_num}} / {{total}}</div>
    </div>
    <div class="resuce_flexmd">
      <div
        @click="unaddRece"
        :style="{
          width: '80%',
          marginLeft: '10%',
          marginTop: height / 3 - 30 + 'px',
          height: 30 + 'px',
          background: 'lightgray',
          color: 'whtie',
          textAlign: 'center',
          lineHeight: '30px',
        }"
      >
        -
      </div>
      <div
        @click="addRece"
        :style="{
          width: '80%',
          marginLeft: '10%',
          marginTop: 40 + 'px',
          height: 30 + 'px',
          background: '#2080F7',
          color: 'whtie',
          textAlign: 'center',
          lineHeight: '30px',
        }"
      >
        +
      </div>
    </div>
    <div class="resuce_flexrg">
      <!-- stripe -->
      <div class="resuce-title" style="background: #f6f7f9;color:#010101">已选列表</div>
      <div class="search-box">
            <el-input v-if="search_value == 0" v-model="SearchFormData.titles" size="small" style="width: 60%;margin-right: 20px;height: 36px"/>
            <el-button type="primary" @click="onSearchSubmits" size="small">搜索</el-button>
        </div>
      <el-table
        :data="reces_rows"
        ref="multipleTables"
        @selection-change="handleSelectionChanges"
        :row-key="(row) => { return row.id }"
        :row-style="{
          height: '40px',
          fontSize: '14px',
          color: '#3F434C',
          background: 'white',
          fontWeight: '400',
          fontFamily: 'SimSun Regular',
        }"
        :header-cell-style="{
          height: '40px',
          background: '#f4f8fe',
          color: '#2a2f3b',
          fontSize: '14px',
          fontWeight: '400',
        }"
        :height="height - 318"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        :highlight-current-row="true"
        style="width: 100%"
        size="mini"
      >
        <el-table-column type="selection"  :reserve-selection="true" width="55"> </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="title"
          label="课件名称"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="min_num"
          label="金额"
          align="left"
        ></el-table-column>
      </el-table>
      <div class="flex-footer" >已选课程 {{all_num}}</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import store from "@/store";
import lime from "@/lime.js";
import util from "@/util.js";
export default {
  name: "resource",
  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
  },
  data() {
    return {
        search_value: 0,
         search_options: [
            {value: 0,label: '标题'},
        ],
        SearchFormData: {
            title: '',
            titles: '',
            page_num: 1,
            page_len: 10
        },
        total: 0,
        loading: false,
        rece_rows: [],
        reces_rows: [],
        resuce_show: false,
        all_money: 0,
        multipleSelection: [],
        multipleSelections: [],
        all_num: 0,
        sel_num: 0,
        sel_ary: [],

        dd: []
    };
  },
  components: {},
  computed: {
    width: () => {
      return store.state.AppData.width;
    },
    height: () => {
      return store.state.AppData.height;
    },
  },
  created() {
   this.init()
  },
  methods: {
    onSearchSubmits() {
      let teacherList = this.reces_rows.filter(array => array.title.match(this.SearchFormData.titles));
      this.reces_rows = teacherList
       this.all_num =  this.reces_rows.length
      // this.multipleSelection = []
      // this.$refs.multipleTable.clearSelection();
      let count = 0;
      this.reces_rows.forEach((item, index) => {
        count = count + item.min_num;
      });
      console.log(count);
      this.all_money = count;
      this.sel_ary = this.reces_rows
      // console.log(this.SearchFormData.titles)
      // console.log(teacherList)
    },
       onSearchSubmit(){
                this.SearchFormData.page_num = 1;
                this.init();
            },
    init() {
      console.log(999999)
      this.dd = this.multipleSelection
      // this.multipleSelection.forEach(row => {
      //   this.selected.forEach(item => {
      //     if (row.id === item.id) {
      //       rows.push(row)
      //     }
      //   })
      // })
     

      console.log(this.multipleSelection)
      if ( this.multipleSelection) {
         this.multipleSelection.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } 
      else {
        // this.$refs.multipleTable.clearSelection();
      }
      // this.multipleSelection.forEach((row) => {
      //     this.$refs.multipleTable.toggleRowSelection(row);
      //   });
      // this.multipleSelection = this.multipleSelection


        // lime.req('ShopPlanDetail',{
        //     uuid: '1a0df31a3723d0083807eccd038bc788',
        //     login_token: lime.cookie_get('login_token')
        // }).then(res => {
        //     console.log(res)
        // })
    lime
      .req({
           module:'	ShopPlanAdd',
           ver:'1.0.0',
           relation_module:'ShopResourceList',
           relation_ver:'1.0.0',
      }, {
        login_token: lime.cookie_get("login_token"),
        page_no: this.SearchFormData.page_num,
        page_len: this.SearchFormData.page_len,
        title: this.SearchFormData.title
      })
      .then((res) => {
        this.rece_rows = res.data.rows;
        this.total = res.data.total;
        // this.resourceAry = res.data.rows.map(v => {
        //     return {value: v.uuid, label: v.title , ...v}
        // });
      });
    },
    toggleSelection(rows) {
      // let dd =this.multipleSelection

      //  this.dd.forEach(row => {
      //   this.multipleTable.forEach(item => {
      //     if (row.id === item.id) {
      //       rows.push(row)
      //       this.$refs.multipleTable.toggleRowSelection(row);
      //     }
      //   })
      //   this.$refs.multipleTable.toggleRowSelection(row);
      // })

      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } 
      else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.sel_num = val.length
      console.log(this.multipleSelection);
    },

    handleSelectionChanges(val) {
      this.multipleSelections = val;
      console.log(this.multipleSelections);
    },

    addRece() {
      let count = 0;
      this.reces_rows = this.multipleSelection;
      this.all_num =  this.reces_rows.length
      // this.multipleSelection = []
      // this.$refs.multipleTable.clearSelection();
      this.reces_rows.forEach((item, index) => {
        count = count + item.min_num;
      });
      console.log(count);
      this.all_money = count;
      this.sel_ary = this.reces_rows
    },
    unaddRece() {
      let add = this.reces_rows.filter(
        (item) => !this.multipleSelections.some((ele) => ele.uuid === item.uuid)
      );
      this.reces_rows = add;
       this.all_num =  this.reces_rows.length
      let count = 0;
      this.reces_rows.forEach((item, index) => {
        count = count + item.min_num;
      });
      console.log(count);
      this.all_money = count;
    },
    handleSizeChange(val) {console.log(`每页 ${val} 条`);},
    onPageChange(page){
        this.SearchFormData.page_num = page;
        this.init();
    },

  },
};
</script>
<style scoped>
.search-box {
    width: 100%;
    height: 45px;
    margin-top: 15px;
    font-size: 14px;
    padding-left: 20px;
    box-sizing: border-box
}
.resuce-title {
    width: 100%;
    height: 48px;
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
    line-height: 48px;
    color: white;
    background: #2080f7;
    border-radius: 4px 4px 0px 0px;
    font-size: 16px;
}
.resuce_flex {
  width: 92%;
  height: 100%;
  margin-left: 4%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}

.resuce_flexlf {
  width: 45%;
  height: 100%;
  /* border-top-left-radius: 10px; */
}

.resuce_flexmd {
  width: 10%;
  height: 100%;
}

.resuce_flexrg {
  width: 45%;
  height: 100%;
}
.flex-footer {
    width: 100%;
    height: 32px;
    border-bottom:  1px solid #f2f2f2;
    text-align: right;
    line-height: 32px;
    font-size: 14px;
    color: #3f434c;
    border-radius: 0px 0px 4px 4px;
    padding-right: 10px;
    box-sizing: border-box;
}

.page-footer {
    height: 40px; 
    width: 100%;
    text-align: right;
    /* position: fixed;
    bottom: 20px;
    right:40px; */
    overflow: hidden;
    /* z-index: 999; */
    border-bottom:  1px solid #f2f2f2;
    padding-top:  10px;
}
</style>