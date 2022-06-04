const Validator = require('fastest-validator');
const models = require('../models/');

function save(req, res){
    const post = {
        title : req.body.title,
        content : req.body.content,
        imageUrl : req.body.image_url,
        categoryId : req.body.category_id,
        userId : 1
    }

    const schema = {
        title : { type : "string", optional : false, max : 100 },
        content : { type : "string", optional : false, max : 500 },
        categoryId : {type : "number", optional : false}
    };

    const v = new Validator();
    const validationResponse = v.validate(post,schema);
    if(validationResponse !== true){
        return res.status(400).json({
            message : "Validation error",
            error : validationResponse
        });
    }

    models.Post.create(post).then(result => {
        res.status(201).json({
            message : "Post created.",
            post : result
        });
    }).catch(error => {
        res.status(500).json({
            message : "Something want wrong.",
            error : error
        });
    });
}

function show(req, res){
    const id = req.params.id;
    models.Post.findByPk(id).then(result => {
        if(result !== null){
            res.status(200).json(result);
        }else{
            res.status(200).json({
                message : "Not found.",
            });    
        }
    }).catch(error => {
        res.status(500).json({
            message : "Something want wrong.",
            error : error
        });
    })
}

function index(req, res){
    models.Post.findAll({
        order: [
                ['id', 'DESC']
            ]
        }).then(result => {
        res.status(200).json({
            data : result,
            message : "Found"
        });
    }).catch(error => {
        res.status(500).json({
            message : "Something want wrong.",
            error : error
        });
    });
}

function destroy(req, res){
    const id = req.params.id;
    models.Post.destroy({
        where : { id : id}
    }).then(result => {
        res.status(200).json({
            message : "Post deleted successfully."
        });
    }).catch(error => {
        res.status(500).json({
            message : "Something want wrong.",
            error : error
        });
    });
}

function update(req, res){
    const id = req.params.id;
    const updatePost = {
        title : req.body.title,
        content : req.body.content,
        imageUrl : req.body.image_url,
        categoryId : req.body.category_id,
    };

    const schema = {
        title : { type : "string", optional : false, max : 100 },
        content : { type : "string", optional : false, max : 500 },
        categoryId : {type : "number", optional : false}
    };

    const v = new Validator();
    const validationResponse = v.validate(updatePost,schema);
    if(validationResponse !== true){
        return res.status(400).json({
            message : "Validation error",
            error : validationResponse
        });
    }

    models.Post.update(updatePost,{where : { id : id }}).then(result => {
        res.status(201).json({
            message : "Post updated."
        });
    }).catch(error => {
        res.status(500).json({
            message : "Something want wrong.",
            error : error
        });
    })
}

module.exports = {
  index : index,   
  save : save,   
  show : show,   
  destroy : destroy,   
  update : update,   
}