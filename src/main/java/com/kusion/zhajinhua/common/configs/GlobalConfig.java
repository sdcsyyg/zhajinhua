package com.kusion.zhajinhua.common.configs;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 配置参数工具
 */
public class GlobalConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalConfig.class);

    static String DELIM_START = "${";
    static char DELIM_STOP = '}';
    static int DELIM_START_LEN = 2;
    static int DELIM_STOP_LEN = 1;

    static {
        try {
            InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream("global.properties");
            System.getProperties().load(is);
        } catch (IOException e) {
            LOGGER.error("加载配置文件global.properties失败。", e);
        }
    }

    /**
     * @param val The string on which variable substitution is performed.
     * @throws IllegalArgumentException if <code>val</code> is malformed.
     */
    public static String substVars(String val, Properties props) throws IllegalArgumentException {
        StringBuilder sbuf = new StringBuilder();
        int i = 0;
        int j, k;

        while (true) {
            j = val.indexOf(DELIM_START, i);
            if (j == -1) {
                if (i == 0) {
                    return val;
                } else {
                    sbuf.append(val.substring(i, val.length()));
                    return sbuf.toString();
                }
            } else {
                sbuf.append(val.substring(i, j));
                k = val.indexOf(DELIM_STOP, j);
                if (k == -1) {
                    throw new IllegalArgumentException("[" + val + "] has no closing brace. Opening brace at position " + j);
                } else {
                    j += DELIM_START_LEN;
                    String key = val.substring(j, k);
                    String replacement = System.getProperty(key, null);
                    if (replacement == null && props != null)
                        replacement = props.getProperty(key);
                    if (replacement != null) {
                        String recursiveReplacement = substVars(replacement, props);
                        sbuf.append(recursiveReplacement);
                    }
                    i = k + DELIM_STOP_LEN;
                }
            }
        }
    }

    public static String getProperty(String key, String def) {
        String value = System.getProperty(key, def);
        if (value == null) {
            return null;
        }
        return substVars(value, System.getProperties());
    }

    public static String getProperty(String key) {
        return getProperty(key, null);
    }

    public static void main(String[] args) {
        String fir = GlobalConfig.getProperty("upload.dir");
        File file = new File(fir);
        System.err.println(file.exists());
        System.out.println(file.isDirectory());
    }
}