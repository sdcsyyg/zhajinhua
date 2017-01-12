package com.kusion.zhajinhua.common.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.kusion.zhajinhua.application.models.Config;
import com.kusion.zhajinhua.application.repos.ConfigRepo;
import com.kusion.zhajinhua.common.configs.Constants;

public class BaseController extends HandlerInterceptorAdapter {

    private static final ThreadLocal<HttpServletRequest> REQUEST = new ThreadLocal<HttpServletRequest>();

    private static final ThreadLocal<HttpServletResponse> RESPONSE = new ThreadLocal<HttpServletResponse>();

    protected Logger log = null;

    @Autowired
    ConfigRepo cfg; 

    public BaseController() {
        this.log = LoggerFactory.getLogger(getClass());
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        REQUEST.set(request);
        RESPONSE.set(response);
        // TODO 应该被缓存到redis
        Sort sort = new Sort(new org.springframework.data.domain.Sort.Order(Sort.Direction.ASC, "id"));
        Pageable pageablea = new PageRequest(1, 10, sort);
        Page<Config> cfgs = cfg.findBySection(Constants.SETTING_KEY_SEO, pageablea);
        for(Config fg : cfgs ) {
            request().setAttribute("seo-" + fg.getName(), fg.getValue());
        }
        return super.preHandle(request, response, handler);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        REQUEST.remove();
        RESPONSE.remove();
        if (ex != null) {
            response.sendError(500);
        }
        super.afterCompletion(request, response, handler, ex);
    }

    public String getBasePath() {
        String basePath;
        HttpServletRequest request = request();
        if(request().getServerPort() == 80) {
            basePath = request.getScheme() + "://" + request.getServerName() + request.getContextPath() + "/";
        } else{
            basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/";
        }
        return basePath;
    }

    public HttpServletRequest request() {
        return REQUEST.get();
    }

    public HttpServletResponse response() {
        return RESPONSE.get();
    }

    public HttpSession session() {
        return request().getSession();
    }

}
