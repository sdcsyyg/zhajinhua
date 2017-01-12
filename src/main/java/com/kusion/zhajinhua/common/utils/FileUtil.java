package com.kusion.zhajinhua.common.utils;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

public class FileUtil {

    public static String RESOURCES_PATH = "resources";
    public static String UPLOAD_PATH = RESOURCES_PATH + "/upload";
    public static String ARCHIVES_PATH = UPLOAD_PATH + "/archives";

    static DateFormat formater = new SimpleDateFormat("yyyyMMddhhmmss");

    public static String getResourcesPath(HttpServletRequest request) {
        String path = request.getSession().getServletContext().getRealPath(File.separator + RESOURCES_PATH);
        return path;
    }

    public static String getUploadPath(HttpServletRequest request) {
        String path = request.getSession().getServletContext().getRealPath(File.separator + UPLOAD_PATH);
        return path;
    }

    public static String getArchivesPath(HttpServletRequest request) {
        String path = request.getSession().getServletContext().getRealPath(File.separator + ARCHIVES_PATH);
        return path;
    }

    /**
     * 获取文件的前缀名
     * @param fileName ie."example.jpg"
     * @return "example"
     */
    public static String getPrefix(String fileName) {
        if(StringUtils.isEmpty(fileName)) {
            return "";
        }
        if( !fileName.contains(".") ) {
            return fileName;
        }
        String name = fileName.substring(0, fileName.lastIndexOf('.'));
        return name;
    }

    /**
     * 获取文件的后缀名
     * @param fileName ie. "example.jpg"
     * @return "jpg"
     */
    public static String getSuffix(String fileName) {
        if(StringUtils.isEmpty(fileName)) {
            return "";
        }
        if( !fileName.contains(".") ) {
            return "";
        }
        String suffix = fileName.substring(fileName.lastIndexOf('.') + 1);
        return suffix;
    }

    /**
     * 生成随机的文件名
     * @param suffix ie. jpg
     * @return 20141124160234xxxxxx.jpg
     */
    public static String generateFileName(String suffix) {
        return formater.format(new Date()) + getRandom() + "." + suffix;
    }

    private static String getRandom() {
        Random random = new Random();
        String result = "";
        for (int i = 0; i < 6; i++) {
            result += random.nextInt(10);
        }
        return result;
    }
}
