import { useState, useEffect } from "react";
export default function FetchDemoComponent() {
    const [catagories, setCatagory] = useState([])
    const [products, setProducts] = useState([])
    

    const LoadCategories = () => {
        fetch("https://fakestoreapi.com/products/categories")
            .then(response => response.json())
            .then(data => {
                data.unshift("All");
                setCatagory(data);
            })
    }
    const LoadProducts = () => {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                console.log(data)
            })
    }

    useEffect(() => {
        LoadCategories();
        LoadProducts();
       
    }, [])

   const HandleChangeCategory = (e)=>{
    if(e.target.value==='All'){
        LoadProducts();
    }else{
        fetch(`https://fakestoreapi.com/products/category/${e.target.value}`)
    .then(response => response.json())
    .then(data => {
        setProducts(data);
        
    })
    }
   }

    return (
        <>
            <div className="container-fluid">
                <h2 className="bg-danger text-white text-center p-2">
                    <span className="bi bi-cart4"></span> Shopping
                </h2>
                <div className="row">
                    <div className="col-3">
                        <label>Select a Category</label>
                        <div>
                            <select onChange={HandleChangeCategory} className="form-select">
                                {
                                    catagories.map(category =>
                                        <option value={category} key={category}>{category.toUpperCase()}</option>
                                    )

                                }
                            </select>
                        </div>

                    </div>
                    <div className="col-9" style={{overflow:'auto',height:'500px'}}>
                        <div className="d-flex flex-wrap">
                            {
                                products.map(product =>
                                    <div className="card m-2 w-25">
                                        <img alt="Preview" src={product.image} className="card-img-top" style={{ height: '150px' }} />
                                    <div className="card-header" style={{height:'120px'}}>
                                    {product.title}
                                    </div>
                                    <div className="card-body">
                                    {product.price}
                                    </div>
                                    <div className="card-footer">
                                    <button className="btn btn-danger w-100"><span className="bi bi-cart4"></span> Add to cart</button>

                                    </div>
                                    </div>
                                )
                            }

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}