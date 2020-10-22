'user strict';

const repository = require('../repositories/user-repository');
const validation = require('../bin/helpers/validation.js');
const ctrlBase = require('../bin/base/controller-base.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jvariables = require('../bin/configuration/variables.js');
const _repo = new repository();

function userController(){}

userController.prototype.post = async (req,res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, "Informe seu nome: ");
    _validationContract.isRequired(req.body.email, "Informe seu email: ");
    _validationContract.isRequired(req.body.senha, "Informe sua senha: ");
    _validationContract.isRequired(req.body.senhaConfirmacao, "Confirme sua senha: ");
    _validationContract.isTrue(req.body.senhaConfirmacao !== req.body.senha, "As senhas não são iguais. ");
    _validationContract.isEmail(req.body.email, "Email inválido. ");
    
    try {
        let usuarioEmailExiste = await_repo.isEmailExste(req.body.email);
        if (usuarioEmailExiste){
            _validationContract.isTrue(usuarioEmailExiste.nome != undefined, `Já existe o email ${req.body.email} cadastrado no banco de dados.`);
        }
        var salt = await bcrypt.genSaltSync(10);
        req.body.senha = await bcrypt.hashSync(req.body.senha, salt);
        ctrlBase.post(_repo,_validationContract,req,res);
    } catch (e) {
        res.status(500).send({message: "Internal server error - usercontroller post", error: e});
    }
};

userController.prototype.put = async (req,res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, "Informe seu nome: ");
    _validationContract.isRequired(req.params.id, "Informe seu id: ");
    _validationContract.isRequired(req.body.email, "Informe seu email: ");
    _validationContract.isRequired(req.body.senha, "Informe sua senha: ");
    _validationContract.isRequired(req.body.senhaConfirmacao, "Confirme sua senha: ");
    _validationContract.isTrue(req.body.senhaConfirmacao !== req.body.senha, "As senhas não são iguais. ");
    _validationContract.isEmail(req.body.email, "Email inválido. ");
    
    try {
        let usuarioEmailExiste = await_repo.isEmailExste(req.body.email);
        if (usuarioEmailExiste){
            _validationContract.isTrue(usuarioEmailExiste.nome != undefined && usuarioEmailExiste._id != req.params.id, `Já existe o email ${req.body.email} cadastrado no banco de dados.`);
        }
        ctrlBase.put(_repo,_validationContract,req,res);
    } catch (e) {
        res.status(500).send({message: "Internal server error - usercontroller post", error: e});
    }
};

userController.prototype.get = async(req,ses) =>{
    ctrlBase.get(_repo,req,res);
};

userController.prototype.delete = async(req,ses) =>{
    _validationContract.isRequired(req.params.id, "Informe seu id: ");
    ctrlBase.delete(_repo,req,res);
};

userController.prototype.authenticate = async (req,res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, "Informe seu email: ");
    _validationContract.isRequired(req.body.senha, "Informe sua senha: ");
    _validationContract.isRequired(req.body.senhaConfirmacao, "Confirme sua senha: ");
    _validationContract.isTrue(req.body.senhaConfirmacao !== req.body.senha, "As senhas não são iguais. ");
    _validationContract.isEmail(req.body.email, "Email inválido. ");
    if (!_validationContract.isValid()){
        res.status(400).send({message:"Não foi possível efetuar o login",validation: _validationContract.errors()
    })
    return
    }
    let usuarioEncontrado = await _repo.authenticate(req.body.email, req.body.senha, false);
    if (usuarioEncontrado == null){
        res.status(404).send({message:"Usuário ou senha inválidos"});
    }
    if(usuarioEncontrado){
        res.status(200).senha({usuario:usuarioEncontrado, token:jwt.sign({user:usuarioEncontrado},variables.Security.secretKey)});
    } else {
        res.status(404).send({message:"Usuário ou senha inválidos"});

    }
}

module.exports = userController;