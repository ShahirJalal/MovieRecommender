package com.capstone.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "demo_ratings")
@Entity

public class Ratings {
    @Id
    @Column(name = "userid")
    private int userId;

    @Column(name = "movieid")
    private String movieId;

    @Column(name = "rating")
    private String rating;
}