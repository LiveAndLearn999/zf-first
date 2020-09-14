/*
 * @Author: xk
 * @Date: 2020-09-11 16:51:53
 * @LastEditTime: 2020-09-14 17:43:25
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

// 货物与运单-电子运单-列表
export const EbShopList = (params, callback) => { return lime.req("EbShopList", params).then(callback)};
// 货物与运单-电子运单-添加
export const EbShopAdd = (params, callback) => { return lime.req("EbAdd", params).then(callback)};
// 行政区域接口
export const GetArea = (params, callback) => { return lime.req("GetArea", params).then(callback)};
// 货物与运单-货物管理-列表
export const EbGoodList = (params, callback) => { return lime.req("EbGoodList", params).then(callback)};


// 子企业-企业列表-列表
export const ShopChildList = (params, callback) => { return lime.req("ShopChildList", params).then(callback)};
// 子企业-企业列表-详细
export const ShopChildDetail = (params, callback) => { return lime.req("ShopChildDetail", params).then(callback)};