package com.ecommerce.dao;

import com.ecommerce.entity.CompoundEntity;
import com.ecommerce.entity.Content;
import com.ecommerce.entity.User;

import java.util.List;
import java.util.TreeMap;

public interface UserDao {
    boolean signup(User theUser);

    User login(User theUser);

    List<Content> content();

    TreeMap<Integer, Content> addToCart(CompoundEntity theEntity);

    TreeMap<Integer, Content> deleteFromCart(CompoundEntity theEntity);

    List<Content> search(String searchText);
}
