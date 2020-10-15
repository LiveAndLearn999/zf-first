<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px;font-family: 'Microsoft YaHei Regular';color:#2A2F3B">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div style="text-align: right;font-size: 16px">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <!-- <el-link :style="{color: havaSeatch ? 'red' : ''}" @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link> -->
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
        <div style="width: 100%;height: 45px;margin-top: 30px;font-size: 14px;padding-left: 20px;box-sizing: border-box">               
                搜索 <el-input v-model="SearchFormData.real_name" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">确 定</el-button>
        </div>
        <!-- 数据表格 -->
        <div>
            <!-- style="border-top: solid 1px #f2f1f4;" -->
            <!-- fontFamily: 'FZCYJ' -->
            <el-table 
                :data="rows"
                stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 250"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-background="rgba(0, 0, 0, 0.01)"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 20px" 
                size="mini">
<<<<<<< HEAD
                <!-- element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" -->
                <el-table-column width="80px" type="index" label="序号"></el-table-column>
=======
                <el-table-column width="80px" type="index" label="#"></el-table-column>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                <el-table-column align="left" prop="name" label="姓名"></el-table-column>
                <el-table-column align="center" prop="mobile" label="登录手机"></el-table-column>
                <el-table-column align="center" prop="role_name" label="角色" >
                    <template slot-scope="scope">
                        <span class="no_role" v-if="scope.row.role_name == '' ">未设置</span>
                        <span v-else>{{scope.row.role_name}}</span>
                        <!-- {{scope.row.role_name == '' ? '未设置'  : scope.row.role_name}} -->
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="add_time" label="添加时间" :sortable=true></el-table-column>
                <el-table-column 
                    prop="last_time" 
                    label="最近登录时间" 
                    align="center"
                    :sortable=true>
                    <template slot-scope="scope">
                        {{scope.row.last_time == 0 ? '还未登陆' : scope.row.last_time}}
                    </template>
                </el-table-column>
               <el-table-column label="操作" width="230px" align="center">
                    <template slot-scope="scope">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click="handleEdit(scope.$index, scope.row)">
                                <el-button
                                size="mini"
                                type="text"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                size="mini"
                                type="text"
                                @click="handleSetRole(scope.$index, scope.row)">设置角色</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                size="mini"
                                type="text"
                                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                size="mini"
                                type="text"
                                @click="handleDel(scope.$index, scope.row)">删除</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
                </el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                <!-- <span class="demonstration">直接前往</span> -->
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                <!-- <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
            </div>
        </div>

        <!-- 搜索 -->
        <el-dialog
            title="搜索"
            :visible.sync="search_show"
            width="450px">
            <el-form :model="SearchFormData" label-width="120px" label-position="left">
                <el-form-item label="员工姓名:"><el-input v-model="SearchFormData.real_name" /></el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详细模板 -->
        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            :direction="direction" size="50%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',paddingLeft: '60px',paddingTop: '20px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
                <el-form :model="DetailFormData" label-width="140px" label-position="left">
                    <el-form-item label="员工名称:">{{DetailFormData.name}}</el-form-item>
                    <el-form-item label="登录手机号:">{{DetailFormData.mobile }}</el-form-item>
                    <el-form-item label="角色名称:">{{DetailFormData.role_name }}</el-form-item>
                    <el-form-item label="状态:">{{DetailFormData.state == 1 ? '启用' : '冻结'}}</el-form-item>
<<<<<<< HEAD
=======
                    <el-form-item label="添加时间:">{{DetailFormData.add_time }}</el-form-item>
                    <el-form-item label="最近修改时间:">{{DetailFormData.last_time}}</el-form-item>
                    <el-form-item label="最近修改ip:">{{DetailFormData.last_ip}}</el-form-item>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    <el-form-item label="紧急联系人:">{{DetailFormData.emergency_contact || '---' }}</el-form-item>                    
                    <el-form-item label="紧急联系电话:">{{DetailFormData.emergency_conttel}}</el-form-item>
                    <el-form-item label="与紧急联系人关系:">{{DetailFormData.emergency_about}}</el-form-item>
                    <el-form-item label="银行卡号:">{{DetailFormData.bank_code }}</el-form-item>
                    <el-form-item label="银行名称:">{{DetailFormData.bank_name}}</el-form-item>
                    <el-form-item label="银行卡姓名:">{{DetailFormData.bank_staff_name}}</el-form-item>
                    <el-form-item label="入职时间:">{{DetailFormData.start_time}}</el-form-item>
                    <el-form-item label="试用期时间:">{{DetailFormData.try_time}}</el-form-item>
