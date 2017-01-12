package com.kusion.zhajinhua.common.controllers;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.HandlerMapping;

import com.kusion.zhajinhua.common.configs.Constants;

//@Controller
//@RequestMapping("/images")
public class ImageController extends AccessController {

    public static final String REGEX_SIZE = "[1-9][\\d]{0,3}[xX][1-9][\\d]{0,3}";
    public static final String REGEX_SPLIT = "x|X";
    public static final String RESOURCES_UPLOAD_DIR = Constants.RESOURCES_UPLOAD_DIR;

    /**
     * http://domain/images/preview/x.png/i
     */
    @RequestMapping(value = "/preview/**/i", method = RequestMethod.GET)
    public ResponseEntity<byte[]> preview(HttpServletResponse response) throws IOException {
        String uri = (String)request().getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
        String imageUri = null;
        try {
            imageUri = uri.substring(16, uri.lastIndexOf("/i"));
        } catch (Exception e) {
            return null;
        }

        File file = new File(RESOURCES_UPLOAD_DIR + File.separator + imageUri);
        if(!file.exists() || !file.canRead()) {
            return null;
        }
        HttpHeaders headers = new HttpHeaders();  
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file), headers, HttpStatus.OK);
    }

}
