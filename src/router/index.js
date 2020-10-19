<<<<<<< HEAD
import Vue from 'vue'
import VueRouter from 'vue-router'
import lime from "@/lime.js";

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)



// comm:frees 
const Login = () => import('../views/Login.vue');


// admin:logins levels
const Admin = () => import('../views/Admin.vue');

// admin 的内部页面
const Echarts = () => import('../views/Admin/Echarts.vue');
const Console = () => import('../views/Admin/Console.vue');
const Shop = () => import('../views/Admin/Shop.vue');


// 综合管理
const Manage = () => import('../views/Amanage/Manage.vue');
const Role   = () => import('../views/Amanage/Role.vue');
const Work   = () => import('../views/Amanage/Work.vue');
const Notice   = () => import('../views/Amanage/Notice.vue');
const Order   = () => import('../views/Amanage/Order.vue');


// 财务中心
const Transaction   = () => import('../views/Bfinance/Transaction.vue');
const Spaccount   = () => import('../views/Bfinance/Spaccount.vue');
const Shoptran   = () => import('../views/Bfinance/Shoptran.vue');
const Statistic   = () => import('../views/Bfinance/Statistic.vue');


//车辆与设备
const Vehequipment   = () => import('../views/Dvehicle/Vehequipment.vue');
const Magequipment   = () => import('../views/Dvehicle/Magequipment.vue');
const Simanage   = () => import('../views/Dvehicle/Simanage.vue');


// 培训学习
const Resource   = () => import('../views/Ctrain/Resource.vue');
const Plain   = () => import('../views/Ctrain/Plain.vue');
const Plaindo   = () => import('../views/Ctrain/Plaindo.vue');
const Study   = () => import('../views/Ctrain/Study.vue');
const Question   = () => import('../views/Ctrain/Question.vue');
const Template   = () => import('../views/Ctrain/Template.vue');
const Group   = () => import('../views/Ctrain/Group.vue');
const handList   = () => import('../views/Ctrain/handList.vue');
const handMage   = () => import('../views/Ctrain/handMage.vue');


// 货物与运单
const Customer   = () => import('../views/Egoods/Customer.vue');
const Electronic   = () => import('../views/Egoods/Electronic.vue');
const Goods   = () => import('../views/Egoods/Goods.vue');
const Pack   = () => import('../views/Egoods/Pack.vue');
const Type   = () => import('../views/Egoods/Type.vue');


// 子企业
const Cshop   = () => import('../views/Fsubsidiary/Cshop.vue');
const  fStatistic   = () => import('../views/Fsubsidiary/Statistic.vue');
const Verhcile   = () => import('../views/Fsubsidiary/Verhcile.vue');
const Cstaff   = () => import('../views/Fsubsidiary/Cstaff.vue');


// 隐患追踪
const Danger   = () => import('../views/Gtrack/Danger.vue');
const Dangertmp   = () => import('../views/Gtrack/Dangertmp.vue');

//第三方服务
const Insurancecpy   = () => import('../views/Hservices/Insurancecpy.vue');
const Financingchl   = () => import('../views/Hservices/Financingchl.vue');
const Maintenance   = () => import('../views/Hservices/Maintenance.vue');
const Lookingtrp   = () => import('../views/Hservices/Lookingtrp.vue');
const Talentretm   = () => import('../views/Hservices/Talentretm.vue');
const Lookingood   = () => import('../views/Hservices/Lookingood.vue');
const Secondtrsf   = () => import('../views/Hservices/Secondtrsf.vue');


// 系统与设置
const Information   = () => import('../views/Isetting/Information.vue');
const Shopset   = () => import('../views/Isetting/Shopset.vue');
const Help   = () => import('../views/Isetting/Help.vue');


//关联企业
const Enterprise   = () => import('../views/Krelation/Enterprise.vue');
const Hidangering   = () => import('../views/Krelation/Hidangering.vue');
const Electronicway   = () => import('../views/Krelation/Electronicway.vue');

