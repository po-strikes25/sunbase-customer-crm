package com.crm.crm_customer.controller;

import com.crm.crm_customer.entity.Customer;
import com.crm.crm_customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crm-api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

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

    @GetMapping("/get-all-customers")
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }

    @DeleteMapping("/delete-customer/{id}")
    public String deleteCustomer(@PathVariable("id") Long customerID){
        customerService.deleteCustomer(customerID);
        return "Customer deleted successfully";
    }

    @GetMapping("/get-customer/{id}")
    public Customer getCustomerByID(@PathVariable("id") Long customerID){
        return customerService.getCustomerByID(customerID);
    }
}
