exports.post = async (repository,validationContract,req,res)=>{
    try {
        let data = req.body;

        if(!validationContract.isValid()){
            res.status(400).send({message:'Existem dados inválidos em sua requisição - post', validation:validationContract.errors()}).end();
            return;
        }
        let resultado = await repository.create(data,req);
        res.status(201).send(resultado);
    } catch (e) {
        console.log(e);
        res.status(500).send({message:"Internal server error - post", error: e});
    }
};

exports.put = async (repository,validationContract,req,res)=>{
    try {
        let data = req.body;

        if(!validationContract.isValid()){
            res.status(400).send({message:'Existem dados inválidos em sua requisição - put', validation:validationContract.errors()}).end();
            return;
        }
        let resultado = await repository.update(req.params.id,data,req.usuarioLogado.user);
        res.status(202).send(resultado);
    } catch (e) {
        console.log(e);
        res.status(500).send({message:"Internal server error - put", error: e});
    }
};

exports.get = async (repository,validationContract,req,res)=>{
    try {
       
        let resultado = await repository.getAll();
        res.status(200).send(resultado);
    } catch (e) {
        console.log(e);
        res.status(500).send({message:"Internal server error - get", error: e});
    }
};

exports.delete = async (repository,validationContract,req,res)=>{
    try {
       const id = req.params.id;
       if(id){
           let resultado = await repository.delete(id,req.usuarioLogado);
           if(resultado !== "Operação inválida - delete"){
                res.status(200).send({message:"Registro excluído com sucesso"});
           } else {
                res.status(401).send({message:"Operação inválida -- delete"});
           }
       } else {
           res.status(500).send({message:"O parâmetro ID precisa ser informado - delete"});
       }
    } catch (e) {
        console.log(e);
        res.status(500).send({message:"Internal server error - delete", error: e});
    }
}