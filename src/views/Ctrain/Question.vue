<!--
 * @Author: your name
 * @Date: 2020-09-10 17:26:53
 * @LastEditTime: 2020-09-10 17:27:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/Question.vue
-->
<!-- 试题管理 -->
<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right;font-size: 16px ">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <!-- <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link> -->

                        <el-link
                            class="menu" 
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus" 
                            :key="index">
                            {{item.name}}
                        </el-link>

                        <!-- <el-link @click="onSubMenu('onAddOption',true)" class="menu">添加选项</el-link> -->
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
                <el-input v-model="SearchFormData.title" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

        <!-- 数据表格 -->
        <div :style="{height: height - 190 - 14 + 'px',background: 'white'}">
            <el-table         
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{height: '48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :data="rows"
                :height="height - 195 - 68"
                v-loading="loading"
                element-loading-text="拼命加载中"               
                element-loading-background="rgba(0, 0, 0, 0.1)"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%；margin-top: 5px;" 
                size="mini">
                <el-table-column type="index" width="80px" label="#"></el-table-column>
                <el-table-column prop="title" show-overflow-tooltip label="题目" align="left"></el-table-column>
                <!-- <el-table-column prop="content" label="选项" align="center">
                    <template slot-scope="scope">
                       <p v-for="(item,index) in scope.row.content" :key="index">{{item.opt}}:{{item.content}}</p>
                    </template>
                </el-table-column> -->
                <el-table-column prop="is_pay" label="是否付费" align="center">
                    <template slot-scope="scope">
                        {{scope.row.is_pay == 1 ? '是' : '否' }}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="is_show" label="是否展示" align="center">
                    <template slot-scope="scope">
                        {{formatDate(scope.row.is_show * 1000)}}
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="tag" label="题目" align="center"></el-table-column> -->
                <el-table-column prop="ques_type" label="题型" align="center">
                    <template slot-scope="scope">
                       {{scope.row.ques_type == 1 ? '判断' : scope.row.ques_type == 2 ? '单选' :  scope.row.ques_type ==  3 ? '多选' : '简答'}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="answer" label="答案" align="center"></el-table-column> -->

                <!-- <el-table-column prop="optionArr" label="选项" align="center">
                    <template slot-scope="scope">
                        <el-button>{{scope.row.check_state}}</el-button>
                       {{scope.row.check_state == 1 ? '通过' : '未通过'}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="check_state" label="审核状态" align="center">
                    <template slot-scope="scope">
                       {{scope.row.check_state == 1 ? '已审核' : scope.row.check_state == 2 ? '待审核' :  scope.row.check_state == 3 ?'作废作废' : '草稿'}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="add_time" label="添加时间" align="center"></el-table-column>
                <el-table-column prop="last_time" label="最后修改时间" align="center">
                    <template slot-scope="scope">
                        {{scope.row.last_time == '' ? '还未登陆' : scope.row.last_time}}
                    </template>
                </el-table-column> -->
            </el-table>

            <div class="page" :style="{width:width - 280 + 'px'}">
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
            </div>
        </div>

        <!-- 搜索 -->
        <el-dialog
            title="搜索"
            :visible.sync="search_show"
            width="30%">
            <el-form :model="SearchFormData" label-width="120px" label-position="left">
                <el-form-item label="题目:">
                    <el-input v-model="SearchFormData.title" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加模板 -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            direction="rtl" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
            <el-form :rules="rules" ref="addform" :model="AddFormData" label-width="120px" label-position="right">
                <el-row>
                    <el-col :span="12">
                         <el-form-item label="题型:" :required='true'>
                            <!-- AddFormData.ques_type -->
                            <el-select v-model="add_ques" placeholder="请选择" @change="selChange">
                                <el-option
                                    v-for="item in ques_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <el-input v-model="AddFormData.ques_type" /> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否需支付:"  :required='true'>
                            <!-- AddFormData.is_pay -->
                            <el-select v-model="add_pay" placeholder="请选择">
                                <el-option
                                    v-for="item in pay_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select> 
                            <!-- <el-input v-model="AddFormData.is_pay" /> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                         <el-form-item label="最小金额:" v-if="add_pay == 1">
                            <el-input-number controls-position="right" v-model="AddFormData.min_num"  :min="1" :max="10000" label="描述文字"></el-input-number>
                            <!-- <el-input type="number" maxLength="4" v-model="AddFormData.min_num" /> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否展示:" :required='true'>
                            <el-select v-model="add_show_value" placeholder="请选择">
                                <el-option
                                    v-for="item in show_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select> 
                            <!-- ddFormData.is_show -->
                            <!-- el-switch
                            v-model="AddFormData.is_show">
                            </el-switch> -->
                        </el-form-item>
                        </el-col>
                </el-row>
                <el-row v-if="add_show_value">
                    <el-col :span="12">
                        <el-form-item label="展示时间:" :required='true'>
                            <el-date-picker
                                    v-model="show_date"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"> 
                         <el-form-item prop="title" label="题目内容:">
                            <el-input :rows="8" type="textarea" @input="loadInput($event)" v-model="AddFormData.title" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <!-- answer -->
                        <el-form-item label="答案:">
                            <el-input @input="loadInput($event)" v-if="add_ques == 3" :rows="8" type="textarea" v-model="AddFormData.answer"></el-input>
                            <div class="ques-box" v-if="add_ques == 2">
                                <div class="ques-flex" v-for="value in mutil_ary" :key="value.name" v-show="value.show == 1 ? true: false">
                                    <div class="ques-flexlf">{{value.name}}</div>
                                    <div class="ques-flexmd">
                                        <el-input type="text" placeholder="请输入" v-model="value.content"></el-input>
                                        <!-- {{value.content}} -->
                                    </div>
                                    <div class="ques-flexrg">
                                        <!-- v-model="sigle_radio" -->
                                        <el-checkbox v-model="value.is_answer" :checked="value.is_answer" :label="value.is_answer" @change="changeradios(value.id)">是答案</el-checkbox>
                                        <!-- <el-radio name="111" v-model="sigle_radio" :label="value.is_answer" @change="changeradio">是答案</el-radio> -->
                                    </div>
                                </div>
                            </div>
                            <div class="ques-box" v-if="add_ques == 1">
                                <div class="ques-flex" v-for="value in sigle_ary" :key="value.name" v-show="value.show == 1 ? true: false">
                                    <div class="ques-flexlf">{{value.name}}</div>
                                    <div class="ques-flexmd">
                                        <el-input type="text" placeholder="请输入" v-model="value.content"></el-input>
                                        <!-- {{value.content}} -->
                                    </div>
                                    <div class="ques-flexrg">
                                        <!-- v-model="sigle_radio" -->
                                        <el-radio name="111" v-model="sigle_radio" :label="value.is_answer" @change="changeradio">是答案</el-radio>
                                    </div>
                                </div>
                            </div>
                            <div class="ques-box" v-if="add_ques == 0">
                                 <!-- <div class="ques-flex">
                                    <div class="ques-flexlf">选项</div>
                                    <div class="ques-flexmd">内容</div>
                                    <div class="ques-flexrg">
                                       是否正确
                                    </div>
                                </div> -->
                                <div class="ques-flex">
                                    <div class="ques-flexlf">A</div>
                                    <div class="ques-flexmd">
                                        <el-input type="text" v-model="jdg_form1.content" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="ques-flexrg">
                                        <el-radio  :label="1" v-model="jdg_radio">{{jdg_radio == 1 ? '对' : '错'}}</el-radio>
                                    </div>
                                </div>
                                <div class="ques-flex">
                                    <div class="ques-flexlf">B</div>
                                    <div class="ques-flexmd">
                                        <el-input type="text" v-model="jdg_form2.content" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="ques-flexrg">
                                        <el-radio  :label="2" v-model="jdg_radio">{{jdg_radio == 2 ? '对' : '错'}}</el-radio>
                                    </div>
                                </div>
                            </div>
                            <div v-if="(add_ques !== 3 && add_ques !== 0) && (add_add_show1 || add_add_show2)"  @click="addopt" class="ques-add">
                                <span>添加</span>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="标签:">
                            <tags ref="tags"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="图片:">
                            <file ref="upload" />
                        </el-form-item>
                    </el-col>
                </el-row>

               <!--  <el-form-item label="分析:" v-if="AddFormData.ques_type == 4">
                    <el-input type="textarea" v-model="AddFormData.analysis" />
                </el-form-item>
                <el-form-item label="答案:" :required='true'>
                    <el-input v-model="AddFormData.answer" />
                </el-form-item> -->
            </el-form>
            </div>

            <div class="drawer-footer">
               <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </div>
        </el-drawer>

        <el-dialog
            title="标签列表"
            :visible.sync="tags_show"
            width="30%">
            <el-form :model="TagsFormData" label-width="60px">
                <!-- <el-form-item label="标签:">
                    <el-input v-model="TagsFormData.title" class="tagsinput"/>
                    <el-button type="primary" @click="handleTag">搜索</el-button>
                </el-form-item> -->
                <el-checkbox-group v-model="TagsFormData.tag_uuids">
                    <span style="width: 30%;display: inline-block" v-for="(item,index) in TagsFormData.tag_list" :key="index">
                         <el-checkbox :label="item">{{item.title}}</el-checkbox>
                    </span>
                    <!-- <el-checkbox v-for="(item,index) in TagsFormData.tag_list" :key="index" :label="item">{{item.title}}</el-checkbox> -->
                </el-checkbox-group>
            </el-form>

            <span slot="footer">
                <el-button @click="tags_show = false">取 消</el-button>
                <el-button type="primary" @click="onTagsSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑模板 -->
       <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            direction="rtl" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="EditFormData" label-width="120px" label-position="right">
                <el-row>
                    <el-col :span="12">
                         <el-form-item label="题型:" :required='true'>
                            <el-select v-model="edit_ques" placeholder="请选择" @change="selChanges">
                                <el-option
                                    v-for="item in ques_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否需支付:"  :required='true'>
                            <el-select v-model="edit_pay" placeholder="请选择">
                                <el-option
                                    v-for="item in pay_options"
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
                         <el-form-item label="最小金额:" v-if="edit_pay == 1">
                            <el-input-number controls-position="right" v-model="EditFormData.min_num" @change="handleChange" :min="1" :max="10000" label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否展示:" :required='true'>
                            <el-select v-model="edit_show_value" placeholder="请选择">
                                <el-option
                                    v-for="item in show_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select> 
                        </el-form-item>
                        </el-col>
                </el-row>
                <el-row v-if="edit_show_value">
                    <el-col :span="12">
                        <el-form-item label="展示时间:" :required='true'>
                            <el-date-picker
                                    v-if="edit_show_value != 0"
                                    v-model="edit_date"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"> 
                         <el-form-item label="题目内容:" :required='true'>
                            <el-input :rows="8" type="textarea" @input="loadInput($event)" v-model="EditFormData.title" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="答案:">
                            <el-input @input="loadInput($event)" v-if="edit_show && edit_ques == 3" :rows="8" type="textarea" v-model="EditFormData.answer"></el-input>
                            <div class="ques-box" v-if="edit_show && edit_ques == 2">
                                <div class="ques-flex" v-for="value in edit_mutil_ary" :key="value.name" v-show="value.show == 1 ? true: false">
                                    <div class="ques-flexlf">{{value.name}}</div>
                                    <div class="ques-flexmd">
                                        <el-input type="text" placeholder="请输入" v-model="value.content"></el-input>
                                    </div>
                                    <div class="ques-flexrg">
                                        <el-checkbox v-model="value.is_answer" :checked="value.is_answer" :label="value.is_answer" @change="edit_changeradios(value.id)">是答案</el-checkbox>
                                    </div>
                                </div>
                            </div>
                            <div class="ques-box" v-if="edit_show && edit_ques == 1">
                                <div class="ques-flex" v-for="value in edit_sigle_ary" :key="value.name" v-show="value.show == 1 ? true: false">
                                    <div class="ques-flexlf">{{value.name}}</div>
                                    <div class="ques-flexmd">
                                        <el-input type="text" placeholder="请输入" v-model="value.content"></el-input>
                                    </div>
                                    <div class="ques-flexrg">
                                        <el-radio name="222" v-model="edit_sigle_radio" :label="value.is_answer" @change="edit_changeradio">是答案</el-radio>
                                    </div>
                                </div>
                            </div>
                            <div class="ques-box" v-if="edit_show && edit_ques == 0">
                                <div class="ques-flex">
                                    <div class="ques-flexlf">A</div>
                                    <div class="ques-flexmd">
                                        <el-input type="text" v-model="edit_jdg_form1.content" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="ques-flexrg">
                                        <el-radio  :label="1" v-model="edit_jdg_radio">{{edit_jdg_radio == 1 ? '对' : '错'}}</el-radio>
                                    </div>
                                </div>
                                <div class="ques-flex">
                                    <div class="ques-flexlf">B</div>
                                    <div class="ques-flexmd">
                                        <el-input type="text" v-model="edit_jdg_form2.content" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="ques-flexrg">
                                        <el-radio  :label="2" v-model="edit_jdg_radio">{{edit_jdg_radio == 2 ? '对' : '错'}}</el-radio>
                                    </div>
                                </div>
                            </div>
                            <div v-if="(edit_ques !== 3 && edit_ques !== 0) && (edit_edit_show1 || edit_edit_show2)" class="ques-add">
                                <span @click="addopts">添加</span>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="标签:">
                            <tags ref="tagss" :dynamicTags="edit_tags"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="图片:">
                            <file ref="uploads" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <!-- <el-form :model="EditFormData" label-width="20px" label-position="right">
                
                 <el-form-item label="题目:" :required='true'>
                    <el-input v-model="EditFormData.title" />
                </el-form-item>
                <el-form-item label="是否需支付" label-width="110px" :required='true'>
                    <el-input v-model="EditFormData.is_pay" />
                </el-form-item>
                <el-form-item label="是否展示" :required='true'>
                    <el-input v-model="EditFormData.is_show" />
                </el-form-item>
                <el-form-item label="分析:">
                    <el-input v-model="EditFormData.analysis" />
                </el-form-item>

                <el-form-item label="标签:">
                    <el-input v-model="EditFormData.tag_uuids" />
                </el-form-item>

                <el-form-item label="题型:" :required='true'>
                    <el-input v-model="EditFormData.ques_type" />
                </el-form-item>

                <el-form-item label="图片地址:">
                    <el-input v-model="EditFormData.pic_urls" />
                </el-form-item>

                <el-form-item label="答案:" :required='true'>
                    <el-input v-model="EditFormData.answer" />
                </el-form-item>
                <el-form-item label="最小金额:">
                    <el-input v-model="EditFormData.min_num" />
                </el-form-item>
            </el-form> -->
            </div>
            <div class="drawer-footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </div>
       </el-drawer>
        <!-- </el-dialog> -->

        <!-- 详细 -->
        <!-- <el-dialog title="详细" :visible.sync="detail_show" width="40%"> -->
        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            direction="rtl" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
            <el-form :model="DetailFormData" label-width="120px" label-position="right">
                <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">题目内容</div>
                 </div>
                <el-row style="margin-top:20px">
                    <el-col :span="20">
                        <el-form-item class="mbstyle" label="题目内容:">{{DetailFormData.data.title}}</el-form-item>
                    </el-col>
                </el-row>
              <el-row style="margin-top:20px">
                    <el-col :span="20">
                        <el-form-item class="mbstyle" label="题目选项:">
                            <el-form-item style="margin-top: 8px" v-for="value in DetailFormData.data.content" :key="value.uuid">
                                <p>选项：{{value.opt}}   题目内容: {{value.content}}</p>
                            </el-form-item>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item class="mbstyle" label="题目类型:">{{DetailFormData.data.ques_type == 1 ? '判断题' : DetailFormData.data.ques_type == 2 ? '单选题' : DetailFormData.data.ques_type == 3 ? '多选题' : '简答' }}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="是否需支付:">
                            {{DetailFormData.data.is_pay ? '是' : '否'}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <!-- {{DetailFormData.data.answer}} -->
                        <el-form-item  label="答案:" v-if="DetailFormData.data.ques_type == 4 ? true : false">
                            {{DetailFormData.data.answer}}
                        </el-form-item>
                        <el-form-item v-else  label="答案:">
                           <span v-for="(value, index) in DetailFormData.data.answer" :key="index">
                               {{value}}
                           </span>
                        </el-form-item>
                    </el-col>
                </el-row>

                  <el-row>
                    <el-col :span="12">
                         <el-form-item  label="是否展示:">{{DetailFormData.data.is_show ? '是' : '否'}}</el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item class="mbstyle" label="题目图片:">
                            <!-- <el-image 
                                    v-if="DetailFormData.data.pic_urls"
                                    style="width: 30px; height: 50px"
                                    :src="DetailFormData.data.pic_urls[0]" 
                                    :preview-src-list="[DetailFormData.data.pic_urls]">
                                </el-image> -->
                            <img v-if="DetailFormData.data.pic_urls" :src="DetailFormData.data.pic_urls" alt="" style="width:50px;height: 50px">
                            <span v-else>未上传</span>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item v-if="DetailFormData.data.is_pay"  label="付费金额:">
                            {{DetailFormData.data.min_num }}
                        </el-form-item>
                    </el-col> -->
                </el-row>
                <el-row>
                    <el-col :span="12">
                         <el-form-item v-if="DetailFormData.data.is_show"  label="展示时间:">{{formatDate(DetailFormData.data.is_show * 1000) }}</el-form-item>
                    </el-col>
                    
                </el-row>
                <el-row>
                    <el-col :span="12" >
                        <el-form-item class="mbstyle" label="题目标签:">
                            <el-tag  v-for="value in DetailFormData.data.tag" :key="value.uuid" type="success">{{value.title}}</el-tag>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item class="mbstyle" label="添加时间:">{{DetailFormData.data.add_time}}</el-form-item>
                    </el-col>
                </el-row>
                <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">题目内容</div>
                 </div>
                 <el-row>
                     <el-col :span="12">
                          <el-form-item class="mbstyle" label="审核状态:">{{stateFormat(DetailFormData.data.check_state)}}</el-form-item>
                     </el-col>
                 </el-row>
            </el-form>
            </div>
            <div class="drawer-footer">
                     <el-button type="primary" @click="detail_show = false">关闭</el-button>
                </div>
            <!-- <span slot="footer">
                <el-button type="primary" @click="detail_show = false">确 定</el-button>
            </span> -->
        </el-drawer>
        <!-- </el-dialog> -->
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import file from "@/components/imgUpload/mutiimg.vue"
    // import file from "@/components/imgUpload/upload.vue"
    import tags from "@/components/tags/index.vue"
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    if (!store.state.ShopQuesQuestionData) {
        Vue.set(store.state, 'ShopQuesQuestionData', {
            rules: {
                title: [
                    { required: true, message: '题目内容必填', trigger: 'blur' },            
                ],
            },
            
            edit_tags: [],
            edit_edit_show1: true,
            edit_edit_show2: true,
            edit_ques: 0,
            edit_pay: 0,
            edit_show_value: 0,
            edit_date: '',
            edit_jdg_radio: 1,
            edit_jdg_hg: 1,
            edit_jdg_form1:{
                content: '',
                is_answer: 1
            },
            edit_jdg_form2:{ 
                content: '',
                is_answer: 0
            },
            edit_sigle_index: 3,
            edit_mul_index: 3,
            edit_sigle_radio: 1,
            edit_sigle_ary: [
                {name: 'A',content: '',is_answer: 1,show: 1},
                {name: 'B',content: '',is_answer: 2,show: 1},
                {name: 'C',content: '',is_answer: 3,show: 1},
                {name: 'D',content: '',is_answer: 4,show: 1},
                {name: 'E',content: '',is_answer: 5,show: 0},
                {name: 'F',content: '',is_answer: 6,show: 0},
                {name: 'G',content: '',is_answer: 7,show: 0},
            ],
            edit_mutil_ary: [
                {id: 0,name: 'A',content: '',is_answer: false,show: 1},
                {id: 1,name: 'B',content: '',is_answer: false,show: 1},
                {id: 2,name: 'C',content: '',is_answer: false,show: 1},
                {id: 3,name: 'D',content: '',is_answer: false,show: 1},
                {id: 4,name: 'E',content: '',is_answer: false,show: 0},
                {id: 5,name: 'F',content: '',is_answer: false,show: 0},
                {id: 6,name: 'G',content: '',is_answer: false,show: 0},
            ],



            jdg_radio: 1,
            jdg_hg: 1,
            jdg_form1:{
                content: '',
                is_answer: 1
            },
            jdg_form2:{ 
                content: '',
                is_answer: 0
            },
            sigle_index: 3,
            mul_index: 3,
            sigle_radio: 1,
            sigle_ary: [
                {name: 'A',content: '',is_answer: 1,show: 1},
                {name: 'B',content: '',is_answer: 2,show: 1},
                {name: 'C',content: '',is_answer: 3,show: 1},
                {name: 'D',content: '',is_answer: 4,show: 1},
                {name: 'E',content: '',is_answer: 5,show: 0},
                {name: 'F',content: '',is_answer: 6,show: 0},
                {name: 'G',content: '',is_answer: 7,show: 0},
            ],
            mutil_ary: [
                {id: 0,name: 'A',content: '',is_answer: true,show: 1},
                {id: 1,name: 'B',content: '',is_answer: false,show: 1},
                {id: 2,name: 'C',content: '',is_answer: false,show: 1},
                {id: 3,name: 'D',content: '',is_answer: false,show: 1},
                {id: 4,name: 'E',content: '',is_answer: false,show: 0},
                {id: 5,name: 'F',content: '',is_answer: false,show: 0},
                {id: 6,name: 'G',content: '',is_answer: false,show: 0},
            ],
            add_add_show1: true,
            add_add_show2: true,

            rows:[],
            total:0,
            loading:false,

            curr_row:null,

            // 搜索
            search_show:false,
            SearchFormData:{
                title:'',               
                // is_pay:0,
                // is_show:0,
                // ques_type:0,
                page_num:1,
                page_len:10,
                // add_time:'2020-08-02',

                // 没有下面的字段
                // order_field:'add_time',
                // order_sort:'desc'
            },
            search_value: 0,
            search_options:[
                {value: 0,label: '标题'}
            ],
            // 添加
            add_add_show2: true,
            add_add_show2: true,
            add_show:false,
            show_date: new Date(),
            add_ques: 0,
            ques_options: [
                {value: 0,label:'判断'},
                {value: 1,label:'单选'},
                {value: 2,label:'多选'},
                {value: 3,label:'简答'},
            ],
            add_pay: 0,
            pay_options: [
                {value: 0,label:'免费'},
                {value: 1,label:'付费'},
            ],
            add_show_value: 0,
            show_options: [
                {value: 0,label:'不展示'},
                {value: 1,label:'展示'},
            ],
            AddFormData:{
                login_token:'',
                title: '',
                is_pay:1,
                is_show:1,
                analysis: '',	
                // tag_uuids:[],	
                ques_type:1,
                // pic_urls:[],	
                answer:'',
                min_num:0,
                pic_urls: []
            },

            // 标签列表
            tags_show:false,
            TagsFormData:{
                title:'',
                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc',

                tag_list:[],
                tag_uuids:[],	
            },

            // 编辑
            edit_show:false,
            EditFormData:{
                uuid:'',
                login_token:'',
                title: '',
                is_pay:0,
                is_show:1,
                analysis: '',	
                tag_uuids:[],	
                ques_type:2,
                // pic_urls:[],	
                answer:'',
                min_num:0,
            },

            // 详细
            detail_show:false,
            DetailFormData:{
                data:[]
            },

            // 添加选项
            addoption_show:false,
            AddOptionFormData:{
                question_uuid:'',
                login_token:'',
                content:'',
                is_answer:0,//1代表正确答案；0代表错误
            },
            dynamicTags: [],
            inputVisible: false,
            inputValue: ''

        });
    }

    export default {
        components: {
            file,
            tags
        },
        data() {
            return store.state.ShopQuesQuestionData;
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
        created(){
            this.init();
        },
        methods:{
            selChange(val) {
                if(val == 1 && this.sigle_index < 6) {
                    this.add_add_show1 = true
                }else {
                   this.add_add_show1 = false 
                }

                if(val == 2 && this.mul_index < 6) {
                    this.add_add_show2 = true
                }else {
                    this.add_add_show2 = false
                }
                
                console.log(val)
            },
            selChanges(val) {
                if(val == 1 && this.edit_sigle_index < 6) {
                    this.edit_edit_show1 = true
                }else {
                   this.edit_edit_show1 = false 
                }

                if(val == 2 && this.edit_mul_index < 6) {
                    this.edit_edit_show2 = true
                }else {
                    this.edit_edit_show2 = false
                }
                
                console.log(val)
            },
            edit_addopt() {
                switch(this.edit_ques) {
                    case 1:
                        // this.sifle_index
                        // this.sifle_index
                        if(this.edit_sigle_index < 6) {
                            let num = this.edit_sigle_index - 0 + 1
                            let ary = this.edit_sigle_ary
                            this.edit_sigle_index = num;
                            ary[num].show = 1
                            this.edit_sigle_ary = ary
                            console.log(this.edit_sigle_ary)
                        }
                        break;
                    case 2:
                        if(this.edit_sigle_index < 6) {
                            let num = this.edit_sigle_index - 0 + 1
                            let ary = this.edit_mutil_ary
                            this.edit_sigle_index = num;
                            ary[num].show = 1
                            this.edit_mutil_ary = ary
                            console.log(this.edit_mutil_ary)
                        }
                        break;
                    default:
                        console.log(1111)
                }

            },
            edit_changeradios(val) {
                console.log(val)
                console.log(this.edit_mutil_ary[val])
            },
            edit_changeradio(val) {
                this.edit_jdg_hg = val
                console.log(val)
            },
            addopts() {
                switch(this.edit_ques) {
                    case 1:
                        // this.sifle_index
                        // this.sifle_index
                        if(this.edit_sigle_index < 6) {
                            let num = this.edit_sigle_index - 0 + 1
                            let ary = this.edit_sigle_ary
                            this.edit_sigle_index = num;
                            ary[num].show = 1
                            this.edit_sigle_ary = ary
                            if(num == 6) {
                                this.edit_edit_show1 = false
                            }
                        }else {
                            this.edit_edit_show1 = false
                        }
                        break;
                    case 2:
                        if(this.edit_mul_index < 6) {
                            let num = this.edit_mul_index- 0 + 1
                            let ary = this.edit_mutil_ary
                            this.edit_mul_index = num;
                            ary[num].show = 1
                            this.edit_mutil_ary = ary
                            if(num == 6) {
                                this.edit_edit_show2 = false
                            }
                            // console.log(this.mutil_ary)
                        }else {
                            this.edit_edit_show2 = false
                        }
                        break;
                    default:
                        console.log(1111)
                }
            },



            loadInput() {
                this.$forceUpdate()
            },
            changeradios(val) {
                console.log(val)
                console.log(this.mutil_ary[val])
            },
            changeradio(val) {
                this.jdg_hg = val
                console.log(val)
            },
            addopt() {
                switch(this.add_ques) {
                    case 1:
                        // this.sifle_index
                        // this.sifle_index
                        if(this.sigle_index < 6) {
                            let num = this.sigle_index - 0 + 1
                            let ary = this.sigle_ary
                            this.sigle_index = num;
                            ary[num].show = 1
                            this.sigle_ary = ary
                            if(num == 6) {
                                this.add_add_show1 = false
                            }
                            console.log(this.sigle_ary)
                        }else {
                            this.add_add_show1 = false
                        }
                        break;
                    case 2:
                        console.log(11111)
                        if(this.mul_index < 6) {
                            console.log(this.mul_index)
                            let num = this.mul_index - 0 + 1
                            let ary = this.mutil_ary
                            this.mul_index = num;
                            ary[num].show = 1
                            this.mutil_ary = ary
                             if(num == 6) {
                                this.add_add_show2 = false
                            }
                            console.log(this.mutil_ary)
                        }else {
                            this.add_add_show2 = false
                        }
                        break;
                    default:
                        console.log(1111)
                }

            },
            onAddSubmit() {
                console.log(new Date(this.show_date ).getTime())
                console.log((new Date(this.show_date ).getTime() + '').substring(0,10) - 0)
                // console.log(new Date(this.show_date ).getTime())
                // console.log(new Date(1603123200000) )
                // 1603123200000


                // 题型 add_ques 是否付费： add_pay 最小金额 AddFormData.min_num 展示时间 AddFormData.is_show show_date 内容AddFormData.title
                // console.log(this.add_ques)
                // console.log(this.add_pay)
                // console.log(this.AddFormData.min_num)
                // console.log(this.add_show_value)
                // console.log(this.show_date)
                // console.log(this.AddFormData.title)this.$refs['addForm'].validateField('mobiles', phoneError => { //验证手机号码是否正确

                this.AddFormData.login_token = lime.cookie_get('login_token')
                this.AddFormData.title = this.AddFormData.title
                this.AddFormData.is_pay = this.add_pay
                this.AddFormData.ques_type = this.add_ques - 0 + 1
                this.AddFormData.is_show = this.add_show_value == 0 ? this.add_show_value : (new Date(this.show_date ).getTime() + '').substring(0,10) - 0;
   
                let tagary = []
                if(this.$refs.tags.dynamicTags) {
                    this.$refs.tags.dynamicTags.forEach((item, index) => {
                        tagary[index] = item.uuid
                    })
                }
                if(tagary[0]) {
                    this.AddFormData.tag_uuids = tagary
                }

                this.AddFormData.analysis = ''//分析
                this.AddFormData.pic_urls = this.$refs.upload.fileListss ? this.$refs.upload.fileListss : []//图片地址
                // this.AddFormData.answer = this.this.AddFormData.answer ? this.AddFormData.answer : ''//答案
                //this.AddFormData.min_num = this.add_pay == 1 ? this.AddFormData.min_num : 0//最小金额
                this.AddFormData.optionArr = [] //选项数组

                this.$refs['addform'].validate((valid) => {
                    if (valid) {
                        switch(this.add_ques) {
                            case 0:
                                // if(is_answer)jdg_radio
                                this.jdg_form1.is_answer =  this.jdg_radio == 1 ? 1 : 0
                                this.jdg_form2.is_answer =  this.jdg_radio == 2 ? 1 : 0
                                if(!this.jdg_form1.content || !this.jdg_form2.content) {
                                    this.$message.error('选项内容必填')
                                    return;
                                }else
                                if(this.jdg_form1.content === this.jdg_form2.content) {
                                    this.$message.error('选项内容重复')
                                    return;
                                }
                                this.AddFormData.optionArr = [
                                    this.jdg_form1,
                                    this.jdg_form2
                                ]
                                NProgress.start();
                                lime.req('ShopQuesQuestionAdd',this.AddFormData).then(res => {
                                    console.log(res)
                                    this.add_show = false
                                    this.init()
                                }).catch(err => {
                                    this.$message.error(err.msg)
                                })
                                // console.log(this.jdg_form1.content)
                                // console.log(this.jdg_form2.content)
                                break;
                            case 1:
                                // console.log(this.sigle_ary)
                                let arys = []
                                this.sigle_ary.forEach((item,index) => {
                                    if(item.show) {
                                        arys.push({
                                            content: item.content,
                                            is_answer: item.is_answer == this.jdg_hg ? 1 : 0
                                        })
                                    }
                                })
                                this.AddFormData.optionArr = arys
                                NProgress.start();
                                lime.req('ShopQuesQuestionAdd',this.AddFormData).then(res => {
                                    // console.log(res)
                                    this.add_show = false
                                    this.init()
                                }).catch(err => {
                                    this.$message.error(err.msg)
                                })

                                break;
                            case 2:
                                console.log(this.mutil_ary)
                                let ary = []
                                this.mutil_ary.forEach((item,index) => {
                                    if(item.show) {
                                        ary.push({
                                            content: item.content,
                                            is_answer: item.is_answer ? 1 : 0
                                        })
                                    }
                                })
                                let add_isAns = false;
                                ary.forEach((item,index) => {
                                    if(item.is_answer == 1) {
                                        add_isAns = true
                                    } 
                                })
                                if(!add_isAns) {
                                    this.$confirm('不选默认第一项为答案?', '提示').then(() => {
                                         ary[0].is_answer = true 
                                          this.mutil_ary[0].is_answer = true
                                        
                                                this.AddFormData.optionArr = ary
                                                NProgress.start();
                                                lime.req('ShopQuesQuestionAdd',this.AddFormData).then(res => {
                                                    // console.log(res)
                                                    this.add_show = false
                                                    this.init()
                                                }).catch(err => {
                                                    this.$message.error(err.msg)
                                                })
                                           

                                    }) 
                               
                                }else {
                                     this.AddFormData.optionArr = ary
                                        NProgress.start();
                                        lime.req('ShopQuesQuestionAdd',this.AddFormData).then(res => {
                                            // console.log(res)
                                            this.add_show = false
                                            this.init()
                                        }).catch(err => {
                                            this.$message.error(err.msg)
                                        })
                                }
                                break;
                            case 3:
                                this.AddFormData.answer = this.AddFormData.answer ? this.AddFormData.answer : ''
                                NProgress.start();
                                lime.req('ShopQuesQuestionAdd',this.AddFormData).then(res => {
                                    // console.log(res)
                                    this.add_show = false
                                    this.init()
                                }).catch(err => {
                                    this.$message.error(err.msg)
                                })
                                break;
                            default:
                                console.log(1111)
                        } 
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

                // jdg_form2.content is_answer jdg_radio
                 console.log(1111)
             },
             handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            handleChange(value) {
                console.log(value)
            },
            // 时间格式化
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            },

            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },

            // 数据初始化
            init() {
                // this.loading = true;
                 NProgress.start();

                lime.req('ShopQuesQuestionList', {
                    login_token:lime.cookie_get('login_token'),
                    title:this.SearchFormData.title,
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    // order_field:this.SearchFormData.order_field,
                    // order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    // this.loading = false;
                     NProgress.done();
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    // this.SearchFormData.title='';
                    console.log('试题管理')
                    console.log(this.rows)
                    console.log('试题管理')
                });


                // 超时关闭遮罩层
                setTimeout(() => {
                    // this.loading = false;
                     NProgress.done();
                }, 10000);
            },
            // 状态格式化
            stateFormat(state) {
                if (state == 1) {
                    return '已审核';
                } else if (state == 2) {
                    return '待审核';
                } else if (state == 3) {
                    return '作废';
                } else {
                    return '草稿';
                }
            },
            // 表格数据刷新
            onRefresh() {
                this.init();
            },
            // 搜索页面打开
            onSearch() {
                this.search_show = true;
                // this.SearchFormData.title = val
            },
            // 搜索提交
            onSearchSubmit(){
                this.search_show = false;
                // this.SearchFormData.title = this.search_options[this.search_value].
                this.SearchFormData.page_num = 1;
                this.init();
            },
            // 选择单行
            onSelectRow(row){
                this.curr_row = row;
            },
            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 排序处理
            onSortChange(sort) {
                console.log(sort);
                this.SearchFormData.order_field = sort.prop;
                if (sort.order == 'ascending') {
                    this.SearchFormData.order_sort  = 'asc';
                } else {
                    this.SearchFormData.order_sort  = 'desc';
                }
                
                this.init();
            },

            // 添加展示
            handleAdd() {
                this.add_show = true;
                
            },
            // 添加向后台提交
            onAddSubmits() {
                console.log(this.$refs.pciurls.img_url)
                this.AddFormData.login_token = lime.cookie_get('login_token');
                // this.AddFormData.is_show = this.AddFormData.is_show ? 1 : 0
                // this.AddFormDate.pic_urls  = [this.$refs.pciurls.img_url]
                this.AddFormData.is_show = !this.AddFormData.is_show ? 0 : this.show_date.getFullYear() + '-' + (this.show_date.getMonth() + 1) + '-' + this.show_date.getDate()
                // .substr(0, 10)
                lime.req('ShopQuesQuestionAdd', this.AddFormData).then(res => {
                    this.SearchFormData.page_num = 1;
                    this.init();
                    this.add_show = false;
                    this.login_token='';
                    this.title= '';
                    this.is_pay=0;
                    this.is_show=1;
                    this.analysis= '';		
                    this.ques_type=2;	
                    this.answer ='';
                    this.min_num =0;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },

            // 搜索、添加标签展示
            handleTag() {
                this.tags_show = true;

                lime.req('ShopQuesTagList', {
                    login_token:lime.cookie_get('login_token'),
                    
                    title:this.TagsFormData.title,
                    page_num:this.TagsFormData.page_num,
                    page_len:this.TagsFormData.page_len,
                    order_field:this.TagsFormData.order_field,
                    order_sort:this.TagsFormData.order_sort
                }).then(res => {
                    this.TagsFormData.tag_list = res.data.rows;
                    this.TagsFormData.title='';
                    this.TagsFormData.tag_uuids=[];

                    console.log('标签')
                    console.log(this.TagsFormData.tag_list)
                    console.log('标签')
                });
                
            },
            // 添加标签 向 添加列表 提交
            onTagsSubmit() {
                this.AddFormData.tag_list = this.TagsFormData.tag_uuids;

                this.tags_show = false;
                console.log('标签提交')
                console.log(this.TagsFormData.tag_uuids)
                console.log(this.AddFormData.tag_list)
                console.log('标签提交') 
                // this.TagsFormData.tag_uuids=[]
            },


            // 编辑展示
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                // lime.req('ShopQuesQuestionDetail',{
                //     login_token: lime.cookie_get('login_token'),
                //     uuid: this.curr_row.uuid
                // }).then( res => {
                //     console.log(res)
                // })
                // console.log()

                this.edit_ques = this.curr_row.ques_type -1
                this.edit_pay = this.curr_row.is_pay
                // this.edit_show_value = this.curr_row.is_show == 0 ? 0 : new Date(this.curr_row.is_show)
                // this.edit_date =  new Date(2147483647)  
                // console.log(new Date(this.curr_row.is_show))
                this.edit_show_value = this.curr_row.is_show == 0 ? 0 : 1
                this.edit_date = this.curr_row.is_show == 0 ? '' : this.curr_row.is_show * 1000
                console.log(new Date(this.curr_row.is_show * 1000))
                this.edit_tags = this.curr_row.tag
                // new Date(this.curr_row.is_show)

                switch(this.curr_row.ques_type -1) {
                    case 0:
                        let row = this.curr_row
                       row.optionArr.forEach((item, index) => {
                            if(item.is_answer == 1) {
                                // item.
                                this.edit_jdg_radio = index - 0 + 1
                                this.edit_jdg_hg = index - 0 + 1
                            }
                        })
                        this.edit_jdg_form1 = {
                          uuid: row.optionArr[0].uuid,
                          content: row.optionArr[0].content,
                          is_answer:  row.optionArr[0].is_answer
                        }
                        this.edit_jdg_form2 = {
                        uuid: row.optionArr[1].uuid,
                          content: row.optionArr[1].content,
                          is_answer:  row.optionArr[1].is_answer
                        }
                        break;
                    case 1:
                        let row1 = this.curr_row
                        console.log(9999)
                        console.log(row1)
                        let dd = this.edit_sigle_ary
                        let idx = 1
                       row1.optionArr.forEach((item, index) => {
                           dd[index].content = item.content
                           dd[index].show = 1
                           dd[index].uuid = item.uuid
                            if(item.is_answer == 1) {
                                // item.
                                idx = index - 0 + 1
                                // jdg_radio: 1,
                            }
                        })
                        this.edit_sigle_index = row1.optionArr.length - 0 - 1
                        console.log(8888)
                        console.log(dd)
                        // this.edit_jdg_hg = idx
                        // this.edit_jdg_radio = idx
                        // this.edit_sigle_ary = dd
                        // this.edit_sigle_radio = 4
                        // console.log(this.edit_jdg_radio = 4)
                        break;
                    case 2:
                        let row4 = this.curr_row
                        let dm = this.edit_mutil_ary
                        row4.optionArr.forEach((item, index) => {
                            dm[index].show = 1
                            dm[index].uuid = item.uuid
                            dm[index].content = item.content
                            if(item.is_answer == 1) {
                                dm[index].is_answer = true
                            }
                        })
                        this.edit_mul_index = row4.optionArr.length - 1 - 0
                        this.edit_mutil_ary = dm
                        // this.edit_sigle_index = row4.optionArr.legth - 1

                        break;
                    case 3:
                        break;
                    default:
                        console.log(999)
                }


                this.EditFormData.uuid = this.curr_row.uuid;
                this.EditFormData.title = this.curr_row.title;
                this.EditFormData.is_pay = this.curr_row.is_pay;
                this.EditFormData.is_show = this.curr_row.is_show;
                this.EditFormData.analysis = this.curr_row.analysis;
                // this.EditFormData.tag_uuids = this.curr_row.tag_uuids;
                this.EditFormData.ques_type = this.curr_row.ques_type;
                // this.EditFormData.pic_urls = this.curr_row.pic_urls;
                this.EditFormData.answer = this.curr_row.answer.toString();
                this.EditFormData.min_num = this.curr_row.min_num;
                this.edit_show = true;
            },
            // 编辑后台提交
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');

                this.EditFormData.is_pay = this.edit_pay
                this.EditFormData.ques_type = this.edit_ques - 0 + 1
                this.EditFormData.is_show = this.edit_show_value == 0 ? this.edit_show_value : (new Date(this.edit_date ).getTime() + '').substring(0,10) - 0;
                
                let tagary = []
                if(this.$refs.tagss.dynamicTags) {
                    this.$refs.tagss.dynamicTags.forEach((item, index) => {
                        tagary[index] = item.uuid
                    })
                }
                if(tagary[0]) {
                    this.EditFormData.tag_uuids = tagary
                }

                // this.AddFormData.analysis = ''//分析
                this.EditFormData.pic_urls = this.$refs.uploads.fileListss ? this.$refs.uploads.fileListss : []//图片地址

                // let tagary = []
                // if(this.$refs.tagss.dynamicTags) {
                //     this.$refs.tagss.dynamicTags.forEach((item, index) => {
                //         tagary[index] = item.uuid
                //     })
                // }
                // if(tagary[0]) {
                //     this.EditFormData.tag_uuids = tagary
                // }

                // this.EditFormData.pic_urls = this.$refs.uploads.fileListss ? this.$refs.uploads.fileListss : []
                this.EditFormData.optionArr = []

                 switch(this.edit_ques) {
                            case 0:
                                // if(is_answer)jdg_radio
                                this.edit_jdg_form1.is_answer =  this.edit_jdg_radio == 1 ? 1 : 0
                                this.edit_jdg_form2.is_answer =  this.edit_jdg_radio == 2 ? 1 : 0
                                if(!this.edit_jdg_form1.content || !this.edit_jdg_form2.content) {
                                    this.$message.error('选项内容必填')
                                    return;
                                }else
                                if(this.edit_jdg_form1.content === this.edit_jdg_form2.content) {
                                    this.$message.error('选项内容重复')
                                    return;
                                }
                                this.EditFormData.optionArr = [
                                    this.edit_jdg_form1,
                                    this.edit_jdg_form2
                                ]
                                NProgress.start();

                                lime.req('ShopQuesQuestionEdit', this.EditFormData).then(res => {
                                    this.init();
                                    this.edit_show = false;
                                }).catch(err => {
                                    this.$message.error(err.msg);
                                });
                                
                                // console.log(this.jdg_form1.content)
                                // console.log(this.jdg_form2.content)
                                break;
                            case 1:
                                // console.log(this.sigle_ary)
                                let arys = []
                                this.edit_sigle_ary.forEach((item,index) => {
                                    if(item.show) {
                                        if(item.uuid) {
                                            arys.push({
                                                uuid: item.uuid ,
                                                content: item.content,
                                                is_answer: item.is_answer == this.edit_jdg_hg ? 1 : 0
                                            })
                                        }else {
                                          arys.push({
                                                content: item.content,
                                                is_answer: item.is_answer == this.edit_jdg_hg ? 1 : 0
                                            })  
                                        }
                                    }
                                })
                                this.EditFormData.optionArr = arys
                                NProgress.start();
                                 lime.req('ShopQuesQuestionEdit', this.EditFormData).then(res => {
                                    this.init();
                                    this.edit_show = false;
                                }).catch(err => {
                                    this.$message.error(err.msg);
                                });
                                

                                break;
                            case 2:
                                console.log(this.mutil_ary)
                                let ary = []
                                this.edit_mutil_ary.forEach((item,index) => {
                                    if(item.show) {
                                        if(item.uuid) {
                                            ary.push({
                                                uuid: item.uuid,
                                                content: item.content,
                                                is_answer: item.is_answer ? 1 : 0
                                            })
                                        }else {
                                            ary.push({
                                                content: item.content,
                                                is_answer: item.is_answer ? 1 : 0
                                            })
                                        }
                                    }
                                })
                                this.EditFormData.optionArr = ary
                                NProgress.start();
                                 lime.req('ShopQuesQuestionEdit', this.EditFormData).then(res => {
                                    this.init();
                                    this.edit_show = false;
                                }).catch(err => {
                                    this.$message.error(err.msg);
                                });
                                
                                break;
                            case 3:
                                this.EditFormData.answer = this.EditFormData.answer ? this.EditFormData.answer : ''
                                NProgress.start();
                                 lime.req('ShopQuesQuestionEdit',this.EditFormData).then(res => {
                                    // console.log(res)
                                    this.edit_show = false
                                    this.init()
                                }).catch(err => {
                                    NProgress.done();
                                    this.$message.error(err.msg)
                                })
                                break;
                            default:
                                console.log(1111)
                        } 
            },

            // 删除确认提交
            handleDel(menu) {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.$confirm('确认删除?', '提示').then(() => {
                    lime.req('ShopQuesQuestionDel', {
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

            // 审核 
            handleCheck(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.$confirm('提交审核?', '提示').then(() => {
                    lime.req('ShopQuesQuestionUpCheck', {
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

            // 详细
            handleDetail(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.detail_show = true;
                lime.req('ShopQuesQuestionDetail', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid
                }).then(res => {
                    // console.log(res.data)
                    this.DetailFormData.data = res.data
                    // this.detail_show = true;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },

             // 添加选项
            // onAddOption() {
            //     console.log(this.curr_row)
            //     if (util.empty(this.curr_row)) {
            //         this.$message.error('请选择一条数据');
            //         return;
            //     }
            // },
            // 添加选项
            // onAddOptionSubmit(){
            //     this.search_show = false;
            //     this.SearchFormData.page_num = 1;
            //     this.init();
            // },

        }
    }
</script>
<style >
    .ques-flex .el-input__inner{
        border: none;
        height: 30px;
    }
     .el-image-viewer__mask {
        opacity: 1!important;
    }
</style>

<style scoped>

    .ques-box {
        width: 100%;
        border-bottom: 1px solid #f2f2f2;

    }

    .ques-flex {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        border-right: 1px solid #f2f2f2;
        font-size: 14px;
        line-height: 40px;
        color: #64676d
    }

    .ques-flexlf {
        width: 15%;
        height: 100%;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        text-align: center
    }

    .ques-flexmd {
        width: 70%;
        height: 100%;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        text-align: left;
        padding-left:  10px;
        box-sizing: border-box
    }

    .ques-flexrg {
        width: 15%;
        height: 100%;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        text-align: center
    }

    .ques-add {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color:  #0F7BF6;
        cursor:pointer;
        margin-top:  0px;
    }

    .menu{
        display: inline-block;
        padding:0 16px;
        text-align: center;
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

    .mbstyle{
        margin-bottom: 0px;
    }

    .tagsinput{
        width: 200px;
        margin-right: 20px;
    }

    .footer {
        position: absolute;
        bottom: 10px;
        width: 96%;
        padding-right: 50px!important;
        box-sizing: border-box;
    }

     .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
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

</style>
