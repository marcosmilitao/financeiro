package com.financeiro.web.rest;

import com.financeiro.domain.Cliente;
import com.financeiro.domain.Movimentacao;
import com.financeiro.domain.Saldo;
import com.financeiro.domain.enumeration.TipoMovimento;
import com.financeiro.service.SaldoService;
import com.financeiro.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.financeiro.domain.Saldo}.
 */
@RestController
@RequestMapping("/api")
public class SaldoResource {

    private final Logger log = LoggerFactory.getLogger(SaldoResource.class);

    private static final String ENTITY_NAME = "saldo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SaldoService saldoService;

    public SaldoResource(SaldoService saldoService) {
        this.saldoService = saldoService;
    }

    /**
     * {@code POST  /saldos} : Create a new saldo.
     *
     * @param saldo the saldo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new saldo, or with status {@code 400 (Bad Request)} if the saldo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/saldos")
    public ResponseEntity<Saldo> createSaldo(@Valid @RequestBody Saldo saldo) throws URISyntaxException {
        log.debug("REST request to save Saldo : {}", saldo);
        if (saldo.getId() != null) {
            throw new BadRequestAlertException("A new saldo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Saldo result = saldoService.save(saldo);
        return ResponseEntity.created(new URI("/api/saldos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /saldos} : Updates an existing saldo.
     *
     * @param saldo the saldo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated saldo,
     * or with status {@code 400 (Bad Request)} if the saldo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the saldo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/saldos")
    public ResponseEntity<Saldo> updateSaldo(@Valid @RequestBody Saldo saldo) throws URISyntaxException {
        log.debug("REST request to update Saldo : {}", saldo);
        if (saldo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Saldo result = saldoService.save(saldo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, saldo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /saldos} : get all the saldos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of saldos in body.
     */
    @GetMapping("/saldos")
    public List<Saldo> getAllSaldos() {
        log.debug("REST request to get all Saldos");
        return saldoService.findAll();
    }

    /**
     * {@code GET  /saldos/:id} : get the "id" saldo.
     *
     * @param id the id of the saldo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the saldo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/saldos/{id}")
    public ResponseEntity<Saldo> getSaldo(@PathVariable Long id) {
        log.debug("REST request to get Saldo : {}", id);
        Optional<Saldo> saldo = saldoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(saldo);
    }

    /**
     * {@code DELETE  /saldos/:id} : delete the "id" saldo.
     *
     * @param id the id of the saldo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/saldos/{id}")
    public ResponseEntity<Void> deleteSaldo(@PathVariable Long id) {
        log.debug("REST request to delete Saldo : {}", id);
        saldoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }



    /**
     * {@code POST  /movimentacaos} : Create a new movimentacao.
     *
     * @param movimentacao the movimentacao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimentacao, or with status {@code 400 (Bad Request)} if the movimentacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/atualisaSaldo")
    public ResponseEntity<Saldo> atualisaSaldo(@Valid @RequestBody Movimentacao movimentacao) throws URISyntaxException {

        BigDecimal saldoAnterior = movimentacao.getSaldo().getValor();
        Saldo result = saldoService.atualizaSaldo(movimentacao);

        if(result.getValor() == saldoAnterior){
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "nolimit");

        }else {
            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, movimentacao.getSaldo().getId().toString()))
                .body(result);
        }
    }
}
