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
        TipoMovimento t;
        Movimentacao m = new Movimentacao();
        Saldo s = movimentacao.getSaldo();
        Cliente c = clienteRepository.findOneBySaldoId(movimentacao.getSaldo().getId());

        if(movimentacao.getValor().compareTo(BigDecimal.ZERO) < 0 && movimentacao.getTipoMovimento() == TipoMovimento.ENTRADA)  {
            t = TipoMovimento.SAIDA;
        } else{
            t = movimentacao.getTipoMovimento();
        }
        if(TipoMovimento.ENTRADA == t) {

                s.setValor(s.getValor().add(movimentacao.getValor()));

                m.setValor(movimentacao.getValor());
                m.setSaldo(movimentacao.getSaldo());
                m.setTipoMovimento(TipoMovimento.ENTRADA);
                m.descricao(movimentacao.getDescricao());
                movimentacaoRepository.save(m);
                saldoRepository.save(s);

                 log.debug("SALDO ATUALIZADO !!!");

        }else if (TipoMovimento.SAIDA == t) {
            BigDecimal valor;
            if(movimentacao.getValor().compareTo(BigDecimal.ZERO) < 0){
                valor = movimentacao.getValor().negate();
            }else{
                valor = movimentacao.getValor();
            }
            if (verificaSaldo(movimentacao.getValor(), valor,c.getLimite())) {

                s.setValor(s.getValor().subtract(valor));

                m.setValor(valor);
                m.setSaldo(movimentacao.getSaldo());
                m.setTipoMovimento(TipoMovimento.SAIDA);
                m.descricao(movimentacao.getDescricao());
                movimentacaoRepository.save(m);
                saldoRepository.save(s);
            } else {
                log.debug("Saldo Insuficiente !!!");
            }
        }
        return s;
    }

    public boolean verificaSaldo(BigDecimal valor, BigDecimal saldo, BigDecimal limite){

        if(limite == null){
            limite = BigDecimal.ZERO;
        }
        BigDecimal saldoTotal = saldo.add(limite);

        if(valor.compareTo(saldoTotal) > 0) {
            log.debug("VALOR MAIOR !!!!!!!");
            return false;
        }else {
            log.debug("VALOR MENOR !!!!!!!");
            return true;
        }
    }
}
