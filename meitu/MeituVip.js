const version = 'V2.0.0 🛠 All-in-One Unlock';

// ================== RevenueCat: Fix Header ==================
if ($request && $request.url.includes("api.revenuecat.com")) {
    var modifiedHeaders = $request.headers;

    const headersToModify = {
        "X-RevenueCat-ETag": "",
        "If-None-Match": "",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
    };

    for (let key in headersToModify) {
        const lowerKey = key.toLowerCase();
        if (lowerKey in modifiedHeaders) {
            modifiedHeaders[lowerKey] = headersToModify[key];
        } else {
            modifiedHeaders[key] = headersToModify[key];
        }
    }

    console.log("🛠 RevenueCat Headers Modified:", JSON.stringify(modifiedHeaders, null, 2));
    $done({ headers: modifiedHeaders });
}

// ================== Meitu: Unlock VIP ==================
else if ($response && $request.url.includes("api-sub.meitu.com")) {
    let obj = JSON.parse($response.body);

    // Thêm chú thích
    obj.Attention = "🎉 Chúc mừng bạn đã unlock VIP Meitu thành công!";

    // Patch thẳng VIP flags
    obj.data = obj.data || {};
    obj.data.is_vip = true;
    obj.data.vip_type = "yearly";
    obj.data.vip_expired_at = "2099-12-31 23:59:59";

    // Nếu có object subscriptions
    if (!obj.subscriber) obj.subscriber = {};
    if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
    if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

    const productId = "meitu.vip.yearly";
    const subscriptionData = {
        is_sandbox: false,
        ownership_type: "PURCHASED",
        period_type: "normal",
        expires_date: "2099-12-31T23:59:59Z",
        original_purchase_date: "2024-07-28T01:04:18Z",
        purchase_date: "2024-07-28T01:04:17Z",
        store: "app_store"
    };

    const entitlementData = {
        product_identifier: productId,
        purchase_date: "2024-07-28T01:04:17Z",
        expires_date: "2099-12-31T23:59:59Z"
    };

    obj.subscriber.subscriptions[productId] = subscriptionData;
    obj.subscriber.entitlements[productId] = entitlementData;

    console.log("✨ Meitu VIP Patched:", JSON.stringify(obj, null, 2));
    $done({ body: JSON.stringify(obj) });
}

// ================== Không match gì ==================
else {
    $done({});
}
