package com.financeiro.service.impl;

import com.financeiro.domain.Cliente;
import com.financeiro.domain.Movimentacao;
import com.financeiro.domain.enumeration.TipoMovimento;
import com.financeiro.repository.ClienteRepository;
import com.financeiro.repository.MovimentacaoRepository;
import com.financeiro.service.SaldoService;
import com.financeiro.domain.Saldo;
import com.financeiro.repository.SaldoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Saldo}.
 */
@Service
@Transactional
public class SaldoServiceImpl implements SaldoService {

    private final Logger log = LoggerFactory.getLogger(SaldoServiceImpl.class);

    private final SaldoRepository saldoRepository;
    private final MovimentacaoRepository movimentacaoRepository;
    private final ClienteRepository clienteRepository;

    public SaldoServiceImpl(SaldoRepository saldoRepository, ClienteRepository clienteRepository, MovimentacaoRepository movimentacaoRepository, ClienteRepository clienteRepository1) {
        this.saldoRepository = saldoRepository;
        this.movimentacaoRepository = movimentacaoRepository;
        this.clienteRepository = clienteRepository1;
    }

    @Override
    public Saldo save(Saldo saldo) {
        log.debug("Request to save Saldo : {}", saldo);
        return saldoRepository.save(saldo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Saldo> findAll() {
        log.debug("Request to get all Saldos");
        return saldoRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Saldo> findOne(Long id) {
        log.debug("Request to get Saldo : {}", id);
        return saldoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Saldo : {}", id);
        saldoRepository.deleteById(id);
    }

    @Override
    public Saldo atualizaSaldo(Cliente cliente, BigDecimal valor, TipoMovimento tipoMovimento) {

        Movimentacao movimentacao = new Movimentacao();

        BigDecimal saldo;

        saldo = cliente.getSaldo().getValor();

        if(tipoMovimento == TipoMovimento.ENTRADA) {
            cliente.getSaldo().setValor(saldo.add(valor));

            movimentacao.setValor(valor);
            movimentacao.setSaldo(cliente.getSaldo());
            movimentacao.setTipoMovimento(TipoMovimento.ENTRADA);
            movimentacaoRepository.save(movimentacao);
            clienteRepository.save(cliente);
        }else if ( tipoMovimento == TipoMovimento.SAIDA) {
            if (verificaSaldo(valor, saldo)) {
                cliente.getSaldo().setValor(saldo.subtract(valor));

                movimentacao.setValor(valor);
                movimentacao.setSaldo(cliente.getSaldo());
                movimentacao.setTipoMovimento(TipoMovimento.SAIDA);
                movimentacaoRepository.save(movimentacao);
                clienteRepository.save(cliente);
            } else {
                log.debug("Saldo Insuficiente !!!");
            }
        }
        return cliente.getSaldo();
    }

    public boolean verificaSaldo(BigDecimal valor, BigDecimal saldoRevendedor){
        if(valor.compareTo(saldoRevendedor) > 0) {
            log.debug("VALOR MAIOR !!!!!!!");
            return false;
        }else {
            log.debug("VALOR MENOR !!!!!!!");
            return true;
        }
    }
}
