package com.vastraverse.repository

import com.vastraverse.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(username: String): Optional<User>
    fun findByUsernameAndPasswordHash(username: String, passwordHash: String): Optional<User>
    fun findFirstByRole(role: String): Optional<User>
    fun existsByUsernameOrEmail(username: String, email: String): Boolean
}
