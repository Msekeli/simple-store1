export default function ProductCard({ product, onAdd }) {
    return (
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
  
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
  
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-blue-600 text-lg">R {product.price}</span>
  
          <button
            onClick={() => onAdd(product.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    );
  }
  