// Script auto unlock VIP Meitu (RevenueCat API)

var obj = JSON.parse($response.body);

// Thêm thông báo để dễ nhận biết
obj.Attention = "Chúc mừng bạn đã unlock VIP Meitu (auto) thành công!";

// Thông tin gói VIP (subscription)
var subscriptionData = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T23:59:59Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store"
};

// Thông tin entitlement (quyền VIP)
var entitlementData = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "meitu.vip.yearly",
  expires_date: "2099-12-31T23:59:59Z"
};

// Đảm bảo object có đầy đủ key
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

// Gán gói VIP (ở đây mình dùng yearly, bạn có thể đổi thành lifetime nếu muốn)
obj.subscriber.subscriptions["meitu.vip.yearly"] = subscriptionData;
obj.subscriber.entitlements["meitu.vip.yearly"] = entitlementData;

// Xuất response đã patch
$done({ body: JSON.stringify(obj) });