//我的服务
const Myinsurance   = () => import('../views//Jmy/Myinsurance.vue');
const Myfinancing   = () => import('../views//Jmy/Myfinancing.vue');



const routes = [
    // 登录页面
    {
        path: '/',
        component: Login,
        meta: {
            rbac: 'frees',
            title: '登录'
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            rbac: 'frees',
            title: '登录'
        }
    },
    {
        path: '/admin',
        component: Admin,
        meta: {
            rbac: 'logins',
            title: '管理后台'
        },
        children: [
            {
                path: '/',
                component: Echarts,
                meta: {
                    rbac: 'logins',
                    title: '控制台'
                }
            },           
            {
                path: 'shop/:menu_uuid',
                component: Manage,
                meta: {
                    rbac: 'logins',
                    title: '员工管理'
                }
            },
            {
                path: 'shop_role/:menu_uuid',
                component: Role,
                meta: {
                    rbac: 'logins',
                    title: '角色管理'
                }
            },
            {
                path: 'work_day/:menu_uuid',
                component: Work,
                meta: {
                    rbac: 'logins',
                    title: '工作日清'
                }
            },
            {
                path: 'notice/:menu_uuid',
                component: Notice,
                meta: {
                    rbac: 'logins',
                    title: ' 通知公告'
                }
            },
            {
                path: 'work_order/:menu_uuid',
                component: Order,
                meta: {
                    rbac: 'logins',
                    title: '工单管理'
                }
            },


            {
                path: 'spTransaction/:menu_uuid',
                component: Transaction,
                meta: {
                    rbac: 'logins',
                    title: '与平台交易'
                }
            },
            {
                path: 'shop_account/:menu_uuid',
                component: Spaccount,
                meta: {
                    rbac: 'logins',
                    title: '资金账户'
                }
            },
            {
                path: 'shopshoptran/:menu_uuid',
                component: Shoptran,
                meta: {
                    rbac: 'logins',
                    title: '与企业交易'
                }
            },
            {
                path: 'account_statistic/:menu_uuid',
                component: Statistic,
                meta: {
                    rbac: 'logins',
                    title: '财务统计'
                }
            },


            {
                path: 'resource/:menu_uuid',
                component: Resource,
                meta: {
                    rbac: 'logins',
                    title: '学习资料'
                }
            },
            {
                path: 'plan_group/:menu_uuid',
                component: Plain,
                meta: {
                    rbac: 'logins',
                    title: '计划分组'
                }
            },
            {
                path: 'plan_do/:menu_uuid',
                component: Plaindo,
                meta: {
                    rbac: 'logins',
                    title: '计划管理'
                }
            },
            {
                path: 'study_list/:menu_uuid',
                component: Study,
                meta: {
                    rbac: 'logins',
                    title: '我的学习'
                }
            },
            {
                path: 'question/:menu_uuid',
                component: Question,
                meta: {
                    rbac: 'logins',
                    title: '试卷管理'
                }
            },
            {
                path: 'plan_template/:menu_uuid',
                component: Template,
                meta: {
                    rbac: 'logins',
                    title: '计划模板管理'
                }
            },
            {
                path: 'question_group/:menu_uuid',
                component: Group,
                meta: {
                    rbac: 'logins',
                    title: '试卷分组'
                }
            },
            {
                path: 'hand_mag/:menu_uuid',
                component: handMage,
                meta: {
                    rbac: 'logins',
                    title: '标签管理'
                }
            },
            {
                path: 'hand_mag/handleList/:menu_uuid',
                component: handList,
                meta: {
                    rbac: 'logins',
                    title: '标签分组'
                }
            },

            
            {
                path: 'vehicle_equipment/:menu_uuid',
                component: Vehequipment,
                meta: {
                    rbac: 'logins',
                    title: '车辆管理'
                }
            },
            {
                path: 'equipment_manage/:menu_uuid',
                component: Magequipment,
                meta: {
                    rbac: 'logins',
                    title: '设备管理'
                }
            },
            {
                path: 'sim_manage/:menu_uuid',
                component: Simanage,
                meta: {
                    rbac: 'logins',
                    title: 'Sim卡管理'
                }
            },



            {
                path: 'customer/:menu_uuid',
                component: Customer,
                meta: {
                    rbac: 'logins',
                    title: '企业客户'
                }
            },
            {
                path: 'electronic_waybill/:menu_uuid',
                component: Electronic,
                meta: {
                    rbac: 'logins',
                    title: '电子运单'
                }
            },
            {
                path: 'goods/:menu_uuid',
                component: Goods,
                meta: {
                    rbac: 'logins',
                    title: ' 货物管理'
                }
            },
            {
                path: 'pack/:menu_uuid',
                component: Pack,
                meta: {
                    rbac: 'logins',
                    title: '包装类型'
                }
            },
            {
                path: 'goods_type/:menu_uuid',
                component: Type,
                meta: {
                    rbac: 'logins',
                    title: '货物类型'
                }
            },


            {
                path: 'c_shop/:menu_uuid',
                component: Cshop,
                meta: {
                    rbac: 'logins',
                    title: '企业列表'
                }
            },
            {
                path: 'study_statistic/:menu_uuid',
                component: fStatistic,
                meta: {
                    rbac: 'logins',
                    title: '学习统计'
                }
            },
            {
                path: 'verhcile/:menu_uuid',
                component: Verhcile,
                meta: {
                    rbac: 'logins',
                    title: '车辆管理'
                }
            },
            {
                path: 'c_staff/:menu_uuid',
                component: Cstaff,
                meta: {
                    rbac: 'logins',
                    title: '员工管理'
                }
            },


            {
                path: 'hidden_danger/:menu_uuid',
                component: Danger,
                meta: {
                    rbac: 'logins',
                    title: '隐患排查'
                }
            },
            {
                path: 'hidden_danger_template/:menu_uuid',
                component: Dangertmp,
                meta: {
                    rbac: 'logins',
                    title: '隐患排查模板'
                }
            },


            {
                path: 'insurance_company/:menu_uuid',
                component: Insurancecpy,
                meta: {
                    rbac: 'logins',
                    title: '保险公司'
                }
            },
            {
                path: 'financing_channel/:menu_uuid',
                component: Financingchl,
                meta: {
                    rbac: 'logins',
                    title: '融资渠道'
                }
            },
            {
                path: 'maintenance/:menu_uuid',
                component: Maintenance,
                meta: {
                    rbac: 'logins',
                    title: '维修保养'
                }
            },
            {
                path: 'looking_transport/:menu_uuid',
                component: Lookingtrp,
                meta: {
                    rbac: 'logins',
                    title: '找运力'
                }
            },
            {
                path: 'talent_recruitment/:menu_uuid',
                component: Talentretm,
                meta: {
                    rbac: 'logins',
                    title: '人才招聘'
                }
            },
            {
                path: 'looking_goods/:menu_uuid',
                component: Lookingood,
                meta: {
                    rbac: 'logins',
                    title: '找货物'
                }
            },
            {
                path: 'second_transfer/:menu_uuid',
                component: Secondtrsf,
                meta: {
                    rbac: 'logins',
                    title: '二手转让'
                }
            },


            {
                path: 'shop_information/:menu_uuid',
                component: Information,
                meta: {
                    rbac: 'logins',
                    title: '机构信息'
                }
            },

            {
                path: 'shop_set/:menu_uuid',
                component: Shopset,
                meta: {
                    rbac: 'logins',
                    title: '设置'
                }
            },
            {
                path: 'help/:menu_uuid',
                component: Help,
                meta: {
                    rbac: 'logins',
                    title: '使用帮助'
                }
            },



            {
                path: 'relation_enterprise/:menu_uuid',
                component: Enterprise,
                meta: {
                    rbac: 'logins',
                    title: '企业列表'
                }
            },
            {
                path: 'relation_hidger/:menu_uuid',
                component: Hidangering,
                meta: {
                    rbac: 'logins',
                    title: '隐患排查'
                }
            },
            {
                path: 'relation_electrway/:menu_uuid',
                component: Electronicway,
                meta: {
                    rbac: 'logins',
                    title: '电子运单'
                }
            },

            

            {
                path: 'my_insurance/:menu_uuid',
                component: Myinsurance,
                meta: {
                    rbac: 'logins',
                    title: '我的保险'
                }
            },
            {
                path: 'my_financing/:menu_uuid',
                component: Myfinancing,
                meta: {
                    rbac: 'logins',
                    title: '我的融资'
                }
            },


        ]
    }
];

