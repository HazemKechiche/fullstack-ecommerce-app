package com.example.ourstoretn.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@ToString
@Getter
@Setter
public  class UserResponse {
    private String name;
    private String surname;

    public UserResponse(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

}