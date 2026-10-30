package com.vastraverse.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.SecurityFilterChain

/**
 * Experiment 8: Role-Based Authentication & Authorization (Admin vs Customer)
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfig {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/recommend/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/sustainability/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/orders/**").hasAnyRole("CUSTOMER", "ADMIN")
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST, "/api/products/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
            }
            .httpBasic { }

        return http.build()
    }

    @Bean
    fun userDetailsService(): UserDetailsService {
        val admin = User.withDefaultPasswordEncoder()
            .username("admin")
            .password("admin123")
            .roles("ADMIN")
            .build()

        val customer = User.withDefaultPasswordEncoder()
            .username("aarav_sharma")
            .password("customer123")
            .roles("CUSTOMER")
            .build()

        return InMemoryUserDetailsManager(admin, customer)
    }
}
