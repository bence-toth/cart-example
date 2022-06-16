import { useEffect, useState } from "react";

const fakeProducts = [
  {
    id: 1,
    price: 100,
    name: "Product 1",
  },
  {
    id: 2,
    price: 200,
    name: "Product 2",
  },
  {
    id: 3,
    price: 250,
    name: "Product 3",
  },
];

const ProductLine = ({ product, onAdd, onRemove }) => {
  return (
    <>
      <h1>{product.name}</h1>
      <p>Price: {product.price} DKK</p>
      <button onClick={onAdd}>+</button>
      <span>{product.count}</span>
      <button onClick={onRemove}>-</button>
      <p>Line price: {product.price * product.count} DKK</p>
    </>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(
      fakeProducts.map((products) => ({
        ...products,
        count: 0,
      }))
    );
  }, []);

  const addProductToCart = (productId) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            count: product.count + 1,
          };
        } else {
          return product;
        }
      })
    );
  };

  const removeProductFromCart = (productId) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            count: product.count - 1,
          };
        } else {
          return product;
        }
      })
    );
  };

  const calculateTotal = () => {
    return products
      .map((products) => products.price * products.count)
      .reduce((a, b) => a + b, 0);
  };

  return (
    <div className="App">
      {products.map((product) => (
        <div key={product.id}>
          <ProductLine
            product={product}
            onAdd={() => {
              addProductToCart(product.id);
            }}
            onRemove={() => {
              removeProductFromCart(product.id);
            }}
          />
        </div>
      ))}
      <p>Total: {calculateTotal()} DKK</p>
      <p>Total including shipping: {calculateTotal() + 100} DKK</p>
    </div>
  );
};

export default App;
