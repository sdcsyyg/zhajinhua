package com.kusion.zhajinhua.common.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;

import com.kusion.zhajinhua.common.configs.Constants;
import com.kusion.zhajinhua.common.utils.CodeUtil;

public class RestController extends BaseController {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String appId = request.getHeader("X-APICloud-AppId");
        String appCode = request.getHeader("X-APICloud-AppKey");
        if(StringUtils.isEmpty(appId) || StringUtils.isEmpty(appCode)) {
            return false;
        }
        if(!appId.equals(Constants.APP_ID)) {
            return false;
        }
        int i = appCode.indexOf('.');
        String now = appCode.substring(i + 1);
        String appKey = CodeUtil.sha1(Constants.APP_ID, Constants.APP_KEY, now);
        if(!appCode.equals(appKey)) {
            return false;
        }
        return super.preHandle(request, response, handler);
    }

    protected final static Object ok(Object msg) {
        Map<String, Object> modelMap = new HashMap<String, Object>(2);
        modelMap.put("success", true);
        modelMap.put("msg", msg);
        return modelMap;
    }

    protected final static Object ok(String msg, Object object) {
        Map<String, Object> modelMap = new HashMap<String, Object>(3);
        modelMap.put("success", true);
        modelMap.put("msg", msg);
        modelMap.put("data", object);
        return modelMap;
    }

    // 失败信息的处理
    protected final static Object failure(String msg) {
        Map<String, Object> modelMap = new HashMap<String, Object>(2);
        modelMap.put("success", false);
        modelMap.put("msg", msg);
        return modelMap;
    }
}
