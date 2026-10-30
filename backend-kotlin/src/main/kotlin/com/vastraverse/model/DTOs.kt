package com.vastraverse.model

import com.fasterxml.jackson.annotation.JsonProperty

data class LoginRequest(
    val username: String? = null,
    val password: String? = null,
    @JsonProperty("role_override")
    val roleOverride: String? = null
)

data class RegisterRequest(
    val username: String,
    val email: String,
    val password: String,
    val role: String? = "customer"
)

data class UserDTO(
    val id: Long,
    val username: String,
    val email: String,
    val role: String,
    val token: String
)

data class AuthResponse(
    val success: Boolean,
    val message: String? = null,
    val user: UserDTO? = null
)

data class OrderRequest(
    @JsonProperty("user_id")
    val userId: Long? = 2,
    @JsonProperty("customer_name")
    val customerName: String? = "Valued Customer",
    @JsonProperty("customer_email")
    val customerEmail: String? = "shopper@vastraverse.eco",
    val items: List<Any>? = emptyList(),
    @JsonProperty("total_price")
    val totalPrice: Double = 0.0,
    @JsonProperty("carbon_saved_total")
    val carbonSavedTotal: Double = 0.0,
    @JsonProperty("water_saved_total")
    val waterSavedTotal: Double = 0.0
)

data class AnalyticsResponse(
    @JsonProperty("total_products")
    val totalProducts: Long,
    @JsonProperty("total_orders")
    val totalOrders: Long,
    @JsonProperty("total_revenue")
    val totalRevenue: Double,
    @JsonProperty("total_water_saved_liters")
    val totalWaterSavedLiters: Double,
    @JsonProperty("total_carbon_saved_kg")
    val totalCarbonSavedKg: Double
)
