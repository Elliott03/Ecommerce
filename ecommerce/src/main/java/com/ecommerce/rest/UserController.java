package com.ecommerce.rest;

import com.ecommerce.entity.CompoundEntity;
import com.ecommerce.entity.Content;
import com.ecommerce.entity.User;
import com.ecommerce.service.UserService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.List;
import java.util.TreeMap;


@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }




    @PostMapping("/signup")
    public boolean signup(@RequestBody User theUser) {

        return userService.signup(theUser);
    }

    @PostMapping("/login")
    public User login(@RequestBody User theUser) {
        return userService.login(theUser);
    }

    @GetMapping("/content")
    public List<Content> content() {
        System.out.println(userService.content());;
        return userService.content();
    }

    @PostMapping("/add")
    public TreeMap<Integer, Content> addToCart(@RequestBody CompoundEntity theEntity) {
        return userService.addToCart(theEntity);
    }

    @PostMapping("/delete")
    public TreeMap<Integer, Content> deleteFromCart(@RequestBody CompoundEntity theEntity) {
        return userService.deleteFromCart(theEntity);
    }

    @PostMapping("/search")
    public List<Content> search(@RequestBody String searchText) {
        return userService.search(searchText);
    }
}
