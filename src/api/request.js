<<<<<<< HEAD
/*
 * @Author: xk
 * @Date: 2020-09-11 16:51:53
 * @LastEditTime: 2020-09-24 17:18:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/api/request.js
 */
import lime from "@/lime.js";

//admin-消息-列表
export const ShopMsgList = (params, callback) => { return lime.req("ShopMsgList", params).then(callback)};
//admin-消息-删除
export const ShopMsgDel = (params, callback) => { return lime.req("ShopMsgDel", params).then(callback)};


// 通知公告-列表
export const noticeList = (params, callback) => { return lime.req("ShopNoticeList", params).then(callback)};
// 通知公告-添加
export const noticeAdd = (params, callback) => { return lime.req("ShopNoticeAdd", params).then(callback)};
// 通知公告-删除
export const noticeDel = (params, callback) => { return lime.req("ShopNoticeDel", params).then(callback)};
// 通知公告-编辑
export const noticeEdit = (params, callback) => { return lime.req("ShopNoticeEdit", params).then(callback)};
// 工单管理-列表
export const workOrderList = (params, callback) => { return lime.req("ShopWorkOrderList", params).then(callback)};
// 工单管理-添加
export const workOrderAdd = (params, callback) => { return lime.req("ShopWorkOrderAdd", params).then(callback)};
// 工单管理-删除
export const workOrderDel = (params, callback) => { return lime.req("ShopWorkOrderDel", params).then(callback)};
// 工单管理-编辑
export const workOrderEdit = (params, callback) => { return lime.req("ShopWorkOrderEdit", params).then(callback)};

// 财务中心-资金账户-账户列表
export const ShopAccountList = (params, callback) => { return lime.req("ShopAccountDetails", params).then(callback)};
// 财务中心-资金账户-账户详细
export const ShopAccountDetail = (params, callback) => { return lime.req("ShopAccountDetail", params).then(callback)};
// 财务中心-财务统计-列表
export const ShopTradeAccountList = (params, callback) => { return lime.req("ShopTradeAccountList", params).then(callback)};

// 培训学习-计划管理-列表
export const ShopPlanList = (params, callback) => { return lime.req("ShopPlanList", params).then(callback)};
// 培训学习-计划管理-添加
export const ShopPlanAdd = (params, callback) => { return lime.req("ShopPlanAdd", params).then(callback)};
// 培训学习-计划管理-删除
export const ShopPlanDel = (params, callback) => { return lime.req("ShopPlanDel", params).then(callback)};
// 培训学习-计划管理-编辑
export const ShopPlanEdit = (params, callback) => { return lime.req("ShopPlanEdit", params).then(callback)};
// 培训学习-计划管理-详细
export const ShopPlanDetail = (params, callback) => { return lime.req("ShopPlanDetail", params).then(callback)};


// 车辆与设备-车辆管理-列表
export const ShopVehExtendList = (params, callback) => { return lime.req("ShopVehExtendList", params).then(callback)};
// 车辆与设备-车辆管理-添加
export const ShopVehExtendAdd = (params, callback) => { return lime.req("ShopVehExtendAdd", params).then(callback)};
// 车辆与设备-车辆管理-删除
export const ShopVehExtendDel = (params, callback) => { return lime.req("ShopVehExtendDel", params).then(callback)};
// 车辆与设备-车辆管理-编辑
export const ShopVehExtendEdit = (params, callback) => { return lime.req("ShopVehExtendEdit", params).then(callback)};
// 车辆与设备-车辆管理-详细
export const ShopVehExtendDetail = (params, callback) => { return lime.req("ShopVehExtendDetail", params).then(callback)};
// 车辆与设备-车辆管理-车辆与设备绑定
export const ShopVehExtendBind = (params, callback) => { return lime.req("ShopVehExtendBind", params).then(callback)};
// 车辆与设备-车辆管理-车辆与设备解绑
export const ShopVehExtendUnbind = (params, callback) => { return lime.req("ShopVehExtendUnbind", params).then(callback)};
// 车辆与设备-Sim卡管理-列表
export const ShopSimList = (params, callback) => { return lime.req("ShopSimList", params).then(callback)};
// 车辆与设备-Sim卡管理-添加
export const ShopSimAdd = (params, callback) => { return lime.req("ShopSimAdd", params).then(callback)};
// 车辆与设备-Sim卡管理-删除
export const ShopSimDel = (params, callback) => { return lime.req("ShopSimDel", params).then(callback)};
// 车辆与设备-Sim卡管理-编辑
export const ShopSimEdit = (params, callback) => { return lime.req("ShopSimEdit", params).then(callback)};
// 车辆与设备-Sim卡管理-详细
export const ShopSimDetail = (params, callback) => { return lime.req("ShopSimDetail", params).then(callback)};
// 车辆与设备-设备管理-列表
export const ShopDeviceList = (params, callback) => { return lime.req("ShopDeviceList", params).then(callback)};
// 车辆与设备-设备管理-添加
export const ShopDeviceAdd = (params, callback) => { return lime.req("ShopDeviceAdd", params).then(callback)};
// 车辆与设备-设备管理-删除
export const ShopDeviceDel = (params, callback) => { return lime.req("ShopDeviceDel", params).then(callback)};
// 车辆与设备-设备管理-编辑
export const ShopDeviceEdit = (params, callback) => { return lime.req("ShopDeviceEdit", params).then(callback)};
// 车辆与设备-设备管理-详细
export const ShopDeviceDetail = (params, callback) => { return lime.req("ShopDeviceDetail", params).then(callback)};
// 车辆与设备-设备管理-绑定
export const ShopDeviceBind = (params, callback) => { return lime.req("ShopDeviceBind", params).then(callback)};
// 车辆与设备-设备管理-解绑
export const ShopDeviceUnbind = (params, callback) => { return lime.req("ShopDeviceUnbind", params).then(callback)};
// 车辆与设备-设备管理-状态变更
export const ShopDeviceEditStatus = (params, callback) => { return lime.req("ShopDeviceEditStatus", params).then(callback)};

