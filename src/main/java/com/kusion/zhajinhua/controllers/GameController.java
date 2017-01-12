package com.kusion.zhajinhua.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.kusion.zhajinhua.common.controllers.AccessController;

@Controller
@RequestMapping("/game")
public class GameController extends AccessController {

    @RequestMapping(value={"","/","/index"}, method=RequestMethod.GET)
    public String index() {
        return "index";
    }

}
