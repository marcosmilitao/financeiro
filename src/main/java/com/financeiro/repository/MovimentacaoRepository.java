package com.financeiro.repository;

import com.financeiro.domain.Cliente;
import com.financeiro.domain.Movimentacao;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Movimentacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
    @Query(value = "select * from movimentacao\n" +
        "where saldo_id =:id  " +
        "order by data desc",
        nativeQuery = true)
    List<Movimentacao> findOneBySaldoId(@Param("id") Long id);
}
