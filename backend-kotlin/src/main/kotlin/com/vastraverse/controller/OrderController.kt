package com.vastraverse.controller

import com.vastraverse.model.AnalyticsResponse
import com.vastraverse.model.Order
import com.vastraverse.model.OrderRequest
import com.vastraverse.service.OrderService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["*"])
class OrderController(private val orderService: OrderService) {

    @GetMapping("/api/orders")
    fun getOrders(@RequestParam(required = false, name = "user_id") userId: Long?): ResponseEntity<List<Order>> {
        val orders = orderService.getOrders(userId)
        return ResponseEntity.ok(orders)
    }

    @PostMapping("/api/orders")
    fun placeOrder(@RequestBody request: OrderRequest): ResponseEntity<Map<String, Any>> {
        val order = orderService.placeOrder(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(
            mapOf(
                "success" to true,
                "order_id" to (order.id ?: 0),
                "message" to "Order #${order.id} placed successfully!",
                "environmental_impact" to mapOf(
                    "carbon_saved_kg" to order.carbonSavedTotal,
                    "water_saved_liters" to order.waterSavedTotal
                )
            )
        )
    }

    @GetMapping("/api/admin/analytics")
    fun getAnalytics(): ResponseEntity<AnalyticsResponse> {
        val analytics = orderService.getAnalytics()
        return ResponseEntity.ok(analytics)
    }
}
