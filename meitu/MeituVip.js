// Mapping cho Meitu
const mapping = {
  'Meitu': 'meitu.vip.yearly'   // id gói VIP (có thể chỉnh thành monthly/lifetime tuỳ nhu cầu)
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

// Thêm chú thích để dễ phân biệt
obj.Attention = "Chúc mừng bạn đã unlock VIP Meitu thành công!";

// Thông tin subscription giả
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

// Thông tin entitlement (kích hoạt quyền VIP)
var entitlementData = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "meitu.vip.yearly",
  expires_date: "2099-12-31T23:59:59Z"
};

// Kiểm tra nếu User-Agent có chứa chữ "Meitu"
const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  const productId = mapping[match];
  entitlementData.product_identifier = productId;

  // Đảm bảo object tồn tại
  if (!obj.subscriber) obj.subscriber = {};
  if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
  if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

  // Gán dữ liệu VIP
  obj.subscriber.subscriptions[productId] = subscriptionData;
  obj.subscriber.entitlements[productId] = entitlementData;
}

// Xuất JSON đã chỉnh sửa
$done({ body: JSON.stringify(obj) });
