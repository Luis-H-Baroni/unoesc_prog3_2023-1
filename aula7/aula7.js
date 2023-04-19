db.curriculos.find({}, { nome: 1 });

db.curriculos.find({ nome: "José Palazzo" }, { artigo: 1 });

db.veiculos.find({ evento: { $exists: true } }, { nome: 1, sigla: 1 });

db.veiculos.find({ sigla: "SBBD", evento: { $exists: true } }, { nome: 1 });

db.curriculos.find(
  { corpo_editorial: { $elemMatch: { data_inicio: { $gt: 2010 } } } },
  { nome: 1 }
);

db.curriculos.find({ "artigo.veiculo": 1 }, { "artigo.$": 1 });