const router = new VueRouter({
    // mode: 'history', // 去除#号
    // base: process.env.BASE_URL,
    routes
});


// 路由守护处理,登录非登录的界面
router.beforeEach((to, from, next) => {
    let login_token = lime.cookie_get('login_token');

    if (lime.debug) {
        console.log(login_token);
    }

    if (login_token == null || typeof login_token == 'undefined') {
        lime.cookie_set('login_token', null, 0);
        if (to.meta.rbac != 'frees') {
            next('/login');
        } else {
            next();
        }
    } else {
        // 检测login_token是否在线
        lime.req('CheckLoginToken', {
            login_token: login_token,
            business_type: 'shop_staff',
            login_type: 0
        }).then(res => {
            // 更新cookie的缓存,2小时
            lime.cookie_set('login_token', login_token, 7200);
            // 默认进入页面,则自动跳转到'/admin'
            if (to.path == '/') {
                next('/admin');
            } else {
                next();
            }
        }).catch(err => {
            lime.cookie_set('login_token', null, 0);
            // 检测失败,直接跳转到登录页面
            next('/login');
        })
    }
})

export default router

// vehicle equipment
//Vehequipment

=======
import Vue from 'vue'
import VueRouter from 'vue-router'
import lime from "@/lime.js";

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)



// comm:frees 
const Login = () => import('../views/Login.vue');


// admin:logins levels
const Admin = () => import('../views/Admin.vue');

// admin 的内部页面
const Echarts = () => import('../views/Admin/Echarts.vue');
const Console = () => import('../views/Admin/Console.vue');
const Shop = () => import('../views/Admin/Shop.vue');


// 综合管理
const Manage = () => import('../views/Amanage/Manage.vue');
const Role   = () => import('../views/Amanage/Role.vue');
const Work   = () => import('../views/Amanage/Work.vue');
const Notice   = () => import('../views/Amanage/Notice.vue');
const Order   = () => import('../views/Amanage/Order.vue');


// 财务中心
const Transaction   = () => import('../views/Bfinance/Transaction.vue');
const Spaccount   = () => import('../views/Bfinance/Spaccount.vue');
const Shoptran   = () => import('../views/Bfinance/Shoptran.vue');
const Statistic   = () => import('../views/Bfinance/Statistic.vue');


//车辆与设备
const Vehequipment   = () => import('../views/Dvehicle/Vehequipment.vue');
const Magequipment   = () => import('../views/Dvehicle/Magequipment.vue');
const Simanage   = () => import('../views/Dvehicle/Simanage.vue');


// 培训学习
const Resource   = () => import('../views/Ctrain/Resource.vue');
const Plain   = () => import('../views/Ctrain/Plain.vue');
const Plaindo   = () => import('../views/Ctrain/Plaindo.vue');
const Study   = () => import('../views/Ctrain/Study.vue');
const Question   = () => import('../views/Ctrain/Question.vue');
const Template   = () => import('../views/Ctrain/Template.vue');
const Group   = () => import('../views/Ctrain/Group.vue');
const handList   = () => import('../views/Ctrain/handList.vue');
const handMage   = () => import('../views/Ctrain/handMage.vue');


// 货物与运单
const Customer   = () => import('../views/Egoods/Customer.vue');
const Electronic   = () => import('../views/Egoods/Electronic.vue');
const Goods   = () => import('../views/Egoods/Goods.vue');
const Pack   = () => import('../views/Egoods/Pack.vue');
const Type   = () => import('../views/Egoods/Type.vue');


// 子企业
const Cshop   = () => import('../views/Fsubsidiary/Cshop.vue');
const  fStatistic   = () => import('../views/Fsubsidiary/Statistic.vue');
const Verhcile   = () => import('../views/Fsubsidiary/Verhcile.vue');
const Cstaff   = () => import('../views/Fsubsidiary/Cstaff.vue');


// 隐患追踪
const Danger   = () => import('../views/Gtrack/Danger.vue');
const Dangertmp   = () => import('../views/Gtrack/Dangertmp.vue');

//第三方服务
const Insurancecpy   = () => import('../views/Hservices/Insurancecpy.vue');
const Financingchl   = () => import('../views/Hservices/Financingchl.vue');
const Maintenance   = () => import('../views/Hservices/Maintenance.vue');
const Lookingtrp   = () => import('../views/Hservices/Lookingtrp.vue');
const Talentretm   = () => import('../views/Hservices/Talentretm.vue');
const Lookingood   = () => import('../views/Hservices/Lookingood.vue');
const Secondtrsf   = () => import('../views/Hservices/Secondtrsf.vue');


// 系统与设置
const Information   = () => import('../views/Isetting/Information.vue');
const Shopset   = () => import('../views/Isetting/Shopset.vue');
const Help   = () => import('../views/Isetting/Help.vue');


//关联企业
const Enterprise   = () => import('../views/Krelation/Enterprise.vue');
const Hidangering   = () => import('../views/Krelation/Hidangering.vue');
const Electronicway   = () => import('../views/Krelation/Electronicway.vue');

//我的服务
const Myinsurance   = () => import('../views//Jmy/Myinsurance.vue');
const Myfinancing   = () => import('../views//Jmy/Myfinancing.vue');



const routes = [
    // 登录页面
    {
        path: '/',
        component: Login,
        meta: {
            rbac: 'frees',
            title: '登录'
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            rbac: 'frees',
            title: '登录'
        }
    },
    {
        path: '/admin',
        component: Admin,
        meta: {
            rbac: 'logins',
            title: '管理后台'
        },
        children: [
            {
                path: '/',
                component: Echarts,
                meta: {
                    rbac: 'logins',
                    title: '控制台'
                }
            },           
            {
                path: 'shop/:menu_uuid',
                component: Manage,
                meta: {
                    rbac: 'logins',
                    title: '员工管理'
                }
            },
            {
                path: 'shop_role/:menu_uuid',
                component: Role,
                meta: {
                    rbac: 'logins',
                    title: '角色管理'
                }
            },
            {
                path: 'work_day/:menu_uuid',
                component: Work,
                meta: {
                    rbac: 'logins',
                    title: '工作日清'
                }
            },
            {
                path: 'notice/:menu_uuid',
                component: Notice,
                meta: {
                    rbac: 'logins',
                    title: ' 通知公告'
                }
            },
            {
                path: 'work_order/:menu_uuid',
                component: Order,
                meta: {
                    rbac: 'logins',
                    title: '工单管理'
                }
            },


            {
                path: 'spTransaction/:menu_uuid',
                component: Transaction,
                meta: {
                    rbac: 'logins',
                    title: '与平台交易'
                }
            },
            {
                path: 'shop_account/:menu_uuid',
                component: Spaccount,
                meta: {
                    rbac: 'logins',
                    title: '资金账户'
                }
            },
            {
                path: 'shopshoptran/:menu_uuid',
                component: Shoptran,
                meta: {
                    rbac: 'logins',
                    title: '与企业交易'
                }
            },
            {
                path: 'account_statistic/:menu_uuid',
                component: Statistic,
                meta: {
                    rbac: 'logins',
                    title: '财务统计'
                }
            },


            {
                path: 'resource/:menu_uuid',
                component: Resource,
                meta: {
                    rbac: 'logins',
                    title: '学习资料'
                }
            },
            {
                path: 'plan_group/:menu_uuid',
                component: Plain,
                meta: {
                    rbac: 'logins',
                    title: '计划分组'
                }
            },
            {
                path: 'plan_do/:menu_uuid',
                component: Plaindo,
                meta: {
                    rbac: 'logins',
                    title: '计划管理'
                }
            },
            {
                path: 'study_list/:menu_uuid',
                component: Study,
                meta: {
                    rbac: 'logins',
                    title: '我的学习'
                }
            },
            {
                path: 'question/:menu_uuid',
                component: Question,
                meta: {
                    rbac: 'logins',
                    title: '试卷管理'
                }
            },
            {
                path: 'plan_template/:menu_uuid',
                component: Template,
                meta: {
                    rbac: 'logins',
                    title: '计划模板管理'
                }
            },
            {
                path: 'question_group/:menu_uuid',
                component: Group,
                meta: {
                    rbac: 'logins',
                    title: '试卷分组'
                }
            },
            {
                path: 'hand_mag/:menu_uuid',
                component: handMage,
                meta: {
                    rbac: 'logins',
                    title: '标签管理'
                }
            },
            {
                path: 'hand_mag/handleList/:menu_uuid',
                component: handList,
                meta: {
                    rbac: 'logins',
                    title: '标签分组'
                }
            },

            
            {
                path: 'vehicle_equipment/:menu_uuid',
                component: Vehequipment,
                meta: {
                    rbac: 'logins',
                    title: '车辆管理'
                }
            },
            {
                path: 'equipment_manage/:menu_uuid',
                component: Magequipment,
                meta: {
                    rbac: 'logins',
                    title: '设备管理'
                }
            },
            {
                path: 'sim_manage/:menu_uuid',
                component: Simanage,
                meta: {
                    rbac: 'logins',
                    title: 'Sim卡管理'
                }
            },



            {
                path: 'customer/:menu_uuid',
                component: Customer,
                meta: {
                    rbac: 'logins',
                    title: '企业客户'
                }
            },
            {
                path: 'electronic_waybill/:menu_uuid',
                component: Electronic,
                meta: {
                    rbac: 'logins',
                    title: '电子运单'
                }
            },
            {
                path: 'goods/:menu_uuid',
                component: Goods,
                meta: {
                    rbac: 'logins',
                    title: ' 货物管理'
                }
            },
            {
                path: 'pack/:menu_uuid',
                component: Pack,
                meta: {
                    rbac: 'logins',
                    title: '包装类型'
                }
            },
            {
                path: 'goods_type/:menu_uuid',
                component: Type,
                meta: {
                    rbac: 'logins',
                    title: '货物类型'
                }
            },


            {
                path: 'c_shop/:menu_uuid',
                component: Cshop,
                meta: {
                    rbac: 'logins',
                    title: '企业列表'
                }
            },
            {
                path: 'study_statistic/:menu_uuid',
                component: fStatistic,
                meta: {
                    rbac: 'logins',
                    title: '学习统计'
                }
            },
            {
                path: 'verhcile/:menu_uuid',
                component: Verhcile,
                meta: {
                    rbac: 'logins',
                    title: '车辆管理'
                }
            },
            {
                path: 'c_staff/:menu_uuid',
                component: Cstaff,
                meta: {
                    rbac: 'logins',
                    title: '员工管理'
                }
            },


            {
                path: 'hidden_danger/:menu_uuid',
                component: Danger,
                meta: {
                    rbac: 'logins',
                    title: '隐患排查'
                }
            },
            {
                path: 'hidden_danger_template/:menu_uuid',
                component: Dangertmp,
                meta: {
                    rbac: 'logins',
                    title: '隐患排查模板'
                }
            },


            {
                path: 'insurance_company/:menu_uuid',
                component: Insurancecpy,
                meta: {
                    rbac: 'logins',
                    title: '保险公司'
                }
            },
            {
                path: 'financing_channel/:menu_uuid',
                component: Financingchl,
                meta: {
                    rbac: 'logins',
                    title: '融资渠道'
                }
            },
            {
                path: 'maintenance/:menu_uuid',
                component: Maintenance,
                meta: {
                    rbac: 'logins',
                    title: '维修保养'
                }
            },
            {
                path: 'looking_transport/:menu_uuid',
                component: Lookingtrp,
                meta: {
                    rbac: 'logins',
                    title: '找运力'
                }
            },
            {
                path: 'talent_recruitment/:menu_uuid',
                component: Talentretm,
                meta: {
                    rbac: 'logins',
                    title: '人才招聘'
                }
            },
            {
                path: 'looking_goods/:menu_uuid',
                component: Lookingood,
                meta: {
                    rbac: 'logins',
                    title: '找货物'
                }
            },
            {
                path: 'second_transfer/:menu_uuid',
                component: Secondtrsf,
                meta: {
                    rbac: 'logins',
                    title: '二手转让'
                }
            },


            {
                path: 'shop_information/:menu_uuid',
                component: Information,
                meta: {
                    rbac: 'logins',
                    title: '机构信息'
                }
            },

            {
                path: 'shop_set/:menu_uuid',
                component: Shopset,
                meta: {
                    rbac: 'logins',
                    title: '设置'
                }
            },
            {
                path: 'help/:menu_uuid',
                component: Help,
                meta: {
                    rbac: 'logins',
                    title: '使用帮助'
                }
            },



            {
                path: 'relation_enterprise/:menu_uuid',
                component: Enterprise,
                meta: {
                    rbac: 'logins',
                    title: '企业列表'
                }
            },
            {
                path: 'relation_hidger/:menu_uuid',
                component: Hidangering,
                meta: {
                    rbac: 'logins',
                    title: '隐患排查'
                }
            },
            {
                path: 'relation_electrway/:menu_uuid',
                component: Electronicway,
                meta: {
                    rbac: 'logins',
                    title: '电子运单'
                }
            },

            

            {
                path: 'my_insurance/:menu_uuid',
                component: Myinsurance,
                meta: {
                    rbac: 'logins',
                    title: '我的保险'
                }
            },
            {
                path: 'my_financing/:menu_uuid',
                component: Myfinancing,
                meta: {
                    rbac: 'logins',
                    title: '我的融资'
                }
            },


        ]
    }
];

const router = new VueRouter({
    // mode: 'history', // 去除#号
    // base: process.env.BASE_URL,
    routes
});


// 路由守护处理,登录非登录的界面
router.beforeEach((to, from, next) => {
    let login_token = lime.cookie_get('login_token');

    if (lime.debug) {
        console.log(login_token);
    }

    if (login_token == null || typeof login_token == 'undefined') {
        lime.cookie_set('login_token', null, 0);
        if (to.meta.rbac != 'frees') {
            next('/login');
        } else {
            next();
        }
    } else {
        // 检测login_token是否在线
        lime.req('CheckLoginToken', {
            login_token: login_token,
            business_type: 'shop_staff',
            login_type: 0
        }).then(res => {
            // 更新cookie的缓存,2小时
            lime.cookie_set('login_token', login_token, 7200);
            // 默认进入页面,则自动跳转到'/admin'
            if (to.path == '/') {
                next('/admin');
            } else {
                next();
            }
        }).catch(err => {
            lime.cookie_set('login_token', null, 0);
            // 检测失败,直接跳转到登录页面
            next('/login');
        })
    }
})

export default router

// vehicle equipment
//Vehequipment

>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
