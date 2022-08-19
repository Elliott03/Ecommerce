package com.ecommerce.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.istack.NotNull;
import com.vladmihalcea.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.springframework.security.crypto.bcrypt.BCrypt;

import javax.persistence.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

@Entity
@Table(name="users")
@TypeDef(name = "json", typeClass = JsonType.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(name="id")
    private int id;
    @NotNull
    @Column(name="username")
    private String username;

    @NotNull
    @Column(name="password")
    private String password;


    @NotNull
    @Type(type = "json")
    @Column(name="cart", columnDefinition = "json")
    private TreeMap<Integer, Content> cart = new TreeMap<>();

    public User(String username, String password, TreeMap<Integer, Content> cart) {
        this.username = username;
        this.password = password;
        this.cart = cart;
    }

    public User() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public void addToCart(int index, Content theContent) {
        this.cart.put(index, theContent);
    }
    public void deleteFromCart(int index) {
        this.cart.remove(index);
        System.out.println(this.cart);
    }
    public TreeMap<Integer, Content> getCart() {
        return cart;
    }

    public void setCart(TreeMap<Integer, Content> cart) {
        this.cart = cart;
    }

    public void hash() {
        password = BCrypt.hashpw(password, BCrypt.gensalt());
    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", cart='" + cart + '\'' +
                '}';
    }
}