<<<<<<< HEAD
=======
                    <el-form-item label="离职时间:">{{DetailFormData.out_time}}</el-form-item>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    <el-form-item label="身份证:">{{DetailFormData.person_code}}</el-form-item>
                    <el-form-item label="性别:">{{DetailFormData.sex == 1 ? '男' : '女'}}</el-form-item>
                    <el-form-item label="当前居住地:">{{DetailFormData.now_addr}}</el-form-item>
                    <el-form-item label="籍贯所在地:">{{DetailFormData.home_addr}}</el-form-item>
                    <el-form-item label="身份证正面:"><!-- {{DetailFormData.person_code_img0}} -->
<<<<<<< HEAD
                        <!-- <img v-if="DetailFormData.person_code_img0" :src="DetailFormData.person_code_img0" alt="" style="width: 50px;height: 50px"> -->
                        <el-image 
                            v-if="DetailFormData.person_code_img0"
                            style="width: 30px; height: 30px"
                            :src="DetailFormData.person_code_img0" 
                            :preview-src-list="[DetailFormData.person_code_img0]">
                        </el-image>
                        <span v-else>未上传</span>
                    </el-form-item>
                    <el-form-item label="身份证反面:">
                        <!-- <img v-if="DetailFormData.person_code_img1" :src="DetailFormData.person_code_img1" alt="" style="width: 50px;height: 50px"> -->
                        <el-image 
                            v-if="DetailFormData.person_code_img1"
                            style="width: 30px; height: 30px"
                            :src="DetailFormData.person_code_img1" 
                            :preview-src-list="[DetailFormData.person_code_img1]">
                        </el-image>
=======
                        <img v-if="DetailFormData.person_code_img0" :src="DetailFormData.person_code_img0" alt="" style="width: 50px;height: 50px">
                        <span v-else>未上传</span>
                    </el-form-item>
                    <el-form-item label="身份证反面:">
                        <img v-if="DetailFormData.person_code_img1" :src="DetailFormData.person_code_img1" alt="" style="width: 50px;height: 50px">
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                        <span v-else>未上传</span>
                        <!-- {{DetailFormData.person_code_img1}} -->
                    </el-form-item>
                    <el-form-item label="学历类型:">
                        <span v-if="DetailFormData.edu_type == 0 "> 保密</span>
                        <span v-else-if="DetailFormData.edu_type == 1">初中及以上</span>
                        <span v-else-if="DetailFormData.edu_type == 2">高中及以上</span>
                        <span v-else-if="DetailFormData.edu_type == 3">大专及以上</span>
                        <span v-else-if="DetailFormData.edu_type == 4">本科及以上</span>
                        <span v-else>研究生及以上</span>
                    </el-form-item>
                    <el-form-item label="婚姻状况:">
                        <span v-if="DetailFormData.is_marry == 0 ">未婚</span>
                        <span v-else-if="DetailFormData.is_marry == 1 ">已婚</span>
                        <span v-else-if="DetailFormData.is_marry == 2 ">离异</span>
                        <span v-else>丧偶</span>
                    </el-form-item>
                    <el-form-item label="民族:">{{DetailFormData.nation}}</el-form-item>
<<<<<<< HEAD
=======
                    <el-form-item label="微信号:">{{DetailFormData.weixin_code}}</el-form-item>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    <el-form-item label="薪资:">{{((DetailFormData.salary - 0) / 100) + '元'}}</el-form-item> 
                    <el-form-item label="是否已交社保:">
                        <span v-if="DetailFormData.is_social == 0 ">未交</span>
                        <span v-else>已交</span>
                    </el-form-item> 
                </el-form>
            </div>
            <div class="drawer-footer">
                    <el-button @click="detail_show = false" type="primary">关闭</el-button>
            </div>
        </el-drawer>

        <!-- 添加模板 -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            :direction="direction" size="50%" >
            <div class="draw-content" :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',margin:'0 auto',paddingLeft: '60px',paddingTop: '20px',paddingBottom: '10px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
                <el-form style="margin-top: 10px" :model="AddFormData" label-width="140px" label-position="left" :rules="rules">
                    <el-form-item prop="name" label="员工名称:"><el-input @input="setNames" maxlength="12"  style="width: 360px" v-model="AddFormData.name" /></el-form-item>
                    <el-form-item prop="mobile" label="登录手机号:" required><el-input style="width: 360px" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="11" v-model="AddFormData.mobile" /></el-form-item>
                    <el-form-item prop="pwd" label="密码:"><el-input v-model="AddFormData.pwd" style="width: 360px" maxlength="16"/></el-form-item>
                    <el-form-item label="状态:" required>
                        <el-radio-group v-model="add_state">
                            <el-radio :label="0">冻结</el-radio>
                            <el-radio :label="1">启用</el-radio>
                        </el-radio-group>
