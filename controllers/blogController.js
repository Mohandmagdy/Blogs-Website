const mongoose = require('mongoose');
const Blog = require('../models/blog');

const view_blogs = async (req, res) => {
    const blogs = await Blog.find();
    res.render('list', {blogs});
};

const search = async (req, res) => {
    if(req.body.name){
        const blogs = await Blog.find({name: {$regex: req.body.name, "$options": "i"}});
        res.render('list', {blogs});
    }else{
        const blogs = await Blog.find({category: req.body.category});
        res.render('list', {blogs});
    }
};

const get_details = async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.render('details', {blog});
}

const show_create = (req, res) => {
    res.render('create');
};

const create_blog = (req, res) => {
    Blog.create(req.body)
        .then(result => {
            res.json({});
        }).catch(err => {
            const errors = {description: ''};
            Object.values(err.errors).forEach(property => {
                errors[property.path] = property.message;
            })
            res.json(errors);
        });
};

const get_edit = async (req, res)=> {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.render('edit', {blog});
}

const edit = (req, res) => {
    const id = req.params.id;
    if(req.body.description.length < 50){
        const errors = {description: 'description must be at least 50 characters'};
        res.json(errors);
    }
    else{
        Blog.findByIdAndUpdate(id, { $set: {name: req.body.name, description: req.body.description}})
            .then(result => {
                res.json({});
            }).catch(err => {
                console.log(err);
            });
    }
};

const delete_blog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        })
}

module.exports = {
    view_blogs,
    search,
    get_details,
    show_create,
    create_blog,
    get_edit,
    edit,
    delete_blog
}