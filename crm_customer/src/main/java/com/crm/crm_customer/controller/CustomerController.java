package com.crm.crm_customer.controller;

import com.crm.crm_customer.entity.Customer;
import com.crm.crm_customer.jwt.AuthTokenFilter;
import com.crm.crm_customer.jwt.JwtUtils;
import com.crm.crm_customer.dto.LoginRequest;
import com.crm.crm_customer.dto.LoginResponse;
import com.crm.crm_customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/crm-api")
@CrossOrigin(origins = "http://localhost:9200")
@RequiredArgsConstructor
public class CustomerController {
    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    private final CustomerService customerService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    public String greetings(){
        return "Hello";
    }

    @PostMapping("/post-customer")
    public Customer postCustomer(@RequestBody Customer customer){
        return customerService.saveOrUpdate(customer);
    }

    @PutMapping("/put-customer/{id}")
    public Customer putCustomer(@RequestBody Customer customer, @PathVariable(name="id")Long customerID){
        customer.setCustomer_id(customerID);
        customerService.saveOrUpdate(customer);
        return customer;
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get-all-customers")
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete-customer/{id}")
    public String deleteCustomer(@PathVariable("id") Long customerID){
        customerService.deleteCustomer(customerID);
        return "Customer deleted successfully";
    }

    @GetMapping("/get-customer/{id}")
    public Customer getCustomerByID(@PathVariable("id") Long customerID){
        return customerService.getCustomerByID(customerID);
    }

    @RequestMapping(value="/login", method = RequestMethod.POST)    // changed from @PostMapping
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;
        try {
            logger.debug("Trying username: {} ", loginRequest.getUsername());
            logger.debug("Trying password: {} ", loginRequest.getPassword());
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch(AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", "false");
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                                        .map((item) -> item.getAuthority())
                                        .collect(Collectors.toList());

        LoginResponse response = new LoginResponse(jwtToken, userDetails.getUsername(), roles);

        return ResponseEntity.ok(response);
    }
}
