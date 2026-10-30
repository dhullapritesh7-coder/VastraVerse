package com.vastraverse.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.io.File

@Configuration
class CorsConfig : WebMvcConfigurer {

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
    }

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        val frontendDir = File("../frontend").absoluteFile
        registry.addResourceHandler("/**")
            .addResourceLocations("file:${frontendDir.path}/", "classpath:/static/")
    }

    override fun addViewControllers(registry: ViewControllerRegistry) {
        // Forward root URL to index.html
        registry.addViewController("/").setViewName("forward:/index.html")
    }
}
