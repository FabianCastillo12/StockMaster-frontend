import { useState } from 'react';

const usePublishProduct = () => {
  const [publishingStates, setPublishingStates] = useState({});
  const [error, setError] = useState(null);

  const publishProduct = async (product) => {
    setPublishingStates(prev => ({
      ...prev,
      [product.id]: { isPublishing: true, isPublished: false }
    }));
    setError(null);

    try {
      const productData = {
        id: product.id.toString(),
        nombre: product.nombre,
        precio: parseFloat(product.precio),
        cantidadStock: product.cantidadStock || 0,
        categoria: {
          id: product.categoria.id.toString(),
          nombre: product.categoria.nombre
        },
        estado: product.estado
      };

      const response = await fetch('https://hook.us2.make.com/5lyes0uuo15bu6qlp71jxmb2xgy8dcq2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error('Error al publicar el producto');
      }

      // Clonar la respuesta para poder leerla múltiples veces
      const clonedResponse = response.clone();
      
      // Intentar parsear como JSON, si falla devolver texto plano
      try {
        const result = await response.json();
        setPublishingStates(prev => ({
          ...prev,
          [product.id]: { isPublishing: false, isPublished: true }
        }));
        return result;
      } catch (error) {
        const result = await clonedResponse.text();
        setPublishingStates(prev => ({
          ...prev,
          [product.id]: { isPublishing: false, isPublished: true }
        }));
        return result;
      }
    } catch (err) {
      setError(err.message);
      setPublishingStates(prev => ({
        ...prev,
        [product.id]: { isPublishing: false, isPublished: false }
      }));
      throw err;
    }
  };

  const getPublishingState = (productId) => {
    return publishingStates[productId] || { isPublishing: false, isPublished: false };
  };

  return { publishProduct, getPublishingState, error };
};

export default usePublishProduct;
