import Product from '../models/product.js';
import fs from 'fs';
import slugify from 'slugify';
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

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
      console.log(req.params.slug);
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
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

export const listProducts = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    console.log("keyword",keyword);
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    console.log("result",results);
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (req, res) => {
  try {
    console.log("girdii");
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (req, res) => {
  try {
    // console.log(req.body);
    const { nonce, cart } = req.body;

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    // console.log("total => ", total);

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // res.send(result);
          // create order
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          // decrement quantity
          decrementQuantity(cart);

          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const decrementQuantity = async (cart) => {
  try {
    // build mongodb query
    const bulkOps = cart.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { quantity: -0, sold: +1 } },
        },
      };
    });

    const updated = await Product.bulkWrite(bulkOps, {});
    console.log("blk updated", updated);
  } catch (err) {
    console.log(err);
  }
};

  