export const FormCadastro = () => {
  return (
    <form onSubmit={handleSaveCurso}>
      <input
        type="text"
        placeholder="Nome do Curso"
        name="nome"
        onChange={handleChange}
        value={cursodata.nome}
      />
      <textarea
        placeholder="Descrição"
        name="descricao"
        value={cursodata.descricao}
        onChange={handleChange}
      ></textarea>

      <div className="trilha">
        <p>Trilha</p>
        <div className="radio">
          <label htmlFor="prof">
            <input
              id="prof"
              className="trilha-check"
              type="radio"
              name="trilha"
              value="Profissional"
              checked={cursodata.trilha === "Profissional"}
              onChange={handleChange}
            />
            <span>Profissional</span>
          </label>
        </div>
        <div className="radio">
          <label htmlFor="estrategia">
            <input
              id="estrategia"
              className="trilha-check"
              type="radio"
              name="trilha"
              value="Estratégica"
              checked={cursodata.trilha === "Estratégica"}
              onChange={handleChange}
            />
            <span>Estratégica</span>
          </label>
        </div>
      </div>

      <label htmlFor="access">Acesso ao Curso</label>
      <input
        id="access"
        type="text"
        placeholder="Acesso ao curso"
        name="acessoCurso"
        value={cursodata.acessoCurso}
        onChange={handleChange}
      />

      <div className="block">Módulos (Salve para liberar essa opção)</div>

      <button type="submit" className="confirm-btn">
        Salvar Curso
      </button>
    </form>
  );
};
