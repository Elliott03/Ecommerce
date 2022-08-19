package com.ecommerce.dao;

import com.ecommerce.entity.CompoundEntity;
import com.ecommerce.entity.Content;
import com.ecommerce.entity.User;
import org.hibernate.Session;
import org.hibernate.annotations.Type;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Repository
public class UserDaoImpl implements UserDao {

    private EntityManager entityManager;

    @Autowired
    public UserDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public boolean signup(User theUser) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query theQuery = currentSession.createQuery("from User where username=:username", User.class);
        theQuery.setParameter("username", theUser.getUsername());

        try {
            // Check if the username already exists
            theQuery.getSingleResult();
        } catch (Exception e) {
            // If the username does not exist
            theUser.hash();
            currentSession.saveOrUpdate(theUser);
            return true;
        }
        // If the username exists already
        return false;
    }

    @Override
    public User login(User theUser) {
        Session currentSession = entityManager.unwrap(Session.class);

        Query theQuery = currentSession.createQuery("from User where username=:username", User.class);
        theQuery.setParameter("username", theUser.getUsername());

        User tempUser = (User) theQuery.getSingleResult();

        if ((tempUser != null) && (BCrypt.checkpw(theUser.getPassword(), tempUser.getPassword()))) {
            return tempUser;

        } else {
            return null;
        }
    }

    @Override
    public List<Content> content() {
        Session currentSession = entityManager.unwrap(Session.class);
        List<Content> listContent;

        CriteriaBuilder builder = currentSession.getCriteriaBuilder();
        CriteriaQuery<Content> criteria = builder.createQuery(Content.class);
        criteria.from(Content.class);

        listContent = currentSession.createQuery(criteria).getResultList();
        return listContent;
    }

    public TreeMap<Integer, Content> addToCart(CompoundEntity theEntity) {
        TreeMap<Integer, Content> tempMap = new TreeMap<>();
        Session currentSession = entityManager.unwrap(Session.class);

        Query theQuery = currentSession.createQuery("From User where username=:username", User.class);
        theQuery.setParameter("username", theEntity.getTheUser().getUsername());
        User tempUser = (User) theQuery.getSingleResult();
        List<Content> tempList = new ArrayList<>(tempUser.getCart().values());

        tempList.add(theEntity.getTheContent());


        for (int i = 0; i < tempList.size(); i++) {
            tempMap.put(i, tempList.get(i));
        }

        tempUser.setCart(tempMap);
        return tempUser.getCart();
    }

    @Override
    public TreeMap<Integer, Content> deleteFromCart(CompoundEntity theEntity) {
        TreeMap<Integer, Content> tempMap = new TreeMap<>();
        Session currentSession = entityManager.unwrap(Session.class);

        Query theQuery = currentSession.createQuery("From User where username=:username", User.class);
        theQuery.setParameter("username", theEntity.getTheUser().getUsername());
        User tempUser = (User) theQuery.getSingleResult();
        List<Content> tempList = new ArrayList<>(tempUser.getCart().values());
        System.out.println("Before Remove: " + tempList);
        System.out.println("The Content: " + theEntity.getTheContent());
        tempList.remove(theEntity.getTheContent().getId());
        System.out.println("After Remove: " + tempList);

        for (int i = 0; i < tempList.size(); i++) {
            tempMap.put(i, tempList.get(i));
        }
        tempUser.setCart(tempMap);

        return tempUser.getCart();

    }

    @Override
    public List<Content> search(String searchText) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query theQuery = currentSession.createQuery("From Content where mainText like :searchText", Content.class);
        theQuery.setParameter("searchText", "%" + searchText + "%");
        List<Content> theList = theQuery.getResultList();
        System.out.println("List: " + theList);
        return theList;
    }
}
