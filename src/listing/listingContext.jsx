import { createContext, useContext, useState } from "react";
import { apiClient } from "../config/api";
import { logger } from "../utils/logger";
import { handleApiError } from "../utils/errorHandler";
import { processImages, filterDuplicates } from "../utils/imageProcessor";
import { LIMITS, MESSAGES, generateVerificationCode } from "../utils/constants";

const ListingContext = createContext();

const ListingProvider = ({ children }) => {

    const [listing, setListing] = useState({

        name: "",
        type: "",
        numberOfRoom: 1,
        location: {
            public: false,
            address: "",
            gps: { lat: "", lng: "" },
            details: {
                apartment: "",
                building: "",
                street: "",
                ward: "",
                city: ""
            },
        },
        contacts: {
            zalo: { url: null, verified: false, code: generateVerificationCode() },
            facebook: { url: null, verified: false, code: generateVerificationCode() },
            instagram: { url: null, verified: false, code: generateVerificationCode() },
        },
        prices: { min: '', max: '' },
        features: [],
        images: []

    })

    const uploadName = (e) => {

        const name = e.target.value

        if (name.length <= LIMITS.MAX_TITLE_LENGTH) {
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
            numberOfRoom: type === "house" ? null : (prev.numberOfRoom ?? 1)
        }));
    }

    const uploadNumberOfRoom = (number) => {

        setListing((prev) => ({
            ...prev,
            numberOfRoom: number,
        }));
    }

    const uploadImages = async (files) => {
        if (!files || files.length === 0) {
            logger.log('No files provided for upload');
            return;
        }

        try {
            const newImages = await processImages(files);

            setListing((prev) => {
                const uniqueImages = filterDuplicates(newImages, prev.images);

                if (uniqueImages.length === 0) {
                    logger.log('All images are duplicates, skipping upload');
                    return prev;
                }

                return {
                    ...prev,
                    images: [...prev.images, ...uniqueImages]
                };
            });
        } catch (error) {
            logger.error('Error uploading images:', error);
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

    const editLocationGPS = (center) => {
        setListing((prev) => ({
            ...prev,
            location: {
                ...prev.location,
                gps: { lat: center.lat, lng: center.lng },
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

        if (value === "") value = null;

        setListing((prev) => ({
            ...prev,
            contacts: {
                ...prev.contacts,
                [name]: {
                    ...prev.contacts[name],
                    url: value,
                },
            },
        }));


    };

    const uploadListingOnDatabase = async (user) => {
        logger.log('Uploading new staycation to database');

        try {
            const { images, ...listingWithoutFiles } = listing;

            // Validate image count
            if (images.length > LIMITS.MAX_IMAGES) {
                alert(MESSAGES.MAX_IMAGES_EXCEEDED);
                return;
            }

            const formData = new FormData();
            formData.append("listing", JSON.stringify(listingWithoutFiles));
            formData.append("hostId", user.id);
            formData.append("email", user.email);

            // Append image files
            images.forEach(img => {
                if (img.file) {
                    formData.append("images", img.file);
                }
            });

            const res = await apiClient.post(
                '/listing/create-new',
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            logger.log('Listing created successfully');
            return res.data;
        } catch (err) {
            handleApiError(err, 'Upload Listing');
            throw err;
        }
    };

    const resetListing = () => {

        setListing({
            name: "",
            type: "",
            numberOfRoom: null,
            location: {
                public: false,
                address: "",
                gps: { lat: "", lng: "" },

                details: {
                    apartment: "",
                    building: "",
                    street: "",
                    ward: "",
                    city: ""
                },
            },
            contacts: {
                zalo: { url: null, verified: false, code: generateVerificationCode() },
                facebook: { url: null, verified: false, code: generateVerificationCode() },
                instagram: { url: null, verified: false, code: generateVerificationCode() },
            },
            prices: { min: '', max: '' },
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
                uploadNumberOfRoom,
                uploadImages,
                removeImage,
                arrangeImage,
                uploadFeatures,
                uploadLocation,
                editLocationDetails,
                editLocationPublic,
                editLocationGPS,
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