// 货物与运单-电子运单-列表
export const EbShopList = (params, callback) => { return lime.req("EbShopList", params).then(callback)};
// 货物与运单-电子运单-城市 uuid
export const GetCityUuid = (params, callback) => { return lime.req("GetCityUuid", params).then(callback)};
// 货物与运单-电子运单-审核人
export const EbStaffList = (params, callback) => { return lime.req("EbStaffList", params).then(callback)};
// 货物与运单-电子运单-承运方列表
export const EbCarrierList = (params, callback) => { return lime.req("EbCarrierList", params).then(callback)};
// 货物与运单-电子运单-承运方编辑
export const EbCarrierEdit = (params, callback) => { return lime.req("EbCarrierEdit", params).then(callback)};


// 货物与运单-电子运单-关联车辆
export const EbShopVehicleList = (params, callback) => { return lime.req("EbShopVehicleList", params).then(callback)};
// 货物与运单-电子运单-添加
export const EbShopAdd = (params, callback) => { return lime.req("EbAdd", params).then(callback)};
// 货物与运单-电子运单-作废
export const EbShopCancel = (params, callback) => { return lime.req("EbShopCancel", params).then(callback)};
// 货物与运单-电子运单-审核
export const EbShopAudit = (params, callback) => { return lime.req("EbShopAudit", params).then(callback)};
// 货物与运单-电子运单-接单
export const EbShopStaffReceiveBillAudit = (params, callback) => { return lime.req("EbShopStaffReceiveBillAudit", params).then(callback)};
// 货物与运单-电子运单-完成
export const EbShopConfirm = (params, callback) => { return lime.req("EbShopConfirm", params).then(callback)};





// 货物与运单-电子运单-详细
export const EbDetail = (params, callback) => { return lime.req("EbDetail", params).then(callback)};
// 货物与运单-电子运单-添加-参与人
export const EbShopListCertificate = (params, callback) => { return lime.req("EbShopListCertificate", params).then(callback)};

// 货物与运单-货物管理-列表
export const EbGoodList = (params, callback) => { return lime.req("EbGoodList", params).then(callback)};

