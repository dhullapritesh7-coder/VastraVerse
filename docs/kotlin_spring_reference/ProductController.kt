package com.vastraverse.controller

import com.vastraverse.model.Product
import com.vastraverse.repository.ProductRepository
import com.vastraverse.service.RecommendationService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

/**
 * VastraVerse Backend API Controller (Kotlin + Spring Boot)
 * Implements CRUD APIs matching Experiments 6-9 & Role-Based Security
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = ["*"])
class ProductController(
    private val productRepository: ProductRepository,
    private val recommendationService: RecommendationService
) {

    // Expt 6: Retrieve all clothing products with optional category/style filters
    @GetMapping
    fun getAllProducts(
        @RequestParam(required = false) category: String?,
        @RequestParam(required = false) style: String?,
        @RequestParam(required = false) maxPrice: Double?
    ): List<Product> {
        return productRepository.findByFilters(category, style, maxPrice)
    }

    // Expt 6: Retrieve single product by ID
    @GetMapping("/{id}")
    fun getProductById(@PathVariable id: Long): ResponseEntity<Product> {
        val product = productRepository.findById(id)
        return if (product.isPresent) {
            ResponseEntity.ok(product.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    // Expt 8 & 9: Create new product - Restricted to ADMIN role
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    fun createProduct(@RequestBody product: Product): ResponseEntity<Product> {
        val saved = productRepository.save(product)
        return ResponseEntity.ok(saved)
    }

    // Expt 8 & 9: Update product - Restricted to ADMIN role
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    fun updateProduct(
        @PathVariable id: Long,
        @RequestBody updatedProduct: Product
    ): ResponseEntity<Product> {
        return productRepository.findById(id).map { existing ->
            val toSave = existing.copy(
                title = updatedProduct.title,
                price = updatedProduct.price,
                stock = updatedProduct.stock,
                fabricType = updatedProduct.fabricType,
                ecoScore = updatedProduct.ecoScore
            )
            ResponseEntity.ok(productRepository.save(toSave))
        }.orElse(ResponseEntity.notFound().build())
    }

    // Expt 8 & 9: Delete product - Restricted to ADMIN role
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    fun deleteProduct(@PathVariable id: Long): ResponseEntity<Void> {
        return if (productRepository.existsById(id)) {
            productRepository.deleteById(id)
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
