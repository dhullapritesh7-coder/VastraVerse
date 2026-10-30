package com.vastraverse.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.vastraverse.model.AnalyticsResponse
import com.vastraverse.model.Order
import com.vastraverse.model.OrderRequest
import com.vastraverse.repository.OrderRepository
import com.vastraverse.repository.ProductRepository
import org.springframework.stereotype.Service

@Service
class OrderService(
    private val orderRepository: OrderRepository,
    private val productRepository: ProductRepository
) {
    private val objectMapper = ObjectMapper()

    fun placeOrder(req: OrderRequest): Order {
        val itemsJsonString = try {
            objectMapper.writeValueAsString(req.items ?: emptyList<Any>())
        } catch (e: Exception) {
            "[]"
        }

        val order = Order(
            userId = req.userId,
            customerName = req.customerName ?: "Valued Customer",
            customerEmail = req.customerEmail ?: "shopper@vastraverse.eco",
            itemsJson = itemsJsonString,
            totalPrice = req.totalPrice,
            carbonSavedTotal = req.carbonSavedTotal,
            waterSavedTotal = req.waterSavedTotal
        )
        return orderRepository.save(order)
    }

    fun getOrders(userId: Long?): List<Order> {
        return if (userId != null) {
            orderRepository.findByUserIdOrderByIdDesc(userId)
        } else {
            orderRepository.findAllByOrderByIdDesc()
        }
    }

    fun getAnalytics(): AnalyticsResponse {
        val totalProducts = productRepository.count()
        val totalOrders = orderRepository.count()
        val totalRevenue = orderRepository.sumTotalPrice()
        val totalWater = orderRepository.sumWaterSavedTotal()
        val totalCarbon = orderRepository.sumCarbonSavedTotal()

        return AnalyticsResponse(
            totalProducts = totalProducts,
            totalOrders = totalOrders,
            totalRevenue = totalRevenue,
            totalWaterSavedLiters = totalWater,
            totalCarbonSavedKg = totalCarbon
        )
    }
}
