package com.example.ourstoretn.controllers;

import com.example.ourstoretn.models.CustomUserDetails;
import com.example.ourstoretn.models.User;
import com.example.ourstoretn.models.UserResponse;
import com.example.ourstoretn.security.JwtUtil;
import com.example.ourstoretn.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("user")
@AllArgsConstructor
public class userController {
    @Autowired
    UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public User signUp(@RequestBody User u)
    {
        return userService.signUp(u);

    }
    @GetMapping("/getUsers")
    public List<User> getUsers()
    {
        return userService.getUsers();

    }

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Map<String, String> loginData) throws Exception {

        String username = loginData.get("username");
        String password = loginData.get("password");

        authenticate(username, password);

        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        final String token = jwtUtil.generateToken(username);
        boolean a= jwtUtil.isTokenExpired(token);
        System.out.println(token);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        if (a) {        response.put("azeazeaze","a");
        }


        return ResponseEntity.ok(response);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
    @GetMapping("/current")
    public String getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getPrincipal());
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            return userDetails.getName() + userDetails.getSurname();
        } else {
            return "not found";
        }
    }
}