<<<<<<< HEAD
                    </el-form-item>       
                    <el-form-item label="紧急联系人:"><el-input maxlength="10" style="width: 360px" v-model="AddFormData.emergency_contact" /></el-form-item>
=======
                    </el-form-item>
                    <el-form-item label="添加时间:">
                         <el-date-picker
                            v-model="AddFormData.add_time"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                        <!-- <el-input v-model="AddFormData.add_time" /> -->
                    </el-form-item>
                    <el-form-item label="最近修改时间:">
                        <el-date-picker
                            v-model="AddFormData.last_time"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                        <!-- <el-input v-model="AddFormData.last_time" /> -->
                    </el-form-item>
                    <el-form-item label="最近修改ip:"><el-input v-model="AddFormData.last_ip" /></el-form-item>
                    <el-form-item label="紧急联系人:"><el-input v-model="AddFormData.emergency_contact" /></el-form-item>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    <el-form-item label="紧急联系电话:">
                        <el-input onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="11" style="width: 360px" v-model="AddFormData.emergency_conttel" />
                    </el-form-item>
                    <el-form-item label="与紧急联系人关系:">
                        <el-input style="width: 360px" v-model="AddFormData.emergency_about" />
                    </el-form-item>
                    <el-form-item label="银行卡号:">
                         <el-input onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="19" style="width: 360px" v-model="AddFormData.bank_code" />
                    </el-form-item>
                    <el-form-item label="银行名称:">
                        <el-input style="width: 360px" v-model="AddFormData.bank_name" />
                    </el-form-item>
                    <el-form-item label="银行卡姓名:">
                        <!-- <el-input style="width: 260px" v-model="AddFormData.bank_staff_name" /> -->
                        <el-input style="width: 360px" v-model="add_name" />
                    </el-form-item>
                    <el-form-item label="入职时间:">
                        <el-date-picker
                        style="width: 360px"
                            v-model="AddFormData.start_time"
                            type="date"
                            placeholder="选择日期时间">
                        </el-date-picker>
                        <!-- <el-input v-model="AddFormData.start_time" /> -->
                    </el-form-item>
                    <el-form-item label="试用期时间:">
                        <el-date-picker
                            style="width: 360px"
                            v-model="AddFormData.try_time"
                            type="date"
                            placeholder="选择日期时间">
                        </el-date-picker>
                        <!-- <el-input v-model="AddFormData.try_time" /> -->
                    </el-form-item>
<<<<<<< HEAD
                    <el-form-item label="身份证号:">
                        <el-input style="width: 360px" v-model="AddFormData.person_code" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="18"
></el-input>
                       <!--  <el-input style="width: 360px" v-model="personCode"></el-input> -->
