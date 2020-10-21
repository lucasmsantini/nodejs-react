exports.post = async (repository,validationContract,req,res)=>{
    try {
        let data = req.body;

        if(!validationContract.isValid()){
            res.status(400).send({message:'Existem dados inválidos em sua requisição', validation:validationContract.errors()}).end();
            return;
        }
        let resultado = await repository.create(data,req);
        res.status(201).send(resultado);
        
    } catch (e) {
        console.log(e);
        res.status(500).send({message:"Internal server error", error: e});
    }
}
