<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right; ">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        
                        <el-link
                            class="menu" 
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus" 
                            :key="index">
                            {{item.name}}
                        </el-link>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- 数据表格 -->
        <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                ref="role"
                :data="rows"
                row-key="uuid"
                :height="height - 60 - 48"
                v-loading="loading"
                :default-expand-all="true"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="name" label="角色名称"></el-table-column>
            </el-table>
        </div>

        <!-- 添加 -->
        <el-dialog 
            title="添加"
            width="450px"
            :visible.sync="add_show">
            <el-form :model="AddFormData" label-width="80px">
                <el-form-item label="所属父类:">
                    <el-cascader 
                        clearable 
                        :options="add_rows"
                        :props="{checkStrictly:true,expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                        placeholder="不选择则为顶级"
                        v-model="AddFormData.parent_uuid">
                    </el-cascader>
                </el-form-item>

                <el-form-item label="角色名称:">
                    <el-input v-model="AddFormData.name" />
                </el-form-item>


            </el-form>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button type="primary" @click="onAddSubmit">确认</el-button>
            </span>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog 
            title="编辑"
            width="450px"
            :visible.sync="edit_show">
            <el-form :model="EditFormData" label-width="80px">
                <el-form-item label="所属父类:">
                    <el-cascader 
                        clearable 
                        :options="edit_rows"
                        :props="{checkStrictly:true,expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                        placeholder="不选择则为顶级"
                        v-model="EditFormData.parent_uuid">
                    </el-cascader>
                </el-form-item>

                <el-form-item label="角色名称:">
                    <el-input v-model="EditFormData.name" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button type="primary" @click="onEditSubmit">确认</el-button>
            </span>
        </el-dialog>


        <el-drawer
            size="800px"
            :append-to-body="true"
            :visible.sync="set_show">
            <div slot="title">设置菜单</div>
            <div :style="{padding:'0 0 0 20px', height:height - 120 + 'px',overflow:'auto'}">
                <el-form :model="SetFormData">
                    <fieldset class="margin" v-for="item in SetMenuList" :key="item.uuid">
                        <legend class="padding">
                            <el-checkbox 
                                @change="onCheckSelect(item, null, null, 'g')"
                                :value="item.checked" 
                                :label="item.name"></el-checkbox>
                        </legend>

                        <div v-for="citem in item.children" :key="citem.uuid">
                            <span v-if="typeof citem.children == 'undefined'" class="span-check">
                                <el-checkbox 
                                    @change="onCheckSelect(item,citem, null, 'm')"
                                    :value="citem.checked" 
                                    :label="citem.name"></el-checkbox>
                            </span>

                            <fieldset v-else class="margin">
                                <legend class="padding">
                                    <el-checkbox 
                                        @change="onCheckSelect(item,citem, null, 'm')"
                                        :value="citem.checked" 
                                        :label="citem.name"></el-checkbox>
                                </legend>

                                <div class="padding">
                                    <span class="span-check" :key="sitem.uuid" v-for="sitem in citem.children">
                                        <el-checkbox 
                                            @change="onCheckSelect(item, citem, sitem, 's')"
                                            :value="sitem.checked" 
                                            :label="sitem.name"></el-checkbox>
                                    </span>
                                </div>
                            </fieldset>
                        </div>
                    </fieldset>

                    <el-form-item>
                        <el-button @click="onSetMenuSubmit" type="primary">设 置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

    if (!store.state.RoleData) {
        Vue.set(store.state, 'RoleData', {
            list:[],
            rows:[],
            loading:false,

            curr_row:null,

            // 添加
            add_show:false,
            add_rows:[],
            AddFormData:{
                name:'',
                parent_uuid:'', // 为空为顶级
            },


            edit_show:false,
            edit_rows:[],
            EditFormData:{
                name:'',
                parent_uuid:''
            },

            set_show:false,
            SetMenuList:[],
            SetFormData:{
                uuid:'',
                menu_uuids:[]
            }
        });
    }

    export default {
        data() {
            return store.state.RoleData;
        },
        computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            },
        },
        created(){
            this.init();
        },
        methods:{
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },

            
            // 数据初始化
            init() {
                this.loading = true;

                lime.req('ShopRoleList', {
                    login_token:lime.cookie_get('login_token'),
                }).then(res => {
                    this.loading = false;
                    this.curr_row = null;
                    this.$refs.role.setCurrentRow();
                    this.list = res.data;
                    this.rows = util.toTree(res.data);
                });


                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
            },

            // 表格数据刷新
            onRefresh() {
                this.init();
            },
            
            // 选择单行
            onSelectRow(row){
                this.curr_row = row;
            },
            


            // 添加展示
            handleAdd() {
                this.AddFormData = {
                    name:'',
                    parent_uuid:'',
                }
                // 如果选择列表数据,则获取作为父类
                if (!util.empty(this.curr_row)) {
                    this.AddFormData.parent_uuid = this.curr_row.uuid;
                }

                let _rows = [];
                this.add_rows = [];
                this.list.forEach(item => {
                    _rows.push({
                        name:item.name,
                        parent_uuid:item.parent_uuid,
                        uuid:item.uuid
                    })
                });
                this.add_rows = util.toTree(_rows);
                this.add_show = true;
            },
            // 添加向后台提交
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                lime.req('ShopRoleAdd', this.AddFormData).then(res => {
                    
                    this.init();
                    this.add_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },


            // 编辑展示
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                let _rows = [];
                this.edit_rows = [];

                this.list.forEach(item => {
                    if (item.uuid != this.curr_row.uuid) {
                        _rows.push({
                            name:item.name,
                            parent_uuid:item.parent_uuid,
                            uuid:item.uuid,
                        });
                    }
                });

                this.edit_rows = util.toTree(_rows);


                this.EditFormData.parent_uuid = this.curr_row.parent_uuid;
                this.EditFormData.name = this.curr_row.name;
                this.edit_show = true;
            },
            // 编辑后台提交
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');
                this.EditFormData.uuid        = this.curr_row.uuid;

                lime.req('ShopRoleEdit', this.EditFormData).then(res => {
                    this.init();
                    this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },


            // 删除确认提交
            handleDel(menu) {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }


                this.$confirm('确认删除?', '提示').then(() => {
                    lime.req('ShopRoleDel', {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }).then(res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },

            // 设置菜单
            handleSetMenu(menu) {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                lime.req(
                {
                    module:'ShopRoleSetMenu',
                    ver:'1.0.0',
                    relation_module:'ShopRoleList',
                    relation_ver:'1.0.0'
                },
                {
                    login_token:lime.cookie_get('login_token'),
                    role_uuid:this.curr_row.parent_uuid
                }).then(res => {
                    // 数据初始化,所有菜单都归属不选
                    this.SetMenuList = [];
                    res.data.forEach(item => {
                        item.checked = false;
                    })

                    // 当前设置好的
                    lime.req({
                        module:'ShopRoleSetMenu',
                        ver:'1.0.0',
                        relation_module:'ShopRoleList',
                        relation_ver:'1.0.0'
                    }, {
                        login_token:lime.cookie_get('login_token'),
                        role_uuid:this.curr_row.uuid
                    }).then(cres => {
                        cres.data.forEach(sitem => {
                            this.SetFormData.menu_uuids.push(sitem.uuid);
                        })

                        res.data.forEach(item => {
                            if (this.SetFormData.menu_uuids.includes(item.uuid)) {
                                item.checked = true;
                            } else {
                                item.checked = false;
                            }
                        })
                    });

                    this.SetMenuList = util.toTree(res.data);
                    this.set_show = true;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },

            // 选择菜单点击
            onCheckSelect(item,citem,sitem, type) {
                if (type == 'g'){
                    console.log(item.checked);
                    item.checked = !item.checked;

                    item.children.forEach(_citem => {
                        _citem.checked = item.checked;
                        if (typeof _citem.children != 'undefined') {
                            _citem.children.forEach(_sitem => {
                                _sitem.checked = item.checked;
                            })
                        }
                    })
                }

                if (type == 'm'){
                    citem.checked = !citem.checked;
                    
                    if (typeof citem.children != 'undefined') {
                        citem.children.forEach(_sitem => {
                            _sitem.checked = citem.checked;
                        })
                    }
                    

                    // 判断分组父类的处理
                    if (citem.checked == true) {
                        // 主菜单被选中,父类一定被选中
                        item.checked = true;
                    } else {
                        // 主菜单取消,查看此主菜单分组下的其他主菜单是否有选中情况,有就忽略,没有,也取消
                        let _other_citem_checked = false;
                        
                        if (typeof item.children != 'undefined') {
                            item.children.forEach(_citem => {
                                if (_citem.checked == true){
                                    _other_citem_checked = true;
                                }
                            })
                        }
                        

                        if (_other_citem_checked == true){
                            item.checked = true;
                        } else {
                            item.checked = false;
                        }
                    }
                }

                if (type == 's') {
                    sitem.checked = !sitem.checked;

                    if (sitem.checked == true){
                        item.checked = true;
                        citem.checked = true;
                    }
                }
                this._getMenu();
            },
            // 获取菜单
            _getMenu() {
                this.SetFormData.menu_uuids = [];
                this.SetMenuList.forEach(_item => {
                    if (_item.checked == true) {
                        this.SetFormData.menu_uuids.push(_item.uuid);
                        if (typeof _item.children != 'undefined') {
                            _item.children.forEach(_citem => {
                                if (_citem.checked == true) {
                                    this.SetFormData.menu_uuids.push(_citem.uuid);
                                    if (typeof _citem.children != 'undefined') {
                                        _citem.children.forEach(_sitem => {
                                            if (_sitem.checked == true) {
                                                this.SetFormData.menu_uuids.push(_sitem.uuid);
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            },

            onSetMenuSubmit() {
                lime.req('ShopRoleSetMenu', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid,
                    menu_uuids:this.SetFormData.menu_uuids
                }).then(res => {
                    this.$message.success('设置成功');
                    this.init();
                    this.set_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            }
        }
    }
</script>

<style scoped>
    .menu{
        display: inline-block;
        padding:0 16px;
        text-align: center;
    }


    .margin{
        margin: 10px;
        border:solid 1px #ccc;
        border-radius: 5px;
    }

    .padding{
        padding:10px;
    }

    .my-menu{
        margin: 7px; 
        text-align: right; 
        height: 35px; 
        line-height: 35px;
    }

    .span-check {
        margin-left: 30px; 
        display: inline-block; 
        min-width: 120px;
    }
</style>