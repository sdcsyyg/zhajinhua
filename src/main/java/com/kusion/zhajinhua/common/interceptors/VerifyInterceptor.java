package com.kusion.zhajinhua.common.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.kusion.zhajinhua.common.configs.Constants;
import com.kusion.zhajinhua.common.utils.CodeUtil;

public class VerifyInterceptor extends HandlerInterceptorAdapter {

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

}
