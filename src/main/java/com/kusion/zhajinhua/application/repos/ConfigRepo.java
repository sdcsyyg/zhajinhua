package com.kusion.zhajinhua.application.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.kusion.zhajinhua.application.models.Config;

public interface ConfigRepo extends PagingAndSortingRepository<Config, Long> {

    Config findBySection(String section);

    Config findByName(String name);

    Page<Config> findBySection(String settingKeySeo, Pageable pageablea);
}