=======
                    <el-form-item label="离职时间:">
                        <el-date-picker
                            v-model="AddFormData.out_time"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                        <!-- <el-input v-model="AddFormData.out_time" /> -->
                    </el-form-item>
                    <el-form-item label="身份证号:">
                        <el-input v-model="AddFormData.person_code" />
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    </el-form-item>
                    <el-form-item label="性别:">
                        <el-radio-group v-model="add_sex">
                            <el-radio :label="0">女</el-radio>
                            <el-radio :label="1">男</el-radio>
                        </el-radio-group>
                        <!-- AddFormData.sex -->
                    </el-form-item>
                    <el-form-item label="当前居住地:">
                        <el-input style="width: 360px" v-model="AddFormData.now_addr" />
                    </el-form-item>
                    <el-form-item label="籍贯所在地:">
                        <el-input style="width: 360px" v-model="AddFormData.home_addr" />
                    </el-form-item>
                    <el-form-item label="身份证正面:">
                        <file ref="img_code"/>
                        <!-- <el-input v-model="AddFormData.person_code_img0" /> -->
                    </el-form-item>
                    <el-form-item label="身份证反面:">
                        <file ref="imgs_code"/>
                        <!-- <el-input v-model="AddFormData.person_code_img1" /> -->
                    </el-form-item>
                    <el-form-item label="受教育类型:">
                         <el-radio-group v-model="add_edu_type">
                            <el-radio :label="0">保密</el-radio>
                            <el-radio :label="1">初中及以上</el-radio>
                            <el-radio :label="2">高中及以上</el-radio>
                            <el-radio :label="3">大专及以上</el-radio>
                            <el-radio :label="4"> 本科及以上</el-radio>
                            <el-radio :label="5"> 研究生及以上</el-radio>
                         </el-radio-group>
                         <!-- AddFormData.edu_type -->
                    </el-form-item>
                    <el-form-item label="婚姻状况:">
                        <el-radio-group v-model="add_is_marry">
                            <el-radio :label="0">未婚</el-radio>
                            <el-radio :label="1">已婚</el-radio>
                            <el-radio :label="2">离异</el-radio>
                            <el-radio :label="3">丧偶</el-radio>`
                        </el-radio-group>
                        <!-- AddFormData.is_marry -->
                    </el-form-item>
                    <el-form-item label="民族:">
                        <el-input style="width: 360px" v-model="AddFormData.nation" />
                    </el-form-item>
                   <el-form-item label="薪资:">
<<<<<<< HEAD
                       <el-input-number v-model="AddFormData.salary" :min="1" :max="100000" ></el-input-number>
                    <!-- <el-input-number style="width: 360px" v-model="AddFormData.salary" :precision="2" :step="0.1" :max="100000"></el-input-number> -->
                       <!-- <el-input type="number" v-model="AddFormData.salary" /> -->
=======
                       <el-input type="number" v-model="AddFormData.salary" />
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    </el-form-item> 
                    <el-form-item label="是否已交社保:">
                        <el-radio-group v-model="add_is_social">
                            <el-radio :label="0">未缴</el-radio>
                            <el-radio :label="1">已缴</el-radio>
                        </el-radio-group>
                        <!-- AddFormData.is_social -->
                    </el-form-item> 
                </el-form>
            </div>
            <div  class="drawer-footer">
                <span slot="footer">
                    <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
                </span>
                 <!-- <div slot="footer" style="width: 360px;text-align: right">
                    <el-button @click="add_show = false">取 消</el-button>
                    <el-button type="primary" @click="onAddSubmit">确 定</el-button>
                </div> -->
            </div>
        </el-drawer>

        <!-- 编辑模板 -->
        <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            :direction="direction" size="50%">
            <div class="draw-content" :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',paddingLeft: '60px',paddingTop: '20px',paddingBottom: '40px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
                <el-form :model="EditFormData" label-width="140px" label-position="left">
                    <el-form-item label="员工名称:"><el-input v-model="EditFormData.name" style="width: 360px"/></el-form-item>
                    <el-form-item label="登录手机号:"><el-input onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="11" v-model="EditFormData.mobile" style="width: 360px"/></el-form-item>
                    <el-form-item label="状态:">
                        <el-radio-group v-model="edit_state">
                            <el-radio :label="0">冻结</el-radio>
                            <el-radio :label="1">启用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="紧急联系人:"><el-input style="width: 360px" v-model="EditFormData.emergency_contact" /></el-form-item>
                    <el-form-item label="紧急联系电话:">
                        <el-input onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="11" style="width: 360px" v-model="EditFormData.emergency_conttel" />
                    </el-form-item>
                    <el-form-item label="与紧急联系人关系:">
                        <el-input style="width: 360px" v-model="EditFormData.emergency_about" />
                    </el-form-item>
                    <el-form-item label="银行卡号:">
                         <el-input  onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="19" style="width: 360px" v-model="EditFormData.bank_code" />
                    </el-form-item>
                    <el-form-item label="银行名称:">
                        <el-input style="width: 360px" v-model="EditFormData.bank_name" />
                    </el-form-item>
                    <el-form-item label="银行卡姓名:">
                        <el-input style="width: 360px" v-model="EditFormData.bank_staff_name" />
                    </el-form-item>
                    <el-form-item label="入职时间:">
                        <el-date-picker
                            v-model="EditFormData.start_time"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="试用期时间:">
                        <el-date-picker
                            v-model="EditFormData.try_time"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
<<<<<<< HEAD
                    <el-form-item label="身份证号:">
                        <el-input style="width: 360px" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="18" v-model="EditFormData.person_code" />
=======
                    <el-form-item label="离职时间:">
                        <el-date-picker
                            v-model="EditFormData.out_time"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="身份证号:">
                        <el-input v-model="EditFormData.person_code" />
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    </el-form-item>
                    <el-form-item label="性别:">
                        <el-radio-group v-model="edit_sex">
                            <el-radio :label="0">女</el-radio>
                            <el-radio :label="1">男</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="当前居住地:">
                        <el-input style="width: 360px" v-model="EditFormData.now_addr" />
                    </el-form-item>
                    <el-form-item label="籍贯所在地:">
                        <el-input style="width: 360px" v-model="EditFormData.home_addr" />
                    </el-form-item>
                    <el-form-item label="身份证正面:">
<<<<<<< HEAD
                        <file ref="edtimg_code" :imgUrl="EditFormData.person_code_img0"/>
                    </el-form-item>
                    <el-form-item label="身份证反面:">
                         <file :imgUrl="EditFormData.person_code_img1" ref="edtimg_codes"/>
=======
                        <img v-if="EditFormData.person_code_img0" :src="EditFormData.person_code_img0" alt="" style="width: 50px">
                        <file v-else ref="edit_img"/>
                        <!-- <el-input v-model="EditFormData.person_code_img0" /> -->
                    </el-form-item>
                    <el-form-item label="身份证反面:">
                         <img v-if="EditFormData.person_code_img1" :src="EditFormData.person_code_img1" alt="" style="width: 50px">
                         <file v-else ref="edit_imgs"/>
                        <!-- <el-input v-model="EditFormData.person_code_img1" /> -->
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    </el-form-item>
                    <el-form-item label="受教育类型:">
                        <el-radio-group v-model="edit_edu_type">
                            <el-radio :label="0">保密</el-radio>
                            <el-radio :label="1">初中及以上</el-radio>
                            <el-radio :label="2">高中及以上</el-radio>
                            <el-radio :label="3">大专及以上</el-radio>
                            <el-radio :label="4"> 本科及以上</el-radio>
                            <el-radio :label="5"> 研究生及以上</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="婚姻状况:">
                        <el-radio-group v-model="edit_is_marry">
                            <el-radio :label="0">未婚</el-radio>
                            <el-radio :label="1">已婚</el-radio>
                            <el-radio :label="2">离异</el-radio>
                            <el-radio :label="3">丧偶</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="民族:">
                        <el-input style="width: 360px" v-model="EditFormData.nation" />
                    </el-form-item>
                   <el-form-item label="薪资:">
<<<<<<< HEAD
                        <el-input-number v-model="EditFormData.salary" :min="1" :max="100000" ></el-input-number>
                    <!-- <el-input-number style="width: 260px" v-model="EditFormData.salary" :precision="2" :step="0.1" :max="100000"></el-input-number> -->
                       <!-- <el-input v-model="EditFormData.salary" type="number"/> -->
=======
                       <el-input v-model="EditFormData.salary" type="number"/>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    </el-form-item> 
                    <el-form-item label="是否已交社保:">
                        <el-radio-group v-model="edit_is_social">
                            <el-radio :label="0">未缴</el-radio>
                            <el-radio :label="1">已缴</el-radio>
                        </el-radio-group>
                    </el-form-item> 
                </el-form>
            </div>
            <div class="drawer-footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </div>
        </el-drawer>

        <!-- 设置角色 -->
         <el-dialog 
            title="设置角色"
            width="450px"
            :visible.sync="role_show">
            <el-form :model="RoleFormData" label-width="80px" label-position="left">
                <el-form-item label="拥有角色:">
                    <el-cascader 
                        clearable 
                        :options="role_rows"
                        :props="{checkStrictly: true,expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                        placeholder="请选择"
                        v-model="RoleFormData.role_uuid">
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="role_show = false">取消</el-button>
                <el-button type="primary" @click="onRoleSubmit">确认</el-button>
            </span>
        </el-dialog>

        <!-- 重置密码 -->
         <el-dialog 
            title="重置密码"
            width="450px"
            :visible.sync="setpwd_show">
            <el-form :model="PwdFormDate" label-width="80px" label-position="left">
                <el-form-item label="原密码:">
                    <el-input v-model="PwdFormDate.old_pwd" />
                </el-form-item>
                <el-form-item label="新密码:">
                    <el-input v-model="PwdFormDate.pwd" show-password type="password"/>
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="setpwd_show = false">取消</el-button>
                <el-button type="primary" @click="onPwdSubmit">确认</el-button>
            </span>
        </el-dialog>
        <!-- <form /> -->
        <!-- <drawer ref="add_drawer" :form_des="manage_add_from_des"/> -->
    </div>
</template>

<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
<<<<<<< HEAD
    // import file from "@/components/imgUpload/upload.vue"
    import file from "@/components/imgUpload/drapload.vue"
    // import drawer from "@/components/drawer/drawer.vue"
    export default {
        components:{
            file,
            // drawer,
        },
        data() {
            return {
                // 添加form字段
                manage_add_from_des: [
                    {
                        field: 'name', type: 'text', label: '员工名称', value: '',
                        rules: [{required: true, message: '员工名称名称不可为空', trigger: 'blur'},]
                    },

                    {
                        field: 'mobile', type: 'text', label: '登录手机', value: '',
                        rules: [{required: true, message: '登录手机不可为空', trigger: 'blur'},]
                    },
                    {
                        field: 'pwd', type: 'password', label: '登录密码', value: '',
                        rules: [{required: true, message: '登录密码不可为空', trigger: 'blur'},]
                    },
                    {
                        field: 'state', type: 'radio',label: '状态', options: [
                            {value: '0',name: '冻结'},
                            {value: '1',name: '启用'}
                        ],
                        showstar: true
                    },
                    {
                        field: 'emergency_contact', type: 'text',label: '紧急联系人'
                    },
                    {
                        field: 'emergency_conttel', type: 'text',label: '紧急联系电话'
                    },
                    {
                        field: 'bank_code', type: 'text',label: '银行卡号'
                    },
                    {
                        field: 'bank_name', type: 'text',label: '银行名称'
                    },
                    {
                        field: 'bank_staff_name', type: 'text',label: '银行账号姓名'
                    },
                    {
                        field: 'start_time', type: 'text',label: '入职时间'
                    },
                    {
                        field: 'try_time', type: 'text',label: '试用期时间'
                    },
                    {
                        field: 'person_code', type: 'text',label: '身份证号'
                    },
                    {
                        field: 'sex', type: 'radio',label: '性别', options: [
                            {value: '0',name: '女'},
                            {value: '1',name: '男'}
                        ],
                        showstar: true
                    },
    
                ],
                rows:[],
                total:0,
                loading:false,
                curr_row:null,
                
                SearchFormData:{
                    real_name:'',
                    page_num:1,
                    page_len:10,
                    order_field:'add_time',
                    order_sort:'desc'
                },
                search_show:false,
                //详细
                detail_show: false,
                DetailFormData:{},
                // 添加
                add_show:false,
                AddFormData:{
                    real_name:'',
                    mobile:'',
                    pwd:'',
                    name:'',
                    start_time: new Date(),
                    try_time: new Date(),
                    person_code: ''
                },
                personCode: '',
                rules: {
                      name: [
                        { required: true, message: '员工姓必填', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' }
                      ],
                      // mobile: [
                      //   {max: 11,required: true, message: '请输入手机号', trigger: 'blur' },
                      //   {
                      //       pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                      //       message: '手机号格式不对',
                      //       trigger: 'blur'
                      //     }

                      // ],
                      pwd: [
                        {  required: true,message: '密码必填', trigger: 'blur' },
                        {
                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
                            message: '密码须包含数字、字母两种元素，且密码位数为6-16位',
                            trigger: 'blur'
                          }
                      ]

                  },
=======
    import file from "@/components/imgUpload/upload.vue"

    export default {
        components:{
            file
        },
        data() {
            return {
                rows:[],
                total:0,
                loading:false,
                curr_row:null,
                SearchFormData:{
                    real_name:'',
                    page_num:1,
                    page_len:10,
                    order_field:'add_time',
                    order_sort:'desc'
                },
                search_show:false,
                //详细
                detail_show: false,
                DetailFormData:{},
                // 添加
                add_show:false,
                AddFormData:{
                    real_name:'',
                    mobile:'',
                    pwd:'',
                },
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                add_is_social: 0,
                add_sex: 0,
                add_state: 0,
                add_is_marry: 0,
                add_edu_type: 0,
<<<<<<< HEAD
                add_name: '',
=======
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
        
                //编辑
                edit_show:false,
                EditFormData:{
                    real_name:''
                },
                edit_is_social: 0,
                edit_sex: 0,
                edit_state: 0,
                edit_is_marry: 0,
                edit_edu_type: 0,

                //设置角色
                role_show:false,
                role_rows:[],
                RoleFormData:{
                    manage_uuid:'',
                    role_uuid:'',
                },
                setpwd_show: false,
                PwdFormDate: {},
                havaSeatch: false,
                roleColor: '',
                direction: 'rtl',
                EditFormDataState: '0',
                EditFormDataSex: '0',
                EditFormDataEdutype: '0',
                Issocial: '0',
                EditFormDataIsmarry: '0',
                oldEditpwd: ''
            }
        },
        computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            },
            upload_url:() => {
                return store.state.AppData.upload_url;
            },
            img_host:() => {
                return store.state.AppData.img_host;
            }
        },
        created(){this.init();},
        updated() {
            // this.add_show = false
        },
        methods:{
<<<<<<< HEAD
            changeCard() {
                this.$nextTick(() => {
                    if(this.AddFormData.person_code !== null){
                    this.AddFormData.person_code = this.AddFormData.person_code.replace(/[^\d]/g,'')
                    }
                })

            },
            setNames(val){
                console.log(val)
                this.add_name = val
            },
           // 按钮点击 menu:参数数据 local是否本地程序
=======
            // 按钮点击 menu:参数数据 local是否本地程序
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
            onSubMenu(menu, local = false) {util.submenu(menu,this,lime.cookie_get('login_token'), local);},
            // 数据初始化
            init() {
                this.loading = true;
                lime.req('ShopStaffList', {
                    login_token:lime.cookie_get('login_token'),
                    name:this.SearchFormData.real_name,
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                });
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
            },
            // 状态格式化
            stateFormat(state) {
                if (state == 0) {
                    return '待审';
                } else if (state == 1) {
                    return '已审';
                } else {
                    return '作废';
                }
            },
            // 表格数据刷新
            onRefresh() {this.init();},
            // 搜索页面打开
            onSearch() {
                this.search_show = true;
                this.havaSeatch = true
            },
            // 搜索提交
            onSearchSubmit(){
                this.SearchFormData.page_num = 1;
                this.init();
                this.search_show = false
            },
            // 选择单行
            onSelectRow(row){this.curr_row = row;},
            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
            },
            handleSizeChange(val) {console.log(`每页 ${val} 条`);},
            // 排序处理
            onSortChange(sort) {
                this.SearchFormData.order_field = sort.prop;
                if (sort.order == 'ascending') {
                    this.SearchFormData.order_sort  = 'asc';
                } else {
                    this.SearchFormData.order_sort  = 'desc';
                }               
                this.init();
            },
            //详细
            handleDetail() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.DetailFormData = this.curr_row
                this.detail_show = true;
            },
            // 添加展示
            handleAdd() {
                // this.AddFormData = {}
                this.add_show = true;
                // this.$refs.add_drawer.is_show = true
            },
            // 添加向后台提交
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                this.AddFormData.edu_type =  this.add_edu_type
                this.AddFormData.is_marry =  this.add_is_marry
                this.AddFormData.is_social =  this.add_is_social + ''
                this.AddFormData.sex =  this.add_sex
                this.AddFormData.state =  this.add_state//img_code person_code_img0 person_code_img1
                this.AddFormData.person_code_img0 = this.$refs.img_code.img_url
                this.AddFormData.person_code_img1 = this.$refs.imgs_code.img_url
                this.AddFormData.start_time = util.eleDate(this.AddFormData.start_time)
<<<<<<< HEAD
                this.AddFormData.try_time = util.eleDate(this.AddFormData.try_time)
                this.AddFormData.bank_staff_name = this.add_name
=======
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                lime.req('ShopStaffAdd', this.AddFormData).then(res => {
                    this.SearchFormData.page_num = 1;
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
                console.log(this.curr_row)
                this.EditFormData = this.curr_row
                this.edit_is_social = this.EditFormData.is_social == 0 ? 0 : 1,
                this.edit_sex =  this.EditFormData.sex
                this.edit_state = this.EditFormData.state
                this.edit_is_marry = this.EditFormData.is_marry
                this.edit_edu_type = this.EditFormData.edu_type
                this.edit_show =true;
            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');
                this.EditFormData.uuid        = this.curr_row.uuid;
                this.EditFormData.state = this.edit_state;
                this.EditFormData.sex  = this.edit_sex;
                this.EditFormData.edu_type  = this.edit_edu_type;
                this.EditFormData.is_social  = this.edit_is_social + '';
                this.EditFormData.is_marry  = this.edit_is_marry;
<<<<<<< HEAD
                if(this.$refs.edtimg_code.img_url) {
                    this.EditFormData.person_code_img0 = this.$refs.edtimg_code.img_url
                }
                if(this.$refs.edtimg_codes.img_url) {
                    this.EditFormData.s = this.$refs.edtimg_codes.img_url
=======
                if(this.$refs.edit_img.img_url) {
                    this.EditFormData.person_code_img0 = this.$refs.edit_img.img_url
                }
                if(this.$refs.edit_imgs.img_url) {
                    this.EditFormData.s = this.$refs.edit_imgs.img_url
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                }
                lime.req('ShopStaffEdit', this.EditFormData).then(res => {
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
                    lime.req('ShopStaffDel', {
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

            handlChangeSub() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                 this.$confirm('确认更改超管?', '提示').then(() => {
                lime.req({
                        module:'ShopChangeAdmin',
                        ver:'1.0.0',
                        relation_module:'ShopStaffList',
                        relation_ver:'1.0.0'
                    }, {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }).then(cres => {
                       this.init();
                       this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    });
                 })
            },

            // 设置角色
            handleSetRole(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                } 
                console.log(this.curr_row)
                this.RoleFormData.role_uuid =  this.curr_row.role_uuid           
                // 获取当前登录账号拥有的角色
                lime.req({
                    module:'ShopStaffSetRole',
                    ver:'1.0.0',
                    relation_module:'ShopRoleList',
                    relation_ver:'1.0.0'
                }, {    
                    login_token:lime.cookie_get('login_token'),
                }).then(res => {
                    this.role_rows = util.toTree(res.data);
                    this.role_show = true;
                    console.log(this.role_rows)
                })
            },
            // 设置角色提交
            onRoleSubmit(){
                lime.req('ShopStaffSetRole', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid,
                    role_uuid:this.RoleFormData.role_uuid
                }).then(res =>{
                    // this.init,
                    this.role_show=false
                }).catch(err => {
                    this.$message.error(err.msg)
                })
            },
            
            handleResetPwd() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.oldEditpwd = this.curr_row.pwd
                this.setpwd_show = true;

            },
            onPwdSubmit() {
              lime.req('ShopStaffResetPwd', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid,
                    pwd: this.PwdFormDate.pwd
                }).then(res =>{
                    // this.init,
                    this.setpwd_show=false
                }).catch(err => {
                    this.$message.error(err.msg)
                })  
            }
        }
    }
</script>
<style>
    :focus{
        outline:0;
    }
    .el-table tbody tr:hover>td { 
        /* background-color:#f4f8fe!important */
        background-color: #cedbeb!important;
    }
    .el-table__body tr.current-row>td{
        background: #cedbeb!important;
    }

   .el-table--striped .el-table__body tr.el-table__row--striped td {
        background:#f4f8fe;
    }

    .el-drawer__header {
        margin-bottom: 20px !important;
    }

    .draw-content:after {
         content: "";
        height: 20px;
        display: block;

    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .item{
        padding: 0 20px;
    }

    .el-image-viewer__mask {
        opacity: 1!important;
    }


    /* .el-table td, .el-table th {
        text-align: center!important;
    } */
</style>
<style scoped>
 /* @import '../../assets/font/font.css'; */
    .menu{
        display: inline-block;
        padding:0 16px;
        text-align: center;
        font-size: 14px;
        /* font-family: Microsoft YaHei Regular; */
    }

    .page {
        height: 40px; 
        line-height: 40px; 
        text-align: right;
        position: fixed;
        bottom: 40px;
        right:40px;
        overflow: hidden;
    }

    .no_role  {
        color: red;
        cursor: pointer;
    }
    
    .drawer-footer {
        position: fixed;
        bottom: 0;
        width: 50%;
        height: 50px;
        background: white;
        /* border: 1px solid red; */
        padding-right: 20px;
        text-align: right;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
        line-height: 50px;
        z-index: 999;
    }

    


    /* /deep/ :focus {
        outline: 0;
    } */
</style>