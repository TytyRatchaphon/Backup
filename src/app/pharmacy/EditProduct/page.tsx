"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EditProduct() {
    // State for sidebar visibility
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Toggle sidebar function
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // State for image preview
    const [imagePreview, setImagePreview] = useState(null);
    
    // State for tracking if image was changed
    const [imageChanged, setImageChanged] = useState(false);
    
    // State for form fields - initialize with mock product data for editing
    const [formData, setFormData] = useState({
        productName: "Sample Medicine",
        description: "This is a sample medicine description with details about usage and benefits.",
        category: "Pain Relief",
        price: "299.99",
        stock: 25,
        expiredDate: "2026-12-31",
        fda: "FDA12345TH",
        status: "Available",
        image: null
    });
    
    // State for validation errors
    const [errors, setErrors] = useState({});
    
    // State for form submission
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Get today's date in YYYY-MM-DD format for date input min attribute
    const today = new Date().toISOString().split('T')[0];
    
    // Load product data and image preview when component mounts
    useEffect(() => {
        // This would typically be an API call to fetch product data
        // For now, we'll simulate using the initial state and setting image preview
        
        // Simulate loading an image by setting a placeholder URL
        setImagePreview("/api/placeholder/800/600");
        
        // In a real app, you would fetch product data like this:
        // const fetchProductData = async () => {
        //     try {
        //         const response = await fetch(`/api/products/${productId}`);
        //         const productData = await response.json();
        //         setFormData(productData);
        //         
        //         if (productData.imageUrl) {
        //             setImagePreview(productData.imageUrl);
        //         }
        //     } catch (error) {
        //         console.error("Error fetching product data:", error);
        //     }
        // };
        // 
        // fetchProductData();
    }, []);
    
    // Create function to update form data
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        
        if (name === "stock") {
            // Convert value to number
            const stockValue = parseInt(value);
            
            // If value is NaN or less than 0, set to 0
            if (isNaN(stockValue) || stockValue < 0) {
                if (stockValue < 0) {
                    alert("Stock cannot be less than 0");
                }
                setFormData({ ...formData, [name]: 0 });
            } else {
                setFormData({ ...formData, [name]: stockValue });
            }
        } else if (type === "file") {
            const file = e.target.files[0];
            
            // Check if a file was selected
            if (file) {
                // Check if the file is a JPG or PNG
                const fileType = file.type;
                if (fileType === "image/jpeg" || fileType === "image/png") {
                    setFormData({ ...formData, [name]: file });
                    setImageChanged(true);
                    
                    // Create a URL for the image preview
                    const previewURL = URL.createObjectURL(file);
                    setImagePreview(previewURL);
                    
                    // Clear any previous errors for this field
                    if (errors.image) {
                        const newErrors = {...errors};
                        delete newErrors.image;
                        setErrors(newErrors);
                    }
                } else {
                    // Set an error if the file is not a JPG or PNG
                    alert("Only JPG and PNG images are allowed");
                    setErrors({
                        ...errors,
                        image: "Only JPG and PNG images are allowed"
                    });
                    // Clear the file input
                    e.target.value = "";
                }
            }
        } else if (name === "expiredDate") {
            // Check if the date is before today
            if (value && new Date(value) < new Date(today)) {
                alert("Expiration date cannot be earlier than today");
                setErrors({
                    ...errors,
                    expiredDate: "Expiration date cannot be earlier than today"
                });
            } else {
                // Clear error if date is valid
                if (errors.expiredDate) {
                    const newErrors = {...errors};
                    delete newErrors.expiredDate;
                    setErrors(newErrors);
                }
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    // Clean up the URL object when component unmounts or when image changes
    useEffect(() => {
        return () => {
            if (imagePreview && imageChanged) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview, imageChanged]);
    
    // Update status when stock changes to 0
    useEffect(() => {
        if (formData.stock === 0) {
            setFormData({ ...formData, status: "Unavailable" });
        }
    }, [formData.stock]);
    
    // Function to validate form data
    const validateForm = () => {
        const newErrors = {};
        
        // Check required fields
        if (!formData.productName.trim()) newErrors.productName = "Product Name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.category.trim()) newErrors.category = "Category is required";
        if (!formData.price) newErrors.price = "Price is required";
        if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
        if (!formData.expiredDate) newErrors.expiredDate = "Expiration date is required";
        
        // Check if expiration date is before today
        if (formData.expiredDate && new Date(formData.expiredDate) < new Date(today)) {
            newErrors.expiredDate = "Expiration date cannot be earlier than today";
        }
        
        if (!formData.fda.trim()) newErrors.fda = "FDA number is required";
        
        // For Edit mode, only validate image if a new one was selected
        if (imageChanged && formData.image && !(formData.image.type === "image/jpeg" || formData.image.type === "image/png")) {
            newErrors.image = "Only JPG and PNG images are allowed";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        
        if (validateForm()) {
            // Submit the form data to API or do something else
            alert("Product updated successfully!");
            console.log("Updated product data:", formData);
            
            // In a real app, you'd make an API call to update the product
            // const updateProduct = async () => {
            //     try {
            //         // Create a FormData object for file uploads
            //         const formDataObj = new FormData();
            //         
            //         // Add all form fields to the FormData
            //         Object.keys(formData).forEach(key => {
            //             if (key === 'image' && !imageChanged) {
            //                 // Skip image if not changed
            //                 return;
            //             }
            //             formDataObj.append(key, formData[key]);
            //         });
            //         
            //         // Add a flag indicating whether image was changed
            //         formDataObj.append('imageChanged', imageChanged);
            //         
            //         const response = await fetch(`/api/products/${productId}`, {
            //             method: 'PUT',
            //             body: formDataObj,
            //         });
            //         
            //         if (response.ok) {
            //             alert("Product updated successfully!");
            //         } else {
            //             throw new Error('Failed to update product');
            //         }
            //     } catch (error) {
            //         console.error("Error updating product:", error);
            //         alert("Failed to update product. Please try again.");
            //     }
            // };
            // 
            // updateProduct();
        } else {
            console.log("Form validation failed");
            alert("Please correct the errors in the form before submitting.");
        }
    };
    
    return (
        <div>
            <button 
                onClick={toggleSidebar}
                type="button" 
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside 
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 border border-gray-300`} 
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                    <h1 className="font-semibold text-2xl">GoMed</h1>
                    <ul className="font-medium pt-5">
                        <Link href="/pharmacy/Products">
                            <li>
                                <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                                </div>
                            </li>
                        </Link>
                        <Link href="/pharmacy/Orders">
                            <li>
                                <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-ordered"><path d="M10 12h11"/><path d="M10 18h11"/><path d="M10 6h11"/><path d="M4 10h2"/><path d="M4 6h1v4"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                                </div>
                            </li>
                        </Link>
                        <Link href="/pharmacy/Chats">
                            <li>
                                <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Chats</span>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </aside>

            <div className={`p-4 ${sidebarOpen ? 'sm:ml-64' : 'sm:ml-64'}`}>
                <div className="">
                    <h1 className="font-bold text-4xl text-center mb-6">Edit Product</h1>

                    <div className="w-full h-80 shrink-0 max-w-lg mx-auto border border-gray-300 rounded-md mb-10 flex items-center justify-center bg-gray-50 overflow-hidden">
                        {/* Display the uploaded image preview or a placeholder */}
                        {imagePreview ? (
                            <img 
                                src={imagePreview} 
                                alt="Product preview" 
                                className="max-w-full max-h-full object-contain"
                            />
                        ) : (
                            <div className="text-center p-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                    <circle cx="9" cy="9" r="2" />
                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                </svg>
                                <p className="text-gray-500 font-medium">Product image will appear here</p>
                                <p className="text-gray-400 text-sm mt-1">Upload a JPG or PNG file</p>
                            </div>
                        )}
                    </div>

                    <div className="max-w-4xl px-4 py-6 sm:px-6 lg:px-8 mx-auto">
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-7">
                            <form onSubmit={handleSubmit}>
                                {/* product name */}
                                <div className="mb-6">
                                    <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="productName"
                                        name="productName"
                                        type="text"
                                        value={formData.productName}
                                        onChange={handleInputChange}
                                        required
                                        className={`bg-gray-50 border ${errors.productName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                    />
                                    {errors.productName && (
                                        <p className="mt-1 text-sm text-red-500">{errors.productName}</p>
                                    )}
                                </div>

                                {/* description */}
                                <div className="mb-6">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
                                    ></textarea>
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>

                                {/* category */}
                                <div className="mb-6">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="category"
                                        name="category"
                                        type="text"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className={`bg-gray-50 border ${errors.category ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                    />
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                                    )}
                                </div>

                                {/* price */}
                                <div className="mb-6">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        className={`bg-gray-50 border ${errors.price ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                                    )}
                                </div>

                                {/* stock */}
                                <div className="mb-6">
                                    <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">
                                        Stock <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    {formData.stock === 0 && (
                                        <p className="mt-1 text-sm text-yellow-500">
                                            When Stock is 0, product status will be automatically set to "Unavailable"
                                        </p>
                                    )}
                                </div>

                                {/* Expired date */}
                                <div className="mb-6">
                                    <label htmlFor="expiredDate" className="block mb-2 text-sm font-medium text-gray-900">
                                        Expired date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="expiredDate"
                                        name="expiredDate"
                                        type="date"
                                        value={formData.expiredDate}
                                        onChange={handleInputChange}
                                        min={today}
                                        required
                                        className={`bg-gray-50 border ${errors.expiredDate ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                    />
                                    {errors.expiredDate && (
                                        <p className="mt-1 text-sm text-red-500">{errors.expiredDate}</p>
                                    )}
                                </div>

                                {/* FDA */}
                                <div className="mb-6">
                                    <label htmlFor="fda" className="block mb-2 text-sm font-medium text-gray-900">
                                        FDA <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="fda"
                                        name="fda"
                                        type="text"
                                        value={formData.fda}
                                        onChange={handleInputChange}
                                        required
                                        className={`bg-gray-50 border ${errors.fda ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                    />
                                    {errors.fda && (
                                        <p className="mt-1 text-sm text-red-500">{errors.fda}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="mb-6">
                                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        disabled={formData.stock === 0}
                                        required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Unavailable">Unavailable</option>
                                    </select>
                                    {formData.stock === 0 && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            Status is locked to "Unavailable" because Stock is 0
                                        </p>
                                    )}
                                </div>

                                {/* Upload Image */}
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Product Image
                                    </label>
                                    <p className="mb-2 text-xs text-gray-500">
                                        Only JPG and PNG formats are allowed. Leave empty to keep the current image.
                                    </p>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleInputChange}
                                        accept="image/jpeg, image/png"
                                        className={`block w-full text-sm text-gray-500
                                            file:me-4 file:py-2 file:px-4
                                            file:rounded-lg file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-gray-800 file:text-white
                                            hover:file:bg-gray-900
                                            file:disabled:opacity-50 file:disabled:pointer-events-none
                                            ${errors.image ? 'border border-red-500 rounded-lg' : ''}`}
                                    />
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <Link 
                                        href="/pharmacy/Products"
                                        className="flex-1 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="flex-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Update Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}