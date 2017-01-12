package com.kusion.zhajinhua.application.repos;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.kusion.zhajinhua.application.models.User;

public interface UserRepo extends PagingAndSortingRepository<User, Long> {

}
