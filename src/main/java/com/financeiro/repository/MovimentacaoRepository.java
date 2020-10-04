package com.financeiro.repository;

import com.financeiro.domain.Movimentacao;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Movimentacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
}
