package com.vastraverse.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod

/**
 * Experiment 8: Role-Based Authentication Configuration
 * Provides security configuration and role separation (Admin vs Customer)
 */
@Configuration
class SecurityConfig {

    // Helper method to verify role permissions
    fun hasAdminAccess(role: String?): Boolean {
        return "admin".equals(role, ignoreCase = true)
    }

    fun hasCustomerAccess(role: String?): Boolean {
        return "customer".equals(role, ignoreCase = true) || "admin".equals(role, ignoreCase = true)
    }
}
