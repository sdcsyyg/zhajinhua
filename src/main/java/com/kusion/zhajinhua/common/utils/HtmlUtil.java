package com.kusion.zhajinhua.common.utils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.util.HtmlUtils;

public class HtmlUtil {

    public static String escape(String content) {
        if(StringUtils.isEmpty(content)) {
            return content;
        }
        return HtmlUtils.htmlEscape(content);
    }
}
