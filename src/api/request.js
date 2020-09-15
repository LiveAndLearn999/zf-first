/*
 * @Author: xk
 * @Date: 2020-09-11 16:51:53
 * @LastEditTime: 2020-09-15 18:07:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/api/request.js
 */
import lime from "@/lime.js";

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
// 货物与运单-电子运单-添加
export const EbShopAdd = (params, callback) => { return lime.req("EbAdd", params).then(callback)};
// 行政区域接口
export const GetArea = (params, callback) => { return lime.req("GetArea", params).then(callback)};
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