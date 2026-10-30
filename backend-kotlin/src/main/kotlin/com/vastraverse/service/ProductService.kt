package com.vastraverse.service

import com.vastraverse.model.Product
import com.vastraverse.repository.ProductRepository
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class ProductService(private val productRepository: ProductRepository) {

    fun getAllProducts(
        search: String?,
        genderType: String?,
        category: String?,
        style: String?,
        fabric: String?,
        maxPrice: Double?,
        size: String?,
        sortBy: String?
    ): List<Product> {
        val s = if (search.isNullOrBlank()) null else search.trim()
        val g = if (genderType.isNullOrBlank() || genderType.equals("all", ignoreCase = true)) null else genderType.trim()
        val c = if (category.isNullOrBlank() || category.equals("all", ignoreCase = true)) null else category.trim()
        val st = if (style.isNullOrBlank() || style.equals("all", ignoreCase = true)) null else style.trim()
        val f = if (fabric.isNullOrBlank() || fabric.equals("all", ignoreCase = true)) null else fabric.trim()
        val sz = if (size.isNullOrBlank() || size.equals("all", ignoreCase = true)) null else size.trim()

        val list = productRepository.filterProducts(s, g, c, st, f, maxPrice, sz)

        return when (sortBy) {
            "price_asc" -> list.sortedBy { it.price }
            "price_desc" -> list.sortedByDescending { it.price }
            "eco_score" -> list.sortedByDescending { it.ecoScore }
            "rating" -> list.sortedByDescending { it.rating }
            else -> list.sortedBy { it.id }
        }
    }

    fun getProductById(id: Long): Optional<Product> = productRepository.findById(id)

    fun createProduct(product: Product): Product {
        product.id = null
        return productRepository.save(product)
    }

    fun updateProduct(id: Long, updated: Product): Optional<Product> {
        return productRepository.findById(id).map { existing ->
            existing.title = updated.title
            existing.category = updated.category
            existing.genderType = updated.genderType
            existing.sizesJson = updated.sizesJson
            existing.color = updated.color
            existing.style = updated.style
            existing.price = updated.price
            existing.fabricType = updated.fabricType
            existing.ecoMaterialInfo = updated.ecoMaterialInfo
            existing.carbonSavedKg = updated.carbonSavedKg
            existing.waterSavedLiters = updated.waterSavedLiters
            existing.ecoScore = updated.ecoScore
            existing.stock = updated.stock
            existing.imageUrl = updated.imageUrl
            existing.description = updated.description
            productRepository.save(existing)
        }
    }

    fun deleteProduct(id: Long): Boolean {
        return if (productRepository.existsById(id)) {
            productRepository.deleteById(id)
            true
        } else {
            false
        }
    }

    fun countProducts(): Long = productRepository.count()
}
