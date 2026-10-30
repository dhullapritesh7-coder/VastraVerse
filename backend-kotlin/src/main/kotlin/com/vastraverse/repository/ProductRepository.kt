package com.vastraverse.repository

import com.vastraverse.model.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository : JpaRepository<Product, Long> {

    @Query("""
        SELECT p FROM Product p WHERE 
        (:search IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')) 
         OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')) 
         OR LOWER(p.fabricType) LIKE LOWER(CONCAT('%', :search, '%')))
        AND (:genderType IS NULL OR LOWER(p.genderType) = LOWER(:genderType) OR LOWER(p.genderType) = 'unisex')
        AND (:category IS NULL OR LOWER(p.category) = LOWER(:category))
        AND (:style IS NULL OR LOWER(p.style) = LOWER(:style))
        AND (:fabric IS NULL OR LOWER(p.fabricType) = LOWER(:fabric))
        AND (:maxPrice IS NULL OR p.price <= :maxPrice)
        AND (:size IS NULL OR p.sizesJson LIKE CONCAT('%"', :size, '"%'))
    """)
    fun filterProducts(
        @Param("search") search: String?,
        @Param("genderType") genderType: String?,
        @Param("category") category: String?,
        @Param("style") style: String?,
        @Param("fabric") fabric: String?,
        @Param("maxPrice") maxPrice: Double?,
        @Param("size") size: String?
    ): List<Product>
}
