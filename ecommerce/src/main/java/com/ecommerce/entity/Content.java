package com.ecommerce.entity;

import javax.persistence.*;

@Entity
@Table(name="content")
public class Content {

    public Content() {

    }

    public Content(String mainText, String price) {
        this.mainText = mainText;
        this.price = price;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="main_text")
    private String mainText;

    @Column(name="price")
    private String price;

    @Column(name="type")
    private String type;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMainText() {
        return mainText;
    }

    public void setMainText(String mainText) {
        this.mainText = mainText;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Content{" +
                "id=" + id +
                ", mainText='" + mainText + '\'' +
                ", price='" + price + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
