import React, { useState, useEffect } from 'react';
import './Product2.css';
import image from '../../Assets/fprod2.JPG';

const Product2 = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Initialize quantity state to 1
    const [quantity, setQuantity] = useState(1);

    const [selectedSize, setSelectedSize] = useState('');

    const [warningMessage, setWarningMessage] = useState('');

    const [showWarning, setShowWarning] = useState(false);
  
    // Update state when input changes
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    // Function to update the selected size
    const handleSizeSelection = (size) => {
        setSelectedSize(currentSize => currentSize === size ? '' : size);
        setShowWarning(false);
    };

    // Function that displays an error message if the user hasn't selected a size
    const handleAddToCart = () => {
        if (!selectedSize) {
          setWarningMessage('Please select a size');
          setShowWarning(true);
        } else {
          // Proceed with add to cart functionality
          setShowWarning(false);
          console.log("Product added to cart:", { selectedSize, quantity });
          // Add to cart logic here
        }
    };

    // Example review data
    const [reviews] = useState([
        { id: 1, user: 'John Doe', rating: 5, comment: 'Great product, highly recommend!' },
        { id: 2, user: 'Jane Smith', rating: 4, comment: 'Really good, but the size was slightly off.' },
        // Add more reviews as needed
    ]);
  
    return (
        <div className="product2-container">
            <div className="p2-details-container">
                <div className="p2-image-gallery">
                    <img src={image} alt="Trial Pack All 3 Flavors" />
                    {/* Add additional thumbnails or a carousel as needed */}
                </div>
                <div className="product2-details">
                    <h1>Trial Pack All 3 Flavors</h1>
                    <p className="p2-price">P625</p>
                    <p className="product2-description">
                        Dive into a celestial feast with our Beef Tapa Flakes, crafted from clouds where
                        flavor reigns supreme. Delicately harvested and expertly seasoned, each bite
                        offers a glimpse into the divine, leaving taste buds enchanted and cravings
                        satisfied.
                    </p>
                    <div className="p2-quantity-selector">
                        <label htmlFor="quantity">Quantity:</label>
                        <input 
                        type="number" 
                        id="quantity" 
                        name="quantity" 
                        min="1" 
                        value={quantity} // Set value to quantity state
                        onChange={handleQuantityChange} // Update state on change
                        />
                    </div>
                    <button
                        className="p2-add-to-cart"
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </button>
                    {showWarning && (
                        <div className="p2-error-bubble">
                            {warningMessage}
                        </div>
                    )}
                    <div className="p2-size-selector">
                        {['330 Grams'].map((size) => (
                            <button
                                key={size}
                                onClick={() => handleSizeSelection(size)}
                                className={selectedSize === size ? 'p2-size-button selected' : 'p2-size-button'}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <ul>
                        <li>Ingredients: Beef, Salt, Pepper, Soy Sauce, Vinegar, Mixed Spices,
                            and Vegetable Oil.</li>
                        <li>Nutritional Info: Placeholder</li>
                    </ul>
                </div>
            </div>
            {/* Dynamic customer reviews section */}
            <div className="p2-reviews-section">
                <h2>Customer Reviews</h2>
                {reviews.map((review) => (
                <div key={review.id} className="p2-review">
                    <h3>{review.user}</h3>
                    <p>Rating: {review.rating}</p>
                    <p>{review.comment}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Product2;
