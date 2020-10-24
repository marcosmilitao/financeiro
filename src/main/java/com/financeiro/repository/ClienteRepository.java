package com.financeiro.repository;

import com.financeiro.domain.Cliente;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    @Query(value = "select * from Cliente\n" +
        "where saldo_id =:id",
        nativeQuery = true)
    Cliente findOneBySaldoId(@Param("id") Long id);

    @Query(value = "select * from Cliente order by Nome asc", nativeQuery = true)
    List<Cliente> findAllOrderByNome();

    @Query(value = "select * from Cliente order by Telefone asc", nativeQuery = true)
    List<Cliente> findAllOrderByTelefone();

    @Query(value = "select * from cliente cli\n" +
        "inner join Saldo sa\n" +
        "on sa.id = cli.saldo_id\n" +
        "ORDER BY sa.valor desc", nativeQuery = true)
    List<Cliente> findAllOrderByMaiorSaldo();

    @Query(value = "select * from cliente cli\n" +
        "inner join Saldo sa\n" +
        "on sa.id = cli.saldo_id\n" +
        "ORDER BY sa.valor asc", nativeQuery = true)
    List<Cliente> findAllOrderByMenorSaldo();


}
