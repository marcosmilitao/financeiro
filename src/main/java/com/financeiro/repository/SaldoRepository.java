package com.financeiro.repository;

import com.financeiro.domain.Saldo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Saldo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SaldoRepository extends JpaRepository<Saldo, Long> {
}
