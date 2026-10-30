package com.vastraverse.repository

import com.vastraverse.model.Order
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface OrderRepository : JpaRepository<Order, Long> {
    fun findByUserIdOrderByIdDesc(userId: Long): List<Order>
    fun findAllByOrderByIdDesc(): List<Order>

    @Query("SELECT COALESCE(SUM(o.totalPrice), 0.0) FROM Order o")
    fun sumTotalPrice(): Double

    @Query("SELECT COALESCE(SUM(o.waterSavedTotal), 0.0) FROM Order o")
    fun sumWaterSavedTotal(): Double

    @Query("SELECT COALESCE(SUM(o.carbonSavedTotal), 0.0) FROM Order o")
    fun sumCarbonSavedTotal(): Double
}