// 货物与运单-货物管理-添加
export const EbGoodAdd = (params, callback) => { return lime.req("EbGoodAdd", params).then(callback)};
// 货物与运单-货物管理-删除
export const EbGoodDel = (params, callback) => { return lime.req("EbGoodDel", params).then(callback)};
// 货物与运单-货物管理-编辑
export const EbGoodEdit = (params, callback) => { return lime.req("EbGoodEdit", params).then(callback)};
// 货物与运单-货物管理-详细
export const EbGoodDetail = (params, callback) => { return lime.req("EbGoodDetail", params).then(callback)};
// 货物与运单-包装类型-列表
export const EbPackTypeList = (params, callback) => { return lime.req("EbPackTypeList", params).then(callback)};
// 货物与运单-包装类型-添加
export const EbPackTypeAdd = (params, callback) => { return lime.req("EbPackTypeAdd", params).then(callback)};
// 货物与运单-包装类型-删除
export const EbPackTypeDel = (params, callback) => { return lime.req("EbPackTypeDel", params).then(callback)};
// 货物与运单-包装类型-编辑
export const EbPackTypeEdit = (params, callback) => { return lime.req("EbPackTypeEdit", params).then(callback)};
// 货物与运单-包装类型-详细
export const EbPackTypeDetail = (params, callback) => { return lime.req("EbPackTypeDetail", params).then(callback)};
// 货物与运单-货物类型-列表
export const EbGoodsTypeList = (params, callback) => { return lime.req("EbGoodsTypeList", params).then(callback)};
// 货物与运单-货物类型-添加
export const EbGoodsTypeAdd = (params, callback) => { return lime.req("EbGoodsTypeAdd", params).then(callback)};
// 货物与运单-货物类型-删除
export const EbGoodsTypeDel = (params, callback) => { return lime.req("EbGoodsTypeDel", params).then(callback)};
// 货物与运单-货物类型-编辑
export const EbGoodsTypeEdit = (params, callback) => { return lime.req("EbGoodsTypeEdit", params).then(callback)};
// 货物与运单-货物类型-详细
export const EbGoodsTypeDetail = (params, callback) => { return lime.req("EbGoodsTypeDetail", params).then(callback)};



// 子企业-企业列表-列表
export const ShopChildList = (params, callback) => { return lime.req("ShopChildList", params).then(callback)};
// 子企业-企业列表-详细
export const ShopChildDetail = (params, callback) => { return lime.req("ShopChildDetail", params).then(callback)};



// 关联企业-企业列表-列表
export const ShopAgentShopList = (params, callback) => { return lime.req("ShopAgentShopList", params).then(callback)};
// 关联企业-企业列表-详细
export const ShopAgentShopDetail = (params, callback) => { return lime.req("ShopAgentShopDetail", params).then(callback)};


// 系统与设置-机构信息-获取配置项
export const ShopRoleList = (params, callback) => { return lime.req("ShopRoleList", params).then(callback)};
//系统与设置-机构信息-保存
=======
/*
 * @Author: xk
 * @Date: 2020-09-11 16:51:53
 * @LastEditTime: 2020-09-24 17:18:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/api/request.js
 */
import lime from "@/lime.js";

//admin-消息-列表
export const ShopMsgList = (params, callback) => { return lime.req("ShopMsgList", params).then(callback)};
//admin-消息-删除
export const ShopMsgDel = (params, callback) => { return lime.req("ShopMsgDel", params).then(callback)};


// 通知公告-列表
export const noticeList = (params, callback) => { return lime.req("ShopNoticeList", params).then(callback)};
// 通知公告-添加
export const noticeAdd = (params, callback) => { return lime.req("ShopNoticeAdd", params).then(callback)};
// 通知公告-删除
export const noticeDel = (params, callback) => { return lime.req("ShopNoticeDel", params).then(callback)};
// 通知公告-编辑
export const noticeEdit = (params, callback) => { return lime.req("ShopNoticeEdit", params).then(callback)};
// 工单管理-列表
export const workOrderList = (params, callback) => { return lime.req("ShopWorkOrderList", params).then(callback)};
// 工单管理-添加
export const workOrderAdd = (params, callback) => { return lime.req("ShopWorkOrderAdd", params).then(callback)};
// 工单管理-删除
export const workOrderDel = (params, callback) => { return lime.req("ShopWorkOrderDel", params).then(callback)};
// 工单管理-编辑
export const workOrderEdit = (params, callback) => { return lime.req("ShopWorkOrderEdit", params).then(callback)};

// 财务中心-资金账户-账户列表
export const ShopAccountList = (params, callback) => { return lime.req("ShopAccountDetails", params).then(callback)};
// 财务中心-资金账户-账户详细
export const ShopAccountDetail = (params, callback) => { return lime.req("ShopAccountDetail", params).then(callback)};
// 财务中心-财务统计-列表
export const ShopTradeAccountList = (params, callback) => { return lime.req("ShopTradeAccountList", params).then(callback)};

