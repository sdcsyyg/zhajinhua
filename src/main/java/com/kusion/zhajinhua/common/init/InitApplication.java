package com.kusion.zhajinhua.common.init;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.kusion.zhajinhua.application.models.Config;
import com.kusion.zhajinhua.application.repos.ConfigRepo;
import com.kusion.zhajinhua.common.configs.Constants;
import com.kusion.zhajinhua.common.configs.GlobalConfig;

@Component
public class InitApplication implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    ConfigRepo configJpaRepo;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if(event.getApplicationContext().getParent() == null) {
            Config initalize = configJpaRepo.findBySection(Constants.CONFIG_INITIALIZED);
            if(initalize == null || initalize.getValue() == "TRUE") {
                Config init = new Config();
                init.setSection(Constants.CONFIG_INITIALIZED);
                init.setName("init");
                init.setValue("TRUE");
                init.setNote("系统初始化");

                Config admin = new Config();
                admin.setSection(Constants.CONFIG_ADMIN_AUTH);
                String name = GlobalConfig.getProperty("system.admin.name");
                String password = GlobalConfig.getProperty("system.admin.password");
                String adminNote = GlobalConfig.getProperty("system.admin.note");
                admin.setName(name);
                admin.setValue(password);
                admin.setNote(adminNote);

                Config seoTitle = new Config();
                seoTitle.setSection(Constants.SETTING_KEY_SEO);
                String titleKey = GlobalConfig.getProperty("system.title.key");
                String titleValue = GlobalConfig.getProperty("system.title.value");
                String titleNote = GlobalConfig.getProperty("system.title.note");
                seoTitle.setName(titleKey);
                seoTitle.setValue(titleValue);
                seoTitle.setNote(titleNote);

                Config seoKeywords = new Config();
                seoKeywords.setSection(Constants.SETTING_KEY_SEO);
                String keywordKey = GlobalConfig.getProperty("system.keyword.key");
                String keywordValue = GlobalConfig.getProperty("system.keyword.value");
                String keywordNote = GlobalConfig.getProperty("system.keyword.note");
                seoTitle.setName(keywordKey);
                seoTitle.setValue(keywordValue);
                seoTitle.setNote(keywordNote);

                Config seoDescriptions = new Config();
                seoDescriptions.setSection(Constants.SETTING_KEY_SEO);
                String descriptionKey = GlobalConfig.getProperty("system.description.key");
                String descriptionValue = GlobalConfig.getProperty("system.description.value");
                String descriptionNote = GlobalConfig.getProperty("system.description.note");
                seoTitle.setName(descriptionKey);
                seoTitle.setValue(descriptionValue);
                seoTitle.setNote(descriptionNote);

                configJpaRepo.save(Arrays.asList(init, admin, seoTitle, seoKeywords, seoDescriptions));
            }
        }
    }

}
