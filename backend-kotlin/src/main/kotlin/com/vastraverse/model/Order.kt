package com.vastraverse.model

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "orders")
data class Order(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @JsonProperty("user_id")
    @Column(name = "user_id")
    var userId: Long? = null,

    @JsonProperty("customer_name")
    @Column(name = "customer_name", nullable = false)
    var customerName: String = "",

    @JsonProperty("customer_email")
    @Column(name = "customer_email", nullable = false)
    var customerEmail: String = "",

    @JsonProperty("items_json")
    @Column(name = "items_json", nullable = false, length = 4000)
    var itemsJson: String = "[]",

    @JsonProperty("total_price")
    @Column(name = "total_price", nullable = false)
    var totalPrice: Double = 0.0,

    @JsonProperty("carbon_saved_total")
    @Column(name = "carbon_saved_total", nullable = false)
    var carbonSavedTotal: Double = 0.0,

    @JsonProperty("water_saved_total")
    @Column(name = "water_saved_total", nullable = false)
    var waterSavedTotal: Double = 0.0,

    @JsonProperty("created_at")
    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now()
) {
    @Transient
    @JsonProperty("items")
    fun getItems(): List<Any> {
        return try {
            ObjectMapper().readValue(itemsJson, object : TypeReference<List<Any>>() {})
        } catch (e: Exception) {
            emptyList()
        }
    }
}