// 培训学习-计划管理-列表
export const ShopPlanList = (params, callback) => { return lime.req("ShopPlanList", params).then(callback)};
// 培训学习-计划管理-添加
export const ShopPlanAdd = (params, callback) => { return lime.req("ShopPlanAdd", params).then(callback)};
// 培训学习-计划管理-删除
export const ShopPlanDel = (params, callback) => { return lime.req("ShopPlanDel", params).then(callback)};
// 培训学习-计划管理-编辑
export const ShopPlanEdit = (params, callback) => { return lime.req("ShopPlanEdit", params).then(callback)};
// 培训学习-计划管理-详细
export const ShopPlanDetail = (params, callback) => { return lime.req("ShopPlanDetail", params).then(callback)};


// 车辆与设备-车辆管理-列表
export const ShopVehExtendList = (params, callback) => { return lime.req("ShopVehExtendList", params).then(callback)};
// 车辆与设备-车辆管理-添加
export const ShopVehExtendAdd = (params, callback) => { return lime.req("ShopVehExtendAdd", params).then(callback)};
// 车辆与设备-车辆管理-删除
export const ShopVehExtendDel = (params, callback) => { return lime.req("ShopVehExtendDel", params).then(callback)};
// 车辆与设备-车辆管理-编辑
export const ShopVehExtendEdit = (params, callback) => { return lime.req("ShopVehExtendEdit", params).then(callback)};
// 车辆与设备-车辆管理-详细
export const ShopVehExtendDetail = (params, callback) => { return lime.req("ShopVehExtendDetail", params).then(callback)};
// 车辆与设备-车辆管理-车辆与设备绑定
export const ShopVehExtendBind = (params, callback) => { return lime.req("ShopVehExtendBind", params).then(callback)};
// 车辆与设备-车辆管理-车辆与设备解绑
export const ShopVehExtendUnbind = (params, callback) => { return lime.req("ShopVehExtendUnbind", params).then(callback)};
// 车辆与设备-Sim卡管理-列表
export const ShopSimList = (params, callback) => { return lime.req("ShopSimList", params).then(callback)};
// 车辆与设备-Sim卡管理-添加
export const ShopSimAdd = (params, callback) => { return lime.req("ShopSimAdd", params).then(callback)};
// 车辆与设备-Sim卡管理-删除
export const ShopSimDel = (params, callback) => { return lime.req("ShopSimDel", params).then(callback)};
// 车辆与设备-Sim卡管理-编辑
export const ShopSimEdit = (params, callback) => { return lime.req("ShopSimEdit", params).then(callback)};
// 车辆与设备-Sim卡管理-详细
export const ShopSimDetail = (params, callback) => { return lime.req("ShopSimDetail", params).then(callback)};
// 车辆与设备-设备管理-列表
export const ShopDeviceList = (params, callback) => { return lime.req("ShopDeviceList", params).then(callback)};
// 车辆与设备-设备管理-添加
export const ShopDeviceAdd = (params, callback) => { return lime.req("ShopDeviceAdd", params).then(callback)};
// 车辆与设备-设备管理-删除
export const ShopDeviceDel = (params, callback) => { return lime.req("ShopDeviceDel", params).then(callback)};
// 车辆与设备-设备管理-编辑
export const ShopDeviceEdit = (params, callback) => { return lime.req("ShopDeviceEdit", params).then(callback)};
// 车辆与设备-设备管理-详细
export const ShopDeviceDetail = (params, callback) => { return lime.req("ShopDeviceDetail", params).then(callback)};
// 车辆与设备-设备管理-绑定
export const ShopDeviceBind = (params, callback) => { return lime.req("ShopDeviceBind", params).then(callback)};
// 车辆与设备-设备管理-解绑
export const ShopDeviceUnbind = (params, callback) => { return lime.req("ShopDeviceUnbind", params).then(callback)};
// 车辆与设备-设备管理-状态变更
export const ShopDeviceEditStatus = (params, callback) => { return lime.req("ShopDeviceEditStatus", params).then(callback)};

// 货物与运单-电子运单-列表
export const EbShopList = (params, callback) => { return lime.req("EbShopList", params).then(callback)};
// 货物与运单-电子运单-城市 uuid
export const GetCityUuid = (params, callback) => { return lime.req("GetCityUuid", params).then(callback)};
// 货物与运单-电子运单-审核人
export const EbStaffList = (params, callback) => { return lime.req("EbStaffList", params).then(callback)};
// 货物与运单-电子运单-承运方列表
export const EbCarrierList = (params, callback) => { return lime.req("EbCarrierList", params).then(callback)};
// 货物与运单-电子运单-承运方编辑
export const EbCarrierEdit = (params, callback) => { return lime.req("EbCarrierEdit", params).then(callback)};


