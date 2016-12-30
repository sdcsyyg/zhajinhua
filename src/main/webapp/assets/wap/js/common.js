/**基础常量配置**/
var Constants = {
    APP_ID: 'A6916104895515',
    APP_KEY: 'D55C4A40-12C3-7265-56C5-E62D7E71CB2C',
    BASE_URL: '/wap',
    COOKIE_USER: 'COOKIE_USER',
    REGISTER_TMP_USER: 'REGISTER_TMP_USER'
};

function openWin(uri) {
    location.href = '/wap/' + uri;
}

/**ajax 调用 **/
function ajaxGet(url, success, error) {
    $.ajax({
        "type": "GET",
        "url": Constants.BASE_URL + url,
        success: success,
        error: error
    });
}

function ajaxPost(url, data, success, error) {
    $.ajax({
        "type": "POST",
        "url": Constants.BASE_URL + url,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: success,
        error: error
    });
}

function renderEl(elementId, data) {
    return doT.template(document.getElementById(elementId).text)(data);
}

function checkPhone(phone) {
    var res = !!phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    return res;
}

function lazyLoadImgs() {
    echo.init({
        offset : 100,
        throttle : 250,
        unload : false
    });
}
