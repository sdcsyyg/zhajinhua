package com.kusion.zhajinhua.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kusion.zhajinhua.controllers.forms.LoginForm;

@Controller
@RequestMapping("/account")
public class AccountController extends AccountBaseController {

    protected static final String REDIRECT_TO_HOME = "redirect:/admin/index";
    protected static final String REDIRECT_TO_LOGIN = "redirect:/admin/login";

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        return "/login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Object login(LoginForm loginForm) {
        return ok("登录成功");
    }

    @RequestMapping(value = "/logout")
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return REDIRECT_TO_LOGIN;
    }

}
