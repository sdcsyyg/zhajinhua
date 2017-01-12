package com.kusion.zhajinhua.common.configs;


public class Constants {

    ///////////////////////
    // 系统初始化常量配置
    ///////////////////////
    public static final String CONFIG_INITIALIZED = "CONFIG_INITIALIZED";
    public static final String COOKIE_KEY_REMEMBER_ME = "_REMEMBER";

    public static final String APP_ID = GlobalConfig.getProperty("appId");
    public static final String APP_KEY = GlobalConfig.getProperty("appKey");

    public static final String CONFIG_POINT_MUV = "CONFIG_POINT_MUV";// 最小可用值
    public static final String CONFIG_POINT_RATE = "CONFIG_POINT_RATE";// 兑换率（兑换单位：元）
    public static final String CONFIG_COURSE_MINHOUR = "CONFIG_COURSE_MINHOUR";// 最小报名课时

    ///////////////////////
    // session常量配置
    ///////////////////////
    public static final String SESSION_CURRENT_USER_KEY = "user";
    public static final String SESSION_WX_REDIRECT_URL = "wx_redirect_url";

    public static final String SESSION_CITY_KEY = "city";
    public static final String DEFAULT_CITY_CODE = "guyuanshi";
    public static final String DEFAULT_CITY_NAME = "固原市";

    ///////////////////////
    // 文件上传配置
    ///////////////////////
    public static final String RESOURCES_UPLOAD_DIR = GlobalConfig.getProperty("upload.dir");

    ///////////////////////
    // 管理员信息配置
    ///////////////////////
    public static final String CONFIG_ADMIN_AUTH = "CONFIG_ADMIN_AUTH";
    public static final String SESSION_CURRENT_ADMIN_KEY = "admin";
    public static final String SESSION_CURRENT_ADMIN_ID = "admin_id";

    ///////////////////////
    // 系统常量配置
    ///////////////////////
    public static final String BREAK_URL = "<URL>";
    public static final String BREAK_AREA = "<AREA>";
    public static final String BREAK_TAG = "<TAG>";

    ///////////////////////
    // 设置选项
    ///////////////////////
    public static final String SETTING_KEY_SEO = "_SETTINGS_SEO";

    public static final String IMAGE_DEFAULT = "http://123.57.86.101/assets/images/default.png";

    public static final String VALIDATE_PATTERN_PHONE = "^1\\d{10}$";
    public static final long DEFAULT_EXP_TIME = 20L;
    public static final int REMEMBER_ME_DAYS = 30;

    public static final String VOTE_TYPE_CHECK = "CHECK";
    public static final String VOTE_TYPE_VOTE = "VOTE";
    public static final String VOTE_TYPE_SCORE = "SCORE";

    public static final String DECIMAL_FORMAT = "######0.00";

}
