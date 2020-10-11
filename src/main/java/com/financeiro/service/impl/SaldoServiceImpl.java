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
    public Saldo atualizaSaldo(Movimentacao movimentacao) {

        Movimentacao m = new Movimentacao();
        Saldo s = movimentacao.getSaldo();

        if(movimentacao.getTipoMovimento() == TipoMovimento.ENTRADA) {
            s.setValor(s.getValor().add(movimentacao.getValor()));

            m.setValor(movimentacao.getValor());
            m.setSaldo(movimentacao.getSaldo());
            m.setTipoMovimento(TipoMovimento.ENTRADA);
            m.descricao(movimentacao.getDescricao());
            movimentacaoRepository.save(m);
            saldoRepository.save(s);
            log.debug("SALDO ATUALIZADO !!!");

        }else if ( movimentacao.getTipoMovimento() == TipoMovimento.SAIDA) {
            if (verificaSaldo(movimentacao.getValor(), movimentacao.getSaldo().getValor())) {

                s.setValor(s.getValor().subtract(movimentacao.getValor()));

                m.setValor(movimentacao.getValor());
                m.setSaldo(movimentacao.getSaldo());
                m.setTipoMovimento(TipoMovimento.ENTRADA);
                m.descricao(movimentacao.getDescricao());
                movimentacaoRepository.save(m);
                saldoRepository.save(s);
            } else {
                log.debug("Saldo Insuficiente !!!");
            }
        }
        return s;
    }

    public boolean verificaSaldo(BigDecimal valor, BigDecimal saldo){
        if(valor.compareTo(saldo) > 0) {
            log.debug("VALOR MAIOR !!!!!!!");
            return false;
        }else {
            log.debug("VALOR MENOR !!!!!!!");
            return true;
        }
    }
}
