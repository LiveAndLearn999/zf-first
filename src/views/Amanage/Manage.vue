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
        <div style="width: 100%;height: 45px;margin-top: 15px;font-size: 14px;padding-left: 20px;box-sizing: border-box">               
                <el-select v-model="search_value" placeholder="请选择" style="width: 100px;margin-right: 10px"  size="small">
                            <el-option
                            v-for="item in search_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> 
                <el-input v-if="search_value == 0" v-model="SearchFormData.real_name" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-input v-else v-model="SearchFormData.mobile" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>
        <!-- 数据表格 -->
        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
            <!-- content  height - 212 + 22  =  height - 190  -->
            <!-- table height - 195 -68 -->
             <!-- 48+ 20  = 268 -->
            <!-- style="border-top: solid 1px #f2f1f4;" -->
            <!-- fontFamily: 'FZCYJ' -->
              <!-- stripe -->
            
            <el-table 
                :data="rows"
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 195 - 68"
                v-loading="loading"
                
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px;" 
                size="mini">
                <!-- element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" -->
                <el-table-column width="80px" type="index" label="序号"></el-table-column>
                <el-table-column align="left" prop="name" label="姓名"></el-table-column>
                <el-table-column align="center" prop="sex" label="性别">
                    <template slot-scope="scope">
                       {{scope.row.sex == 0 ? '保密' :  scope.row.sex == 1 ? '男' : '女'}}
                    </template>
                </el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="person_code" label="身份证号">
                    <template slot-scope="scope">
                       {{scope.row.person_code  ? scope.row.person_code :   '未录入'}}
                    </template>
                </el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="mobile" label="手机号码"></el-table-column>
                <el-table-column align="center" prop="role_name" label="角色" >
                    <template slot-scope="scope">
                        <span class="no_role" v-if="scope.row.role_name == '' ">未设置</span>
                        <span v-else>{{scope.row.role_name}}</span>
                        <!-- {{scope.row.role_name == '' ? '未设置'  : scope.row.role_name}} -->
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip align="center" prop="add_time" label="添加时间" :sortable=true></el-table-column>
                <el-table-column 
                    prop="last_time" 
                    label="最近登录时间" 
                    align="center"
                    show-overflow-tooltip
                    :sortable=true>
                    <template slot-scope="scope">
                        {{scope.row.last_time == 0 ? '还未登陆' : scope.row.last_time}}
                    </template>
                </el-table-column>
              <!--  <el-table-column label="操作" width="230px" align="center">
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
                </el-table-column> -->
            </el-table>

            <div class="page" :style="{width:width - 280 + 'px'}">
                <!-- <span class="demonstration">直接前往</span> -->
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
                :page-sizes="[10]"
                layout="total, sizes, prev, pager, next, jumper"

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
            <el-form :model="SearchFormData" label-width="120px" label-position="right">
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
            <div class="draw-content" :style="{height:height - 80 +'px',paddingLeft: 60 + 'px'}">
                <el-form :model="DetailFormData" label-width="140px" label-position="right">
                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">基本信息</div>
                    </div>
                    <el-row style="margin-top: 30px;min-width: 500px">
                            <el-col :span="12">
                                 <el-form-item prop="name" label="员工名称:">{{DetailFormData.name || '---' }}</el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="mobile" label="登录手机号:">{{DetailFormData.mobile || '---' }}</el-form-item>
                            </el-col>
                    </el-row>
                    <el-row>
                            <el-col :span="12">
                                  <el-form-item prop="pwd" label="密码:">{{DetailFormData.pwd || '---' }}</el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="状态:" required>
                                    {{DetailFormData.state == 1 ?  '启用' : '冻结' }}
                            </el-form-item> 
                            </el-col>
                    </el-row> 
                     <el-row>
                            <el-col :span="12">
                                  <el-form-item label="性别:">
                                      {{DetailFormData.sex == 1 ? '男' : '女'}}
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="受教育类型:">
                                    <span v-if="DetailFormData.edu_type == 0 "> 保密</span>
                                    <span v-else-if="DetailFormData.edu_type == 1">初中及以上</span>
                                    <span v-else-if="DetailFormData.edu_type == 2">高中及以上</span>
                                    <span v-else-if="DetailFormData.edu_type == 3">大专及以上</span>
                                    <span v-else-if="DetailFormData.edu_type == 4">本科及以上</span>
                                    <span v-else>研究生及以上</span>
                                </el-form-item>
                            </el-col>
                    </el-row>           
                     <el-row>
                            <el-col :span="12">
                                 <el-form-item label="婚姻状况:">
                                    <span v-if="DetailFormData.is_marry == 0 ">未婚</span>
                                    <span v-else-if="DetailFormData.is_marry == 1 ">已婚</span>
                                    <span v-else-if="DetailFormData.is_marry == 2 ">离异</span>
                                    <span v-else>丧偶</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="民族:">
                                    {{DetailFormData.nation}}
                                </el-form-item>
                            </el-col>
                    </el-row> 
                     <el-form-item label="身份证号:">
                        {{DetailFormData.person_code}}
                     </el-form-item>
                    <el-form-item label="当前居住地:">
                        {{DetailFormData.now_addr}}
                    </el-form-item>
                    <el-form-item label="籍贯所在地:">
                        {{DetailFormData.home_addr}}
                    </el-form-item>
                     <el-form-item label="身份证正面:">
                                <el-tooltip  v-if="DetailFormData.person_code_img0" class="item" effect="dark" content="点击查看大图" placement="top-start">
                                    <el-image 
                                    style="width: 30px; height: 30px"
                                    :src="DetailFormData.person_code_img0" 
                                    :preview-src-list="[DetailFormData.person_code_img0]">
                                </el-image>
                                </el-tooltip>
                                <span v-else>未上传</span>
                    </el-form-item>
                    <el-form-item label="身份证反面:">
                            <el-tooltip v-if="DetailFormData.person_code_img1" class="item" effect="dark" content="点击查看大图" placement="top-start">
                                <el-image 
                                style="width: 30px; height: 30px"
                                :src="DetailFormData.person_code_img1" 
                                :preview-src-list="[DetailFormData.person_code_img1]">
                            </el-image>
                          </el-tooltip>
                        <span v-else>未上传</span>
                    </el-form-item>

                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">财务信息</div>
                    </div>
                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="银行卡号:">
                                {{DetailFormData.bank_code || '---'}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="银行名称:" @input="bankInput">
                                {{DetailFormData.bank_name || '---'}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="银行卡姓名:">
                                {{DetailFormData.bank_staff_name || '---'}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="薪资:">
                            {{((DetailFormData.salary - 0) / 100) + '元' || '---'}}
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否已交社保:">
                                <span v-if="DetailFormData.is_social == 0 ">未交</span>
                                <span v-else>已交</span>
                            </el-form-item> 
                        </el-col>
                    </el-row>

                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">其他信息</div>
                    </div>
                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="入职时间:">
                                {{DetailFormData.start_time}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                            <el-form-item label="试用期时间:">
                                {{DetailFormData.try_time}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="12">
                             <el-form-item label="紧急联系人:">
                               {{DetailFormData.emergency_contact || '---' }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                            <el-form-item  label="紧急联系电话:" prop="mobiles">
                                {{DetailFormData.emergency_conttel}}             
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="与紧急联系人关系:">
                                {{DetailFormData.emergency_about}}
                            </el-form-item>
                        </el-col>
                    </el-row>
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
            :direction="direction" :size="drawerWidth" style="min-width: 600px">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form ref="addForm" :model="AddFormData" label-width="140px" label-position="right" :rules="rules">
                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">基本信息</div>
                    </div>
                    <el-row style="margin-top: 30px;min-width: 500px">
                            <el-col :span="12">
                                 <el-form-item prop="name" label="员工名称:"><el-input @input="setNames" class="width_240" maxlength="12"  v-model="AddFormData.name" /></el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="mobile" label="登录手机号:"><el-input maxlength="11" class="width_240" v-model="AddFormData.mobile" /></el-form-item>
                            </el-col>
                    </el-row>
                    <el-row>
                            <el-col :span="12">
                                  <el-form-item prop="pwd" label="密码:"><el-input class="width_240" v-model="AddFormData.pwd" minlength="6" maxlength="20"/></el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="状态:" required>
                                    <el-select v-model="add_state" placeholder="请选择">
                                        <el-option
                                        v-for="item in state_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                            </el-form-item> 
                            </el-col>
                    </el-row> 
                     <el-row>
                            <el-col :span="12">
                                  <el-form-item label="性别:">
                                      <el-select v-model="add_sex" placeholder="请选择">
                                        <el-option
                                        v-for="item in sex_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- AddFormData.sex -->
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="受教育类型:">
                                    <el-select v-model="add_edu_type" placeholder="请选择">
                                        <el-option
                                        v-for="item in edu_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- <el-radio-group v-model="add_edu_type">
                                        <el-radio :label="0">保密</el-radio>
                                        <el-radio :label="1">初中及以上</el-radio>
                                        <el-radio :label="2">高中及以上</el-radio>
                                        <el-radio :label="3">大专及以上</el-radio>
                                        <el-radio :label="4"> 本科及以上</el-radio>
                                        <el-radio :label="5"> 研究生及以上</el-radio>
                                    </el-radio-group> -->
                                    <!-- AddFormData.edu_type -->
                                </el-form-item>
                            </el-col>
                    </el-row>           
                     <el-row>
                            <el-col :span="12">
                                 <el-form-item label="婚姻状况:">
                                    <el-select v-model="add_is_marry" placeholder="请选择" >
                                        <el-option
                                        class="width_240"
                                        v-for="item in marry_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <!-- <el-radio-group v-model="add_is_marry">
                                        <el-radio :label="0">未婚</el-radio>
                                        <el-radio :label="1">已婚</el-radio>
                                        <el-radio :label="2">离异</el-radio>
                                        <el-radio :label="3">丧偶</el-radio>`
                                    </el-radio-group> -->
                                    <!-- AddFormData.is_marry -->
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="民族:">
                                    <el-select v-model="add_nation" placeholder="请选择"
                                    filterable 
                                    >
                                        <el-option
                                        class="width_240"
                                        v-for="item in nation_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                    </el-row> 
                     <el-form-item label="身份证号:" >
                        <el-input v-model="AddFormData.person_code" @blur="codeBlur"  maxlength="18"
></el-input>
                        <div class="el-form-item__error" v-if="code_err">{{code_msg}}</div>
                     </el-form-item>
                    <el-form-item label="当前居住地:">
                        <el-input style="min-width: 240px" v-model="AddFormData.now_addr" />
                    </el-form-item>
                    <el-form-item label="籍贯所在地:">
                        <el-input style="min-width: 240px" v-model="AddFormData.home_addr" />
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="身份证正面:">
                                <file ref="img_code" :iconUrl="iconUrl" class="width_240"/>
                                <!-- <el-input v-model="AddFormData.person_code_img0" /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="身份证反面:">
                                <file ref="imgs_code" :iconUrl="iconUrls" class="width_240"/>
                                <!-- <el-input v-model="AddFormData.person_code_img1" /> -->
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">财务信息</div>
                    </div>
                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="银行卡号:">
                                <el-input onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" @blur="bankBlur" maxlength="19" style="min-width: 240px" v-model="AddFormData.bank_code" />
                                <div class="el-form-item__error" v-if="bank_code_err">银行卡格式不正确</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="银行名称:" @input="bankInput">
                                <el-input maxlength="20" style="min-width: 240px" v-model="AddFormData.bank_name" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="银行卡姓名:">
                                <!-- <el-input style="width: 260px" v-model="AddFormData.bank_staff_name" /> -->
                                <el-input @input="nameInput" style="min-width: 240px" v-model="add_name" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="薪资:">
                                <el-input-number align="right"  controls-position="right" v-model="AddFormData.salary" :min="1" :max="100000" ></el-input-number> 元/月
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                             <el-form-item label="是否已缴社保:">
                                <el-select v-model="add_is_social" placeholder="请选择">
                                    <el-option
                                    v-for="item in social_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <!-- <el-radio-group v-model="add_is_social">
                                    <el-radio :label="0">未缴</el-radio>
                                    <el-radio :label="1">已缴</el-radio>
                                </el-radio-group> -->
                            </el-form-item> 
                        </el-col>
                    </el-row>

                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">其他信息</div>
                    </div>
                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="入职时间:">
                                <el-date-picker
                                    class="width_240"
                                    v-model="add_start_time"
                                    type="date"
                                    :picker-options="pickerOptions0"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                                <!-- <el-input v-model="AddFormData.start_time" /> -->
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="2" class="bktrsp">11</el-col> -->
                        <el-col :span="12" >
                            <el-form-item label="试用期时间:">
                                <el-date-picker
                                class="width_240"
                                    v-model="add_try_time"
                                    type="date"
                                    :picker-options="pickerOptions1"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                                <!-- <el-input v-model="AddFormData.try_time" /> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="12">
                             <el-form-item label="紧急联系人:">
                                <el-input class="width_240" maxlength="20"  v-model="AddFormData.emergency_contact" />
                            </el-form-item>
                        </el-col>
                       <!-- <el-col :span="2" class="bktrsp">11</el-col> -->
                        <el-col :span="12" >
                            <el-form-item  label="紧急联系电话:">
                                <!-- onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" -->
                           <el-input maxlength="11" class="width_240" @blur="conttelBlur" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" v-model="AddFormData.emergency_conttel" />
                           <div class="el-form-item__error" v-if="emergency_conttel_err">手机号格式不正确</div>
                            </el-form-item>
                           <!-- <div class="form-item">
                                <label class="form-item-label">与紧急联系人关系:</label><el-input style="width: 128px"  maxlength="10"  v-model="AddFormData.emergency_about" />
                           </div> -->
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="与紧急联系人关系:">
                                <el-select v-if="add_about != 6" v-model="add_about" placeholder="请选择">
                                        <el-option
                                        v-for="item in about_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input type="text" v-else v-model="add_about_text"></el-input>
                                <!-- <el-input   maxlength="10"  v-model="AddFormData.emergency_about" /> -->
                            </el-form-item>
                        </el-col>
                    </el-row>

                    
                    <!-- <el-form-item label="民族:">
                        <el-input style="min-width: 240px" v-model="AddFormData.nation" />
                    </el-form-item> -->
                </el-form>
            </div>
            <div  class="drawer-footer">
                <span slot="footer">
                    <el-button @click="add_show = false">取消</el-button>
                    <el-button @click="onAddSubmit" type="primary">确定</el-button>
                </span>
            </div>
        </el-drawer>

        <!-- 编辑模板 -->
        <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            :direction="direction" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="EditFormData" label-width="140px" label-position="right">
                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">基本信息</div>
                    </div>
                    <el-row style="margin-top: 30px;">
                            <el-col :span="12">
                                 <el-form-item label="员工名称:"><el-input class="width_240" maxlength="12"  v-model="EditFormData.name" /></el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="状态:">
                                    <el-select v-model="edit_state" placeholder="请选择">
                                        <el-option
                                        v-for="item in state_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                            </el-form-item> 
                            </el-col>
                    </el-row>
                    <!--  -->
                    <el-row>
                            <el-col :span="12">
                                  <el-form-item label="性别:">
                                      <el-select v-model="edit_sex" placeholder="请选择">
                                        <el-option
                                        v-for="item in sex_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="受教育类型:">
                                    <el-select v-model="edit_edu_type" placeholder="请选择">
                                        <el-option
                                        v-for="item in edu_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                    </el-row>           
                     <el-row>
                            <el-col :span="12">
                                 <el-form-item label="婚姻状况:">
                                    <el-select v-model="edit_is_marry" placeholder="请选择" >
                                        <el-option
                                        class="width_240"
                                        v-for="item in marry_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="民族:">
                                    <el-select v-model="edit_nation" placeholder="请选择"
                                    filterable >
                                        <el-option
                                        class="width_240"
                                        v-for="item in nation_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                    </el-row> 
                     <el-form-item label="身份证号:">
                        <el-input v-model="EditFormData.person_code" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="18"
></el-input>
                     </el-form-item>
                    <el-form-item label="当前居住地:">
                        <el-input  v-model="EditFormData.now_addr" />
                    </el-form-item>
                    <el-form-item label="籍贯所在地:">
                        <el-input v-model="EditFormData.home_addr" />
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="身份证正面:">
                                <file ref="edtimg_code" :imgUrl="EditFormData.person_code_img0" :iconUrl="iconUrl" class="width_240"/>
                                <!-- <el-input v-model="AddFormData.person_code_img0" /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="身份证反面:">
                                <file ref="edtimg_codes" :imgUrl="EditFormData.person_code_img1" :iconUrl="iconUrls" class="width_240"/>
                                <!-- <el-input v-model="AddFormData.person_code_img1" /> -->
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">财务信息</div>
                    </div>
                    <el-row  style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="银行卡号:">
                                <el-input onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="19"  v-model="EditFormData.bank_code" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="银行名称:" @input="bankInput">
                                <el-input maxlength="20" style="min-width: 240px" v-model="EditFormData.bank_name" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="银行卡姓名:">
                                <!-- <el-input style="width: 260px" v-model="AddFormData.bank_staff_name" /> -->
                                <el-input @input="nameInput" v-model="edit_name" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="薪资:">
                                <el-input-number  controls-position="right" v-model="EditFormData.salary" :min="1" :max="100000" ></el-input-number> 元/月
                                </el-form-item>
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="12">
                             <el-form-item label="是否已缴社保:">
                                <el-select v-model="edit_is_social" placeholder="请选择">
                                    <el-option
                                    v-for="item in social_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                    </el-row>

                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">其他信息</div>
                    </div>
                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="入职时间:">
                                <el-date-picker
                                    class="width_240"
                                    v-model="edit_start_time"
                                    type="date"
                                     :picker-options="pickerOptions2"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                            <el-form-item label="试用期时间:">
                                <el-date-picker
                                class="width_240"
                                    v-model="edit_try_time"
                                     :picker-options="pickerOptions3"
                                    type="date"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="12">
                             <el-form-item label="紧急联系人:">
                                <el-input class="width_240" maxlength="20"  v-model="EditFormData.emergency_contact" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                            <el-form-item  label="紧急联系电话:" prop="mobiles">
                           <el-input maxlength="11" class="width_240" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" v-model="EditFormData.emergency_conttel" />
                           </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="与紧急联系人关系:">
                                <el-select v-if="edit_about != 6" v-model="edit_about" placeholder="请选择">
                                        <el-option
                                        v-for="item in about_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                <el-input type="text" v-else v-model="edit_about_text"></el-input>
                                <!-- <el-input   maxlength="10"  v-model="EditFormData.emergency_about" /> -->
                            </el-form-item>
                        </el-col>
                    </el-row>




                    
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
                        ref="cascaderHandle"
                        :options="role_rows"
                        expand-trigger="hover" 
                        :props="{checkStrictly: true,cexpandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                        placeholder="请选择"
                        @change="close"
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
            <el-form :model="PwdFormDate" ref="pwdForm" label-width="120px" label-position="right" :rules="rules">
                <el-form-item label="新密码:" prop="pwd">
                    <el-input v-model="PwdFormDate.old_pwd" show-password type="password"/>
                </el-form-item>
                <el-form-item label="确认新密码:" prop="pwd">
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
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    // import file from "@/components/imgUpload/upload.vue"
    import file from "@/components/imgUpload/draploads.vue"
    // import drawer from "@/components/drawer/drawer.vue"
    export default {
        components:{
            file,
            // drawer,
        },
        data() {
            let that = this;
            return { 
                add_about_text: '',
                edit_about_text: '',

                bank_code_err: false,
                code_err: false,
                code_msg: '身份证格式不正确', 
                emergency_conttel_err: false,


                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                    }
                }, 
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < new Date(that.add_start_time).getTime() + 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                    }
                }, 
                add_start_time: new Date(),
                add_try_time: new Date(),
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                    }
                }, 
                pickerOptions3: {
                    disabledDate(time) {
                        return time.getTime() < new Date(that.edit_start_time).getTime() + 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                    }
                }, 
                edit_start_time: '',
                edit_try_time: '',
                iconUrls: false,
                iconUrl: true, 
                drawerWidth: '50%',           
                rows:[],
                total:0,
                loading:false,
                curr_row:null,
                
                SearchFormData:{
                    real_name:'',
                    page_num:1,
                    page_len:10,
                    order_field:'add_time',
                    order_sort:'desc',
                    mobile: ''
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
                        { required: true, message: '员工姓名必填', trigger: 'blur' },
                        { 
                             pattern: /^[\u4E00-\u9FA5]{2,20}$/,
                            message: '员工名称须为汉字，且位数为2-20位',
                            trigger: 'blur'
                            // min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' 
                        }
                      ],
                      names: [
                        { required: true, message: '员工姓必填', trigger: 'blur' },
                        { 
                             pattern: /^[\u4E00-\u9FA5]{2,20}$/,
                            message: '员工名称须为汉字，且位数为2-20位',
                            trigger: 'blur' 
                        }
                      ],
                      mobile: [
                        {max: 11,required: true, message: '登录手机号必填', trigger: 'blur' },
                        {
                            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                            message: '手机号格式不对',
                            trigger: 'blur'
                          }
                    ],
                    // mobiles: [{
                    //     type: 'number',
                    //     trigger: 'blur',
                    //     required: false,
                    //     message: '平均用例运行时长必须为数字值',
                    //     // pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                    //     transform (value) {
                    //     return _.toNumber(value)
                    //     }
                    // }],
                    mobiles: [
                        {max: 11,required: false, message: '请输入手机号', trigger: 'blur' },
                        {
                            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                            message: '手机号格式不对',
                            trigger: 'blur'
                          }
                    ],
                    pwd: [
                        {  required: true,message: '密码必填', trigger: 'blur' },
                        {
                            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
                            message: '密码须由6-20位数字/字母/特殊字符中两种元素组成',
                            trigger: 'blur'
                          }
                      ]

                  },
                add_is_social: 0,
                add_sex: 0,
                add_state: 1,
                add_is_marry: 0,
                add_edu_type: 0,
                add_about: 0,
                edit_about: 0,
                about_options: [
                     {value: 0,label: '父母'},
                     {value: 1,label: '配偶'},
                     {value: 2,label: '兄弟'},
                     {value: 3,label: '姐妹'},
                     {value: 4,label: '朋友'},
                     {value: 5,label: '子女'},
                     {value: 6,label: '其他'}
                ],
                add_name: '',
                edu_options: [
                     {value: 0,label: '保密'},
                     {value: 1,label: '初中及以上'},
                     {value: 2,label: '高中及以上'},
                     {value: 3,label: '大专及以上'},
                     {value: 4,label: '本科及以上'},
                     {value: 5,label: '研究生及以上'}
                ],
                marry_options: [
                    {value: 0,label: '未婚'},
                    {value: 1,label: '已婚'},
                    {value: 2,label: '离异'},
                    {value: 3,label: '丧偶'}
                ],
                state_options: [
                    {value: 0,label: '冻结'},
                    {value: 1,label: '启用'},
                ],
                sex_options: [
                    {value: 0,label: '保密'},
                    {value: 1,label: '男'},
                    {value: 2,label: '女'},
                ],
                social_options: [
                    {value: 0,label: '未缴'},
                    {value: 1,label: '已缴'},
                ],
                search_options: [
                    {value: 0,label: '姓名'},
                    {value: 1,label: '手机号'},
                ],
                search_value: 0,
                add_nation: 0,
                nation_options: [
                    {value: 0,label: '汉族'},
                    {value: 1,label: '蒙古族'},
                    {value: 2,label: '回族'},
                    {value: 3,label: '藏族'},
                    {value: 4,label: '维吾尔族'},
                    {value: 5,label: '苗族'},
                    {value: 6,label: '彝族'},
                    {value: 7,label: '壮族'},
                    {value: 8,label: '布依族'},
                    {value: 9,label: '朝鲜族'},
                    {value: 10,label: '满族'},
                    {value: 11,label: '侗族'},
                    {value: 12,label: '瑶族'},
                    {value: 13,label: '白族'},
                    {value: 14,label: '土家族'},
                    {value: 15,label: '哈尼族'},
                    {value: 16,label: '哈萨克族'},
                    {value: 17,label: '傣族'},
                    {value: 18,label: '黎族'},
                    {value: 19,label: '傈僳族'},
                    {value: 20,label: '佤族'},
                    {value: 21,label: '畲族'},
                    {value: 22,label: '高山族'},
                    {value: 23,label: '拉祜族'},
                    {value: 24,label: '水族'},
                    {value: 25,label: '东乡族'},
                    {value: 26,label: '纳西族'},
                    {value: 27,label: '景颇族'},
                    {value: 28,label: '柯尔克孜族'},
                    {value: 29,label: '土族'},
                    {value: 30,label: '达斡尔族'},
                    {value: 31,label: '仫佬族'},
                    {value: 32,label: '羌族'},
                    {value: 33,label: '布朗族'},
                    {value: 34,label: '撒拉族'},
                    {value: 35,label: '毛南族'},
                    {value: 36,label: '仡佬族'},
                    {value: 37,label: '锡伯族'},
                    {value: 38,label: '阿昌族'},
                    {value: 39,label: '普米族'},
                    {value: 40,label: '塔吉克族'},
                    {value: 41,label: '怒族'},
                    {value: 42,label: '乌孜别克族'},
                    {value: 43,label: '俄罗斯族'},
                    {value: 44,label: '鄂温克族'},
                    {value: 45,label: '德昂族'},
                    {value: 46,label: '保安族'},
                    {value: 47,label: '裕固族'},
                    {value: 48,label: '京族'},
                    {value: 49,label: '塔塔尔族'},
                    {value: 50,label: '独龙族'},
                    {value: 51,label: '鄂伦春族'},
                    {value: 52,label: '赫哲族'},
                    {value: 53,label: '门巴族'},
                    {value: 54,label: '珞巴族'},
                    {value: 55,label: '基诺族'}
                ],
        
                //编辑
                edit_show:false,
                EditFormData:{
                    real_name:''
                },
                edit_name: '',
                edit_is_social: 0,
                edit_sex: 0,
                edit_state: 0,
                edit_is_marry: 0,
                edit_edu_type: 0,
                edit_nation: 0,

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
        mounted() {
            // this.screenWidth = document.body.clientWidth
            // window.onresize = () => {
            //     console.log(99999)
            //     this.width = document.body.clientWidth
            //     console.log(this.width)
            //     console.log(document.body.clientWidth)
            //     if(860/document.body.clientWidth < 1) {
            //         this.drawerWidth = 860/document.body.clientWidth*100 + '%'
            //     }else {
            //         this.drawerWidth = '100%'
            //     }
            // };
            // let self = this;
            // this.screenWidth = document.body.clientWidth; //767
            // this.screenHeight = document.body.clientHeight;//350
            // window.onresize = () => {
            //     console.log(99999)
            //     if(860/document.body.clientWidth < 1) {
            //         this.drawerWidth = 860/document.body.clientWidth*100 + '%'
            //     }else {
            //         this.drawerWidth = '100%'
            //     }
            // };
        },
        methods:{
            // code_err  code_msg
            codeBlur() {
                if(this.AddFormData.person_code) {
                      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                      if(!reg.test(this.AddFormData.person_code)){
                          this.code_err = true;
                      }else {
                           this.code_err = false;
                      }

                }
                // alert()
            }, 
            bankBlur() {
                let regExp = /^([1-9]{1})(\d{15}|\d{18})$/; 
                if(this.AddFormData.bank_code) {
                    if(!regExp.test(this.AddFormData.bank_code)) {
                        this.bank_code_err = true
                    }
                    else {
                        this.bank_code_err = false
                    }
                }

                // bank_code_err
            },

             conttelBlur() {
                //  emergency_conttel_err
                if(this.AddFormData.emergency_conttel) {
                    if(!(/^1[3456789]\d{9}$/.test(this.AddFormData.emergency_conttel))){ 
                    this.emergency_conttel_err = true
                    } 
                    else {
                    this.emergency_conttel_err = false 
                    }

                }
             },

            // remoteMethod(query) {
            //     if (query !== '') {
            //         this.loading = true;
            //         setTimeout(() => {
            //             this.loading = false;
            //             this.options = this.list.filter(item => {
            //             return item.label.toLowerCase()
            //                 .indexOf(query.toLowerCase()) > -1;
            //             });
            //         }, 200);
            //     } else {
            //     this.options = [];
            //     }

            //     this.nation_options = this.nation_options.filter(item => {
            //         return item.label.indexOf(query.toLowerCase()) > -1;
            //   item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            //     });

            // }, 
            close(val){
                this.$refs.cascaderHandle.dropDownVisible = false;
            },
            nameInput(val) {
                console.log(val)
                let reg = /^[\u4E00-\u9FA5]$/
                if(reg.test(val)){
                    this.add_name = val
                }else {
                    var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g; 
                    this.add_name = val.replace(regEx, ''); 
                }
            },
            bankInput(val) {
                let reg = /^[\u4E00-\u9FA5]$/
                if(reg.test(val)){
                    this.AddFormData.bank_name = val
                    val = val
                }else {
                    var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g; 
                    // this.AddFormData.bank_name = val.replace(regEx, ''); 
                    val = val.replace(regEx, '');
                }
            },
           
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
            onSubMenu(menu, local = false) {util.submenu(menu,this,lime.cookie_get('login_token'), local);},
            // 数据初始化
            init() {
                // this.loading = true;
                NProgress.start();
                lime.req('ShopStaffList', {
                    login_token:lime.cookie_get('login_token'),
                    name:this.SearchFormData.real_name,
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort,
                    mobile: this.SearchFormData.mobile
                }).then(res => {
                    // this.loading = false;
                    NProgress.done()
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                }).catch( err => {
                    this.$message.error(err)
                    // this.$router.push('/login');
                });
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                    // this.$router.push('/login');
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
                if(this.search_value == 0) {
                    this.SearchFormData.mobile = ''
                }else {
                    this.SearchFormData.real_name = ''
                }
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
                this.$refs['addForm'].validateField('mobiles', phoneError => { //验证手机号码是否正确
                    if (!phoneError) {
                        return false
                    } else {
                        return false;
                    }
                })
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

                if(this.AddFormData.bank_staff_name || this.AddFormData.bank_name || this.AddFormData.bank_code) {
                    if(!this.AddFormData.bank_staff_name || !this.AddFormData.bank_name || !this.AddFormData.bank_code) {
                        this.$message.error('请完善银行卡号/银行名称/银行卡姓名信息')
                        return;
                    }else {
                       if(this.bank_code_err)  {
                        this.$message.error('银行卡号格式有误')
                        return;
                       }
                    }
                }

            //      codeBlur() {
            //     if(this.AddFormData.person_code) {
            //           let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            //           if(!reg.test(this.AddFormData.person_code)){
            //               this.code_err = true;
            //           }else {
            //                this.code_err = false;
            //           }

            //     }
                
            // }, 
            // bankBlur() {
            //     let regExp = /^([1-9]{1})(\d{15}|\d{18})$/; 
            //     if(this.AddFormData.bank_code) {
            //         if(!regExp.test(this.AddFormData.bank_code)) {
            //             this.bank_code_err = true
            //         }
            //         else {
            //             this.bank_code_err = false
            //         }
            //     }

               
            // },

            //  conttelBlur() {
               
            //     if(this.AddFormData.emergency_conttel) {
            //         if(!(/^1[3456789]\d{9}$/.test(this.AddFormData.emergency_conttel))){ 
            //         this.emergency_conttel_err = true
            //         } 
            //         else {
            //         this.emergency_conttel_err = false 
            //         }

            //     }
            //  },
                
                NProgress.start();
                this.AddFormData.emergency_about = this.add_about !=6 ?  this.about_options[this.add_about].label : this.add_about_text
                this.AddFormData.nation = this.nation_options[this.add_nation].label
                this.AddFormData.login_token = lime.cookie_get('login_token');
                this.AddFormData.edu_type =  this.add_edu_type
                this.AddFormData.is_marry =  this.add_is_marry
                this.AddFormData.is_social =  this.add_is_social + ''
                this.AddFormData.sex =  this.add_sex
                this.AddFormData.state =  this.add_state
                this.AddFormData.salary = this.AddFormData.salary ? this.AddFormData.salary * 100 : 0
                this.AddFormData.person_code_img0 = this.$refs.img_code.img_url
                this.AddFormData.person_code_img1 = this.$refs.imgs_code.img_url
                this.AddFormData.start_time = util.eleDate(this.add_start_time)
                this.AddFormData.try_time = util.eleDate(this.add_start_time)
                this.AddFormData.bank_staff_name = this.add_name
                lime.req('ShopStaffAdd', this.AddFormData).then(res => {
                    this.SearchFormData.page_num = 1;
                    this.init();
                    this.add_show = false;
                    NProgress.done()
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
                if(this.curr_row.emergency_about) {
                    let itms = this.about_options.filter(item => {
                            return item.label.indexOf(this.curr_row.emergency_about) > -1;                            
                        });
                        console.log(9999)
                        console.log(itms)
                    if(itms[0]) {
                        this.edit_about = itms[0].value ? itms[0].value : 0;
                    }else {
                         this.edit_about = 6
                         this.edit_about_text = this.curr_row.emergency_about
                    }
                }
                console.log(this.curr_row)
                // this.AddFormData.nation = this.nation_options[this.add_nation]
                if(this.curr_row.nation) {
                       let itms = this.nation_options.filter(item => {
                            return item.label.indexOf(this.curr_row.nation) > -1;                            
                        });
                        console.log(itms)
                        this.edit_nation = itms[0].value
                }else {
                    this.edit_nation = 0
                }
                // this.edit_nation = this.curr_row.nation ? '' : 0
                this.edit_start_time = this.curr_row.start_time
                this.edit_try_time = this.curr_row.try_time
                this.EditFormData = this.curr_row
                this.edit_name = this.curr_row.bank_staff_name
                this.edit_is_social = this.EditFormData.is_social == 0 ? 0 : 1,
                this.edit_sex =  this.EditFormData.sex
                this.edit_state = this.EditFormData.state
                this.edit_is_marry = this.EditFormData.is_marry
                this.edit_edu_type = this.EditFormData.edu_type
                this.edit_show =true;
            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');
                this.EditFormData.emergency_about = this.edit_about != 6 ? this.about_options[this.edit_about].label : this.edit_about_text
                this.EditFormData.nation = this.nation_options[this.edit_nation].label
                this.EditFormData.uuid        = this.curr_row.uuid;
                this.EditFormData.state = this.edit_state;
                this.EditFormData.sex  = this.edit_sex;
                this.EditFormData.edu_type  = this.edit_edu_type;
                this.EditFormData.is_social  = this.edit_is_social + '';
                this.EditFormData.is_marry  = this.edit_is_marry;
                if(this.$refs.edtimg_code.img_url) {
                    this.EditFormData.person_code_img0 = this.$refs.edtimg_code.img_url
                }
                if(this.$refs.edtimg_codes.img_url) {
                    this.EditFormData.person_code_img1 = this.$refs.edtimg_codes.img_url
                }
                 NProgress.start(); 
                lime.req('ShopStaffEdit', this.EditFormData).then(res => {
                    this.init();
                    this.edit_show = false;
                    NProgress.done()
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
                NProgress.start(); 
                this.$confirm('确认删除?', '提示').then(() => {
                    lime.req('ShopStaffDel', {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }).then(res => {
                        this.init();
                        this.$message.success('操作成功');
                        NProgress.done()
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
                NProgress.start(); 
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
                    // this.init()
                    console.log(this.role_rows)
                    NProgress.done()
                })
            },
            // 设置角色提交
            onRoleSubmit(){
                NProgress.start(); 
                // console.log(this.curr_row.uuid)
                lime.req('ShopStaffSetRole', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid,
                    role_uuid:this.RoleFormData.role_uuid
                }).then(res =>{
                    this.init()
                    this.role_show=false
                    NProgress.done()
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
                this.$refs['pwdForm'].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                if(this.PwdFormDate.pwd !== this.PwdFormDate.old_pwd) {
                    this.$message.error('两次密码不一致')
                    return;
                }
                 NProgress.start(); 
              lime.req('ShopStaffResetPwd', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid,
                    pwd: this.PwdFormDate.pwd
                }).then(res =>{
                    // this.init,
                    this.setpwd_show=false
                    NProgress.done()
                }).catch(err => {
                    this.$message.error(err.msg)
                })  
            }
        }
    }
</script>
<style>
    .form-item {
       text-align: right;
       width: 100%;
       text-align: right;
       /* margin-top: 20px; */
    }
    .form-item-label {
        color: #606266;
        font-size: 14px;
        margin-right: 10px;
        /* display: inline-block; */
        /* width: 120px */
    }
    .bktrsp {
        color: transparent;
    }
    .row-flex {
        display: flex;
        flex-direction: row;
        border: 1px solid red;
        height: 36px;
        margin-top: 10px
    }
    .row-flexlf {
        height: 100%;
        border: 1px solid green;
    }
    .row-flexrg {
        height: 100%;
        border: 1px solid black;
    }
    :focus{
        outline:0;
    }

    .el-form-item__error {
        z-index: 999
    }

    /* 表格内背景颜色 */
 /* .el-table th, .el-table tr,.el-table td{
    border: 0;
    background-color: transparent;
    } */
    .el-table tbody tr:hover>td { 
        background-color: #cedbeb!important;
    }
    .el-table__body tr.current-row>td{
        background: #cedbeb!important;
    }

    /* .el-table--striped .el-table__body tr {
        background:#f4f8fe;
        border:  1px solid red;
    } */

   .el-table--striped .el-table__body tr.el-table__row--striped td {
        background:#f4f8fe;
        /* border:  1px solid red; */
    }

    .el-drawer__header {
        margin-bottom: 20px !important;
    }

    .draw-content {
        width: 100%;
        overflow: auto;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        padding-bottom: 30px;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
    }

    .draw-content:after {
         content: "";
        height: 30px;
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

    .el-cascader-panel .el-radio{ 
        width: 100%;
        height: 100%;
        z-index: 10; 
        position: absolute; 
        top: 10px;
        right: 10px; 
  } 
  .el-cascader-panel .el-radio__input{ 
     visibility: hidden; 
   } 
   .el-cascader-panel .el-cascader-node__postfix{ 
     top: 10px;
   } 
   .el-col {
       /* text-align: right; */
   }

   .el-input-number .el-input__inner {
       text-align: left;
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
        /* line-height: 40px;  */
        text-align: right;
        position: fixed;
        bottom: 20px;
        right:40px;
        overflow: hidden;
        /* background: #f4f8fe; */
        /* border: 1px solid red; */
        z-index: 999;
        padding-top:  10px;
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

    .line {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #F2F2F2;
    }

    .linelf {
        width: 2%;
        height: 100%;
    }

    .linerg {
        width: 98%;
        height: 100%;
        line-height: 30px;
        font-size: 14px;
        color: #2a2f3b;
    }

    .line-line {
        width: 2px;
        height: 16px;
        margin-top: 7px;
        background: #0F7BF6;
    }

    .width_240 {
        /* width: 212px; */
    }

    


    /* /deep/ :focus {
        outline: 0;
    } */
</style>