// 货物与运单-电子运单-关联车辆
export const EbShopVehicleList = (params, callback) => { return lime.req("EbShopVehicleList", params).then(callback)};
// 货物与运单-电子运单-添加
export const EbShopAdd = (params, callback) => { return lime.req("EbAdd", params).then(callback)};
// 货物与运单-电子运单-作废
export const EbShopCancel = (params, callback) => { return lime.req("EbShopCancel", params).then(callback)};
// 货物与运单-电子运单-审核
export const EbShopAudit = (params, callback) => { return lime.req("EbShopAudit", params).then(callback)};
// 货物与运单-电子运单-接单
export const EbShopStaffReceiveBillAudit = (params, callback) => { return lime.req("EbShopStaffReceiveBillAudit", params).then(callback)};
// 货物与运单-电子运单-完成
export const EbShopConfirm = (params, callback) => { return lime.req("EbShopConfirm", params).then(callback)};





// 货物与运单-电子运单-详细
export const EbDetail = (params, callback) => { return lime.req("EbDetail", params).then(callback)};
// 货物与运单-电子运单-添加-参与人
export const EbShopListCertificate = (params, callback) => { return lime.req("EbShopListCertificate", params).then(callback)};

// 货物与运单-货物管理-列表
export const EbGoodList = (params, callback) => { return lime.req("EbGoodList", params).then(callback)};

// 货物与运单-货物管理-添加
export const EbGoodAdd = (params, callback) => { return lime.req("EbGoodAdd", params).then(callback)};
// 货物与运单-货物管理-删除
export const EbGoodDel = (params, callback) => { return lime.req("EbGoodDel", params).then(callback)};
// 货物与运单-货物管理-编辑
export const EbGoodEdit = (params, callback) => { return lime.req("EbGoodEdit", params).then(callback)};
// 货物与运单-货物管理-详细
export const EbGoodDetail = (params, callback) => { return lime.req("EbGoodDetail", params).then(callback)};
// 货物与运单-包装类型-列表
export const EbPackTypeList = (params, callback) => { return lime.req("EbPackTypeList", params).then(callback)};
// 货物与运单-包装类型-添加
export const EbPackTypeAdd = (params, callback) => { return lime.req("EbPackTypeAdd", params).then(callback)};
// 货物与运单-包装类型-删除
export const EbPackTypeDel = (params, callback) => { return lime.req("EbPackTypeDel", params).then(callback)};
// 货物与运单-包装类型-编辑
export const EbPackTypeEdit = (params, callback) => { return lime.req("EbPackTypeEdit", params).then(callback)};
// 货物与运单-包装类型-详细
export const EbPackTypeDetail = (params, callback) => { return lime.req("EbPackTypeDetail", params).then(callback)};
// 货物与运单-货物类型-列表
export const EbGoodsTypeList = (params, callback) => { return lime.req("EbGoodsTypeList", params).then(callback)};
// 货物与运单-货物类型-添加
export const EbGoodsTypeAdd = (params, callback) => { return lime.req("EbGoodsTypeAdd", params).then(callback)};
// 货物与运单-货物类型-删除
export const EbGoodsTypeDel = (params, callback) => { return lime.req("EbGoodsTypeDel", params).then(callback)};
// 货物与运单-货物类型-编辑
export const EbGoodsTypeEdit = (params, callback) => { return lime.req("EbGoodsTypeEdit", params).then(callback)};
// 货物与运单-货物类型-详细
export const EbGoodsTypeDetail = (params, callback) => { return lime.req("EbGoodsTypeDetail", params).then(callback)};



// 子企业-企业列表-列表
export const ShopChildList = (params, callback) => { return lime.req("ShopChildList", params).then(callback)};
// 子企业-企业列表-详细
export const ShopChildDetail = (params, callback) => { return lime.req("ShopChildDetail", params).then(callback)};



// 关联企业-企业列表-列表
export const ShopAgentShopList = (params, callback) => { return lime.req("ShopAgentShopList", params).then(callback)};
// 关联企业-企业列表-详细
export const ShopAgentShopDetail = (params, callback) => { return lime.req("ShopAgentShopDetail", params).then(callback)};


// 系统与设置-机构信息-获取配置项
export const ShopRoleList = (params, callback) => { return lime.req("ShopRoleList", params).then(callback)};
//系统与设置-机构信息-保存
>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
export const SetShopSave = (params, callback) => { return lime.req("SetShopSave", params).then(callback)};