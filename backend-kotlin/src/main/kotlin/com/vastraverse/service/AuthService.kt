package com.vastraverse.service

import com.vastraverse.model.*
import com.vastraverse.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class AuthService(private val userRepository: UserRepository) {

    fun login(request: LoginRequest): AuthResponse {
        val user = if (!request.roleOverride.isNullOrBlank()) {
            userRepository.findFirstByRole(request.roleOverride).orElse(null)
        } else if (!request.username.isNullOrBlank() && !request.password.isNullOrBlank()) {
            userRepository.findByUsernameAndPasswordHash(request.username, request.password).orElse(null)
        } else {
            null
        }

        return if (user != null) {
            AuthResponse(
                success = true,
                message = "Login successful",
                user = UserDTO(
                    id = user.id ?: 0,
                    username = user.username,
                    email = user.email,
                    role = user.role,
                    token = "token-${user.role}-${user.id}"
                )
            )
        } else {
            AuthResponse(
                success = false,
                message = "Invalid username or password"
            )
        }
    }

    fun register(request: RegisterRequest): AuthResponse {
        if (userRepository.existsByUsernameOrEmail(request.username, request.email)) {
            return AuthResponse(
                success = false,
                message = "Username or email already exists"
            )
        }

        val newUser = User(
            username = request.username,
            email = request.email,
            passwordHash = request.password,
            role = request.role ?: "customer"
        )
        val saved = userRepository.save(newUser)

        return AuthResponse(
            success = true,
            message = "User registered successfully",
            user = UserDTO(
                id = saved.id ?: 0,
                username = saved.username,
                email = saved.email,
                role = saved.role,
                token = "token-${saved.role}-${saved.id}"
            )
        )
    }
}
