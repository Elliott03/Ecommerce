package com.ecommerce.entity;

public class CompoundEntity {
    private Content theContent;
    private User theUser;

    public CompoundEntity() {

    }

    public CompoundEntity(Content theContent, User theUser) {
        this.theContent = theContent;
        this.theUser = theUser;
    }

    public Content getTheContent() {
        return theContent;
    }

    public void setTheContent(Content theContent) {
        this.theContent = theContent;
    }

    public User getTheUser() {
        return theUser;
    }

    public void setTheUser(User theUser) {
        this.theUser = theUser;
    }

    @Override
    public String toString() {
        return "CompoundEntity{" +
                "theContent=" + theContent.toString() +
                ", theUser=" + theUser.toString() +
                '}';
    }
}
