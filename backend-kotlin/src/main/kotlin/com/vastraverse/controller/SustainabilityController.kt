package com.vastraverse.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/sustainability")
@CrossOrigin(origins = ["*"])
class SustainabilityController {

    @GetMapping("/fabrics")
    fun getFabricGuide(): ResponseEntity<List<Map<String, Any>>> {
        val fabrics = listOf(
            mapOf(
                "fabric_name" to "Organic Khadi Cotton",
                "water_saved_percent" to 85,
                "co2_reduction_percent" to 95,
                "energy_source" to "Human-powered Amber Charkha & Handlooms (Zero electricity)",
                "biodegradability" to "100% Biodegradable in under 5 months",
                "certifications" to listOf("Khadi & Village Industries (KVIC)", "GOTS"),
                "description" to "Woven entirely by hand using indigenous organic cotton varieties. Promotes fair living wages for rural artisan collectives."
            ),
            mapOf(
                "fabric_name" to "Industrial Hemp Fiber",
                "water_saved_percent" to 75,
                "co2_reduction_percent" to 80,
                "energy_source" to "Carbon-negative agricultural cultivation",
                "biodegradability" to "100% Compostable",
                "certifications" to listOf("OEKO-TEX Standard 100", "USDA BioPreferred"),
                "description" to "Hemp absorbs more carbon dioxide per hectare than forest canopy. It breathes naturally, resists bacterial growth, and softens with wear."
            ),
            mapOf(
                "fabric_name" to "Closed-Loop Bamboo Linen",
                "water_saved_percent" to 70,
                "co2_reduction_percent" to 65,
                "energy_source" to "99.5% Recovered non-toxic solvent spinning loop",
                "biodegradability" to "Naturally biodegradable",
                "certifications" to listOf("FSC Certified Bamboo", "Ecolabel EU"),
                "description" to "Mechanically retted bamboo linen harvested from sustainably managed forests without clearing virgin biodiversity."
            ),
            mapOf(
                "fabric_name" to "Ahimsa (Peace) Wild Silk",
                "water_saved_percent" to 60,
                "co2_reduction_percent" to 70,
                "energy_source" to "Low-heat sun drying and community spinning",
                "biodegradability" to "100% Organic Protein Fiber",
                "certifications" to listOf("Non-Violent Silk Certified", "Fair Trade"),
                "description" to "Cruelty-free silk cultivation where Eri moths naturally emerge from cocoons unharmed before the fiber is spun."
            )
        )
        return ResponseEntity.ok(fabrics)
    }
}
