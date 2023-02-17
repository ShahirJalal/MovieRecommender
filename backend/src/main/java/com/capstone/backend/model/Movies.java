package com.capstone.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "demo_movies")
@Entity

public class Movies {
    @Id
    @Column(name = "movieid")
    private int movieId;

    @Column(name = "genres")
    private String genres;

    @Column(name = "title")
    private String title;
}