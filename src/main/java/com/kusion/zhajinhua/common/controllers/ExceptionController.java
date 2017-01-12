package com.kusion.zhajinhua.common.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * 全局异常handler，只适用于throws Exception的Controller，unchecked Exception可在web.xml中配置
 * @author Yonggnag Yuan
 */
@EnableWebMvc
@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(Exception.class)
    public String handleException(HttpServletRequest request, Exception e) {
        e.printStackTrace();
        return "error";
    }
}
