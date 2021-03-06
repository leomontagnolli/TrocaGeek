package com.generation.trocageek.repository;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.generation.trocageek.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
	
	public Page<Produto> findByativoTrue(Pageable paginacao);
	
	public Page<Produto> findBynomeContainingIgnoreCaseAndAtivoTrue(String nome, Pageable paginacao);
	
	public Page<Produto> findByidCategoria_nomeCategoriaContainingIgnoreCaseAndAtivoTrue(String nome, Pageable paginacao);
	
	public List<Produto> findByidUsuario_id(Long id);
	
	public void deleteAllByidUsuario_id(Long id);
	

}
