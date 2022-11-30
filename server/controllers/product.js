import Product from '../models/product.js';
import fs from 'fs';
import slugify from 'slugify';

export const create = async (req,res)=>{
    try{
      console.log("girdiiii");
        console.log(req.fields);
        const {name,description,price,category,quantity,shipping} = req.fields;
        console.log("geldiii");
        console.log(req.files);
        const {photo} = req.files;


        //validation
        switch(true){
            case !name.trim():
                res.json({error:"Name is required"});
            case !description.trim():
                res.json({error:"Description is required"});
            case !price.trim():
                res.json({error:"Price is required"});
            case !category.trim():
                res.json({error:"Category is required"});
            case !quantity.trim():
                res.json({error:"Quantity is required"});
            case !shipping.trim():
                res.json({error:"Shipping is required"});
            case photo && photo.size > 1000000:
                res.json({error:"Image size must be less than 1mb in size"});
        }
        //create product
        const product = new Product({...req.fields,slug:slugify(name)});

        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);
    }catch(err){
        res.status(400).json(err);
    }
};

export const list = async (req,res) => {
    try{
        const products = await Product.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});
        res.json(products);
    }catch(err){
        res.status(400).json(err);
    }
};

export const read = async (req,res)=>{
    try{
        const product = await Product.find({slug:req.params.slug}).select('-photo').populate('category');
        res.json(product);
    }catch(err){
        res.status(400).json(err);
    }
};

export const photo = async (req,res)=>{
    try{
        const product = await Product.findById(req.params.productId).select("photo")
        if(product.photo.data){
            res.set("Content-Type",product.photo.contentType);
            return res.send(product.photo.data);
        }
    }catch(err){
        res.status(400).json(err);
    }
}

export const remove = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(
        req.params.productId
      ).select("-photo");
      res.json(product);
    } catch (err) {
      console.log(err);
    }
  };

export const update = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
  
      // validation
      switch (true) {
        case !name.trim():
          res.json({ error: "Name is required" });
        case !description.trim():
          res.json({ error: "Description is required" });
        case !price.trim():
          res.json({ error: "Price is required" });
        case !category.trim():
          res.json({ error: "Category is required" });
        case !quantity.trim():
          res.json({ error: "Quantity is required" });
        case !shipping.trim():
          res.json({ error: "Shipping is required" });
        case photo && photo.size > 1000000:
          res.json({ error: "Image should be less than 1mb in size" });
      }
  
      // update product
      const product = await Product.findByIdAndUpdate(
        req.params.productId,
        {
          ...req.fields,
          slug: slugify(name),
        },
        { new: true }
      );
  
      if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }
  
      await product.save();
      res.json(product);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);
    }
  };

export const filteredProducts = async (req,res)=>{
  try{
    const { checked, radio } = req.body;

    console.log(radio[0]);

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  }catch(err){
    console.log(err);
  }
}
  