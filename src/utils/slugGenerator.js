export function gerarSlug(valor,slugId) {
    
    let quantiaNumeros = 5
    if(!slugId){
    let numerosAleatorios = '';
        for (let i = 0; i < quantiaNumeros; i++) {
      numerosAleatorios += Math.floor(Math.random() * 10);
    }
    slugId = numerosAleatorios
    }
    
  
    return valor
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/([^\w]+|\s+)/g, '-')
      .replace(/(^-+|-+$)/, '')
      + "-" + slugId
  }
  
  
  //                         nome do curso \
  //                                       V
//   let slug = gerarSlug({valor:curso.nome})
//   curso = {...curso,slug}
//   console.log(curso)
//   console.log("curso")
  
//   let novoNome = "Html e Css bla bla bla"
//   let slugId = slug.split("-")
  
//   slugId = slugId[slugId.length-1]
  
//   let novoSlug = gerarSlug({valor:novoNome,slugId:slugId})
//   curso = {nome:novoNome,slug:novoSlug}
//   console.log(curso)
//   console.log("curso novo")

