// CapCutVip.js
// Unlock CapCut VIP (fake subscription)
// An toàn: không gửi dữ liệu ra ngoài, chỉ sửa JSON response

const vipInfo = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T23:59:59Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-01-01T00:00:00Z",
  purchase_date: "2024-01-01T00:00:00Z",
  store: "app_store"
};

const entitlement = {
  grace_period_expires_date: null,
  purchase_date: "2024-01-01T00:00:00Z",
  product_identifier: "capcut.vip.yearly",
  expires_date: "2099-12-31T23:59:59Z"
};

let obj = {};
try {
  obj = JSON.parse($response.body);
} catch (e) {
  console.log("❌ JSON parse error:", e);
  $done({});
}

// Thêm VIP cho CapCut
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

obj.subscriber.subscriptions["capcut.vip.yearly"] = vipInfo;
obj.subscriber.entitlements["pro"] = entitlement;

obj.message = "🎉 Unlock CapCut VIP thành công!";

$done({ body: JSON.stringify(obj) });
