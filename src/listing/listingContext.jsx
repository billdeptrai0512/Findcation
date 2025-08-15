import axios from "axios";
import { createContext, useContext, useState } from "react";

const ListingContext = createContext();

const ListingProvider = ({ children }) => {

    const [listing, setListing] = useState({

        name : "",
        type : "",
        location: {
            public: false,
            address: "",
            gps: {lat: "", lng: ""},
            
            details: {
                apartment: "",
                building: "",
                street: "",
                ward: "",
                city: ""
            },
        },
        contacts: {
            zalo: null,
            facebook: null,
            instagram: null,
        },
        prices: {min: "240000", max: "680000"},
        features: [],
        images: []

    })

    const uploadName = (e) => {

        const name = e.target.value

        if (name.length <= 32) {
        setListing((prev) => ({
            ...prev,
            name: name,
        }));
        }
        
    };

    const uploadType = (type) => {
        setListing((prev) => ({
            ...prev,
            type: type,
        }));
    }

    const uploadImages = (files) => {

        if (!files || files.length === 0) return;
    
        if (files.length > 1) {

            const newImages = Array.from(files).map((file) => ({
                file,
                url: URL.createObjectURL(file),
            }));
    
            setListing((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages],
            }));
            
        } else {

            const file = files[0];

            const data = {
                file,
                url: URL.createObjectURL(file),
            };


            setListing((prev) => ({
                ...prev,
                images: [...prev.images, data],
            }));

        }
    };

    const removeImage = (index) => {

        setListing((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
        }));

    };

    const arrangeImage = (index) => {

        setListing((prev) => {
            const newImages = [...prev.images];
            const [selectedImage] = newImages.splice(index, 1); // Lấy ảnh ra
            newImages.unshift(selectedImage); // Đưa lên đầu
            return {
            ...prev,
            images: newImages,
            };
        });

    }

    const uploadFeatures = (name) => {
        setListing((prev) => {

            const newFeature = (prev.features ?? []).includes(name)
            ? (prev.features ?? []).filter((f) => f !== name)
            : [...(prev.features ?? []), name];
    
        return {
            ...prev,
                features: newFeature,
        };
        });
    };

    const uploadLocation = (formatted_address, geometry, details) => {

        setListing((prev) => ({
            ...prev,
            location: {
                ...prev.location,
                address: formatted_address,
                gps: {
                    lat: geometry.location.lat,
                    lng: geometry.location.lng
                },
                details: {
                    ...prev.location.details,
                    ...details
                }
            }
        }));

    };

    const editLocationDetails = (name, value) => {
        setListing((prev) => ({
            ...prev,
            location: {
                ...prev.location,
                details: {
                    ...prev.location.details,
                    [name]: value
                }
            }
        }))

    }

    const editLocationPublic = () => {
        setListing((prev) => ({
        ...prev,
        location: {
            ...prev.location,
            public: !prev.location.public // ✅ toggle inside location
        }
        }));
    };

    const uploadMinPrice = (price) => {
        setListing((prev) => ({
            ...prev, 
            prices: {
                ...prev.prices,
                min: price
            }
        }))
    }

    const uploadMaxPrice = (price) => {
        setListing((prev) => ({
            ...prev, 
            prices: {
                ...prev.prices,
                max: price
            }
        }))
    }

    const uploadContact = (name, value) => {
        setListing((prev) => ({
            ...prev,
            contacts: {
                ...prev.contacts,
                [name]: value
            }
        }))
    }

    const uploadListingOnDatabase = async (hostId) => {
        try {
          const formData = new FormData();
      
          // Append raw listing object (without file objects)
          const { images, ...listingWithoutFiles } = listing;
          formData.append("listing", JSON.stringify(listingWithoutFiles));
          formData.append("hostId", hostId);
      
          // Append files separately
          images.forEach(img => {
            if (img.file) formData.append("images", img.file);
          });
      
          await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/listing/create-new`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
      
          console.log("Listing created successfully");
        } catch (err) {
          console.error("Upload failed", err);
        }
    };

    const resetListing = () => {

        setListing({
            name : "",
            type : "",
            location: {
                public: false,
                address: "",
                gps: {lat: "", lng: ""},
                
                details: {
                    apartment: "",
                    building: "",
                    street: "",
                    ward: "",
                    city: ""
                },
            },
            contacts: {
                zalo: null,
                facebook: null,
                instagram: null,
            },
            prices: {min: "240000", max: "680000"},
            features: [],
            images: []
        })

    }


    return (
        <ListingContext.Provider
        value={{
            listing,
            uploadName,
            uploadType,
            uploadImages,
            removeImage,
            arrangeImage,
            uploadFeatures,
            uploadLocation,
            editLocationDetails,
            editLocationPublic,
            uploadMinPrice,
            uploadMaxPrice,
            uploadContact,
            uploadListingOnDatabase,
            resetListing
        }}
        >
        {children}
        </ListingContext.Provider>
    );
};

const useListing = () => useContext(ListingContext);

// eslint-disable-next-line react-refresh/only-export-components
export { ListingProvider, useListing };
