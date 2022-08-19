package com.ecommerce.service;

import com.ecommerce.dao.UserDao;
import com.ecommerce.entity.CompoundEntity;
import com.ecommerce.entity.Content;
import com.ecommerce.entity.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.TreeMap;

@Service
public class UserServiceImpl implements UserService {

    private UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional
    public boolean signup(User theUser) {

        return userDao.signup(theUser);
    }

    @Transactional
    public User login(User theUser) {
        return userDao.login(theUser);
    }

    @Transactional
    public List<Content> content() {
        return userDao.content();
    }
    @Transactional
    public TreeMap<Integer, Content> addToCart(CompoundEntity theEntity) {
        return userDao.addToCart(theEntity);
    }

    @Transactional
    public TreeMap<Integer, Content> deleteFromCart(CompoundEntity theEntity) {
        return userDao.deleteFromCart(theEntity);
    }

    @Transactional
    public List<Content> search(String searchText) {
        return userDao.search(searchText);
    }
}
