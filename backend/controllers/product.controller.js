import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error on fetching product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createProducts = async (req, res) => {
    const product = req.body;//user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ sucess:false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Creating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProducts = async (req, res) => {
    const { id } = req.params;
    
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid product Id"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product,{new:true});
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProducts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid product Id"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.error("Error in deleting product:", error.message);
         res.status(500).json({ success: false, message: "Server error" });
    }
};

