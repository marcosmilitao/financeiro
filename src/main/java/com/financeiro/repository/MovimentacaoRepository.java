package com.financeiro.repository;

import com.financeiro.domain.Movimentacao;

import com.financeiro.domain.Saldo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Movimentacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
    List <Movimentacao> findAllBySaldo(Saldo saldo);
}
