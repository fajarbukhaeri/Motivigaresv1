cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.paypal.cordova.mobilesdk/www/cdv-plugin-paypal-mobile-sdk.js",
        "id": "com.paypal.cordova.mobilesdk.PayPalMobile",
        "clobbers": [
            "PayPalMobile"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.paypal.cordova.mobilesdk": "3.1.8",
    "cordova-plugin-whitelist": "1.0.0"
}
// BOTTOM OF METADATA
});