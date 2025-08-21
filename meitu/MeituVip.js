// Meitu VIP Unlock
var obj = JSON.parse($response.body);

// Ghi chú để dễ kiểm tra trong log
obj.note = "Đã unlock VIP Meitu bởi Shadowrocket";

// Thay đổi dữ liệu VIP
if (obj.data) {
  obj.data.is_vip = true;
  obj.data.vip_type = 1; // 1 = VIP, có thể đổi thành 2 nếu là SVIP
  obj.data.vip_expired_at = 4092599349000; // ~ Năm 2099
}

// Xuất JSON đã chỉnh sửa
$done({ body: JSON.stringify(obj) });
