package com.kusion.zhajinhua.controllers;

import com.kusion.zhajinhua.application.models.Config;
import com.kusion.zhajinhua.common.configs.Constants;
import com.kusion.zhajinhua.common.controllers.AccessController;

public class AccountBaseController extends AccessController {

    protected Config getAdmin() {
        return (Config) session().getAttribute(Constants.SESSION_CURRENT_ADMIN_KEY);
    }

}
