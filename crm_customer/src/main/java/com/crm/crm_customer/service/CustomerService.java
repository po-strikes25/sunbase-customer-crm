package com.crm.crm_customer.service;

import com.crm.crm_customer.entity.Customer;
import com.crm.crm_customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Customer saveOrUpdate(Customer customer){
        return customerRepository.save(customer);
    }

    public Customer putCustomer(Customer customer){
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public void deleteCustomer(Long customerID) {
        customerRepository.deleteById(customerID);
    }

    public Customer getCustomerByID(Long customerID) {
        return customerRepository.findById(customerID).get();
    }
}
