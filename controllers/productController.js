import {asyncWrapper} from '../middleware/asyncWrapper.js';
import { Product } from '../models/product.js';

const getProductsStatic = asyncWrapper(async(req,res)=>{
    
    // const name = {$regex:/req.query.name/,$options:'i'}
    const products =  await Product.find().select('name price');
    res.send({products, NumItems: products.length});
    
});


const getAllProducts = asyncWrapper(async(req,res, next)=>{
  const {name,featured, company,fields,sort, numricFilter}= req.query;
  const queryObject ={};
  if(name)
        queryObject.name ={$regex:name,$options:'i'}
   if(featured)     
        queryObject.featured =featured
   if(company)
        queryObject.company =company
       
    if(numricFilter){
        const operatorMap =  {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
          };
          const regularExpression = /\b(<|>|>=|=|<|<=)\b/g;
          // find the <, <= ,>, >= , = and replace it by the mongoDB expressions
           // for exampe numricFilter = 'price>= 100, rating<4.5' 
        let afterReplacement = numricFilter.replace(regularExpression, (character)=> `-${operatorMap[character]}-`);
           // it will be afterReplacement = 'price-$gt-100, rating-$lt-4.5',
                   
        // it will be itemsFilters =['price-$gt-100', 'rating-$lt-4.5'];
         const numericFieldsOptions= ['price','rating'];
        // insert only the existing filter into the queryObject
           afterReplacement.split(' ').forEach((item)=>{
                       const [field, operator, value]= item.split('-')
                       if(numericFieldsOptions.includes(field)){
                           queryObject[field] = {[operator]:Number(value)}
                       }else{
                        //    console.log('plz Enter only numeric paramter')
                        next(new Error('plz Enter only numeric paramter'))
                       }
                 })
      
    }
       
        // console.log(queryObject)
    let result =  Product.find(queryObject)
    if(sort){
        //   console.log(sort)
          result  =  result.sort(sort);
    }
    if(fields) {
    //     const specialChractersExpression = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    //   const specialChracter = specialChractersExpression
       let  fieldsAfterPrePorcessing = fields.includes(',') ? fields.split(',').join(' ') : fields;
        // console.log(fieldsAfterPrePorcessing)
        result = result.select(fieldsAfterPrePorcessing);
    }

        // pagenation algorithem
       const page = Number(req.query.page) || 1;
       const itemsPerPage = Number(req.query.limit) || 10;
       const skip = (page - 1)* itemsPerPage;
       
       result =  result.skip(skip).limit(itemsPerPage);

       // products after heavy logic
       const products =  await result;

       res.status(200).send({products, NumItems:products.length});
});




export {getAllProducts, getProductsStatic};