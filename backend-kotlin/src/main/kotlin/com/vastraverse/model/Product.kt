package com.vastraverse.model

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "products")
data class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(nullable = false)
    var title: String = "",

    @Column(nullable = false)
    var category: String = "",

    @JsonProperty("gender_type")
    @Column(name = "gender_type", nullable = false)
    var genderType: String = "Unisex",

    @JsonProperty("sizes_json")
    @Column(name = "sizes_json", nullable = false, length = 1000)
    var sizesJson: String = "[\"S\", \"M\", \"L\", \"XL\"]",

    @Column(nullable = false)
    var color: String = "Natural",

    @Column(nullable = false)
    var style: String = "Casual",

    @Column(nullable = false)
    var price: Double = 0.0,

    @JsonProperty("fabric_type")
    @Column(name = "fabric_type", nullable = false)
    var fabricType: String = "",

    @JsonProperty("eco_material_info")
    @Column(name = "eco_material_info", nullable = false, length = 1000)
    var ecoMaterialInfo: String = "100% sustainable materials",

    @JsonProperty("carbon_saved_kg")
    @Column(name = "carbon_saved_kg", nullable = false)
    var carbonSavedKg: Double = 5.0,

    @JsonProperty("water_saved_liters")
    @Column(name = "water_saved_liters", nullable = false)
    var waterSavedLiters: Double = 2000.0,

    @JsonProperty("eco_score")
    @Column(name = "eco_score", nullable = false)
    var ecoScore: Int = 95,

    var rating: Double = 4.8,

    @JsonProperty("reviews_count")
    @Column(name = "reviews_count")
    var reviewsCount: Int = 10,

    var stock: Int = 20,

    @JsonProperty("image_url")
    @Column(name = "image_url", nullable = false, length = 1000)
    var imageUrl: String = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700",

    @Column(nullable = false, length = 2000)
    var description: String = "",

    @JsonProperty("created_at")
    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now()
) {
    @Transient
    @JsonProperty("sizes")
    fun getSizes(): List<String> {
        return try {
            ObjectMapper().readValue(sizesJson, object : TypeReference<List<String>>() {})
        } catch (e: Exception) {
            listOf("S", "M", "L", "XL")
        }
    }
}
