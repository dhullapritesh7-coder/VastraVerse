package com.vastraverse.controller

import com.vastraverse.model.Product
import com.vastraverse.service.ProductService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = ["*"])
class ProductController(private val productService: ProductService) {

    @GetMapping
    fun getProducts(
        @RequestParam(required = false) search: String?,
        @RequestParam(required = false, name = "type") genderType: String?,
        @RequestParam(required = false) category: String?,
        @RequestParam(required = false) style: String?,
        @RequestParam(required = false) fabric: String?,
        @RequestParam(required = false, name = "max_price") maxPrice: Double?,
        @RequestParam(required = false) size: String?,
        @RequestParam(required = false, name = "sort_by") sortBy: String?
    ): ResponseEntity<List<Product>> {
        val products = productService.getAllProducts(search, genderType, category, style, fabric, maxPrice, size, sortBy)
        return ResponseEntity.ok(products)
    }

    @GetMapping("/{id}")
    fun getProductById(@PathVariable id: Long): ResponseEntity<Product> {
        val product = productService.getProductById(id)
        return product.map { ResponseEntity.ok(it) }
            .orElseGet { ResponseEntity.status(HttpStatus.NOT_FOUND).build() }
    }

    @PostMapping
    fun createProduct(@RequestBody product: Product): ResponseEntity<Map<String, Any>> {
        val created = productService.createProduct(product)
        return ResponseEntity.status(HttpStatus.CREATED).body(
            mapOf(
                "success" to true,
                "id" to (created.id ?: 0),
                "message" to "Product created successfully"
            )
        )
    }

    @PutMapping("/{id}")
    fun updateProduct(
        @PathVariable id: Long,
        @RequestBody updated: Product
    ): ResponseEntity<Map<String, Any>> {
        val result = productService.updateProduct(id, updated)
        return if (result.isPresent) {
            ResponseEntity.ok(mapOf("success" to true, "message" to "Product updated successfully"))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(mapOf("error" to "Product not found"))
        }
    }

    @DeleteMapping("/{id}")
    fun deleteProduct(@PathVariable id: Long): ResponseEntity<Map<String, Any>> {
        val deleted = productService.deleteProduct(id)
        return if (deleted) {
            ResponseEntity.ok(mapOf("success" to true, "message" to "Product deleted successfully"))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(mapOf("error" to "Product not found"))
        }
    }
}
