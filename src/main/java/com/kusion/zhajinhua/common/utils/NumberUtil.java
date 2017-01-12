package com.kusion.zhajinhua.common.utils;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Random;

public class NumberUtil {

    public static final String SCALE_2 = "0.00";

    /**
     * 获取num位的随机数字
     * 
     * @param num 随机数位数
     * @return
     */
    public static String getRandcode(int num) {
        Random random = new Random();
        StringBuffer result = new StringBuffer();
        for (int i = 0; i < num; i++) {
            result.append(random.nextInt(10));
        }
        return result.toString();
    }

    public static String getScale2(BigDecimal sum) {
        DecimalFormat df = new DecimalFormat(SCALE_2); 
        return df.format(sum); 
    }
}
