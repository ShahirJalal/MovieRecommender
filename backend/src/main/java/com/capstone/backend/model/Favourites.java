package com.capstone.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="demo_favourites")
@Entity
public class Favourites {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment column
    @Column(name = "favouriteid")
    private int favouriteId;
    @Column(name = "movieid")
    private int movieId;
    @Column(name = "title")
    private String title;
    @Column(name = "genres")
    private String genres;
    @Column(name = "userid")
    private int userId;
}