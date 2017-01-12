package com.kusion.zhajinhua.common.controllers;

import java.util.HashMap;
import java.util.Map;

public class AccessController extends BaseController {

    protected String web(String uri) {
        return "/web" + uri;
    }

    // 一般用于create、update、delete的返回值
    protected final static Object ok(Object message) {
        Map<String, Object> modelMap = new HashMap<String, Object>(2);
        modelMap.put("success", true);
        modelMap.put("msg", message);
        return modelMap;
    }

    protected final static Object ok(String message, Object object) {
        Map<String, Object> modelMap = new HashMap<String, Object>(3);
        modelMap.put("success", true);
        modelMap.put("msg", message);
        modelMap.put("object", object);
        return modelMap;
    }

    // 一般用于create、update、delete的返回值
    protected final static Object notLogin() {
        Map<String, Object> modelMap = new HashMap<String, Object>(2);
        modelMap.put("success", false);
        modelMap.put("logged", false);
        return modelMap;
    }

    protected final static Object redirect(String message, String redirectUrl) {
        Map<String, Object> modelMap = new HashMap<String, Object>(4);
        modelMap.put("success", true);
        modelMap.put("msg", message);
        modelMap.put("redirected", true);
        modelMap.put("redirectUrl", redirectUrl);
        return modelMap;
    }

    // 失败信息的处理
    protected final static Object failure(String message) {
        Map<String, Object> modelMap = new HashMap<String, Object>(2);
        modelMap.put("success", false);
        modelMap.put("msg", message);
        return modelMap;
    }

}
