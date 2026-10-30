package com.vastraverse.repository

import com.vastraverse.model.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

/**
 * Experiment 7: Database Integration with JPA/Hibernate
 * Provides persistent storage and optimized filtering queries
 */
@Repository
interface ProductRepository : JpaRepository<Product, Long> {

    @Query("""
        SELECT p FROM Product p 
        WHERE (:category IS NULL OR LOWER(p.category) = LOWER(:category))
          AND (:style IS NULL OR LOWER(p.style) = LOWER(:style))
          AND (:maxPrice IS NULL OR p.price <= :maxPrice)
        ORDER BY p.id ASC
    """)
    fun findByFilters(
        @Param("category") category: String?,
        @Param("style") style: String?,
        @Param("maxPrice") maxPrice: Double?
    ): List<Product>

    fun findByFabricTypeIgnoreCase(fabricType: String): List<Product>
}
