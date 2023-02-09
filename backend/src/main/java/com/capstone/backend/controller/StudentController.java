package com.capstone.backend.controller;

import com.capstone.backend.model.Student;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StudentController {

    private List<Student> students = new ArrayList<>();

    @GetMapping("/students")
    public List<Student> students() {

        Student student1 = new Student();
        student1.setId(1);
        student1.setFirstName("Shahir");
        student1.setLastName("Jalal");

        Student student2 = new Student();
        student2.setId(1);
        student2.setFirstName("Azrai");
        student2.setLastName("Shari");

        students.add(student1);
        students.add(student2);

        return students;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/students")
    public Student createStudent(@RequestBody Student student) {
        students.add(student);
        return student;
    }
}
