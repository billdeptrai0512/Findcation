import axios from "axios";
import { convertHEIC } from "../utils/convertHeic";
import { createContext, useContext, useState } from "react";

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
            zalo: { url: null, verified: false, code: Math.floor(100000 + Math.random() * 900000).toString() },
            facebook: { url: null, verified: false, code: Math.floor(100000 + Math.random() * 900000).toString() },
            instagram: { url: null, verified: false, code: Math.floor(100000 + Math.random() * 900000).toString() },
        },
        prices: { min: '', max: '' },
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
        if (!files || files.length === 0) return;

        const convertFile = async (file) => {

            const isHeic =
                file.type === "image/heic" ||
                file.name.toLowerCase().endsWith(".heic") ||
                file.name.toLowerCase().endsWith(".heif");

            if (isHeic) {
                try {
                    const blob = await convertHEIC(file);
                    return { file, url: URL.createObjectURL(blob) };
                } catch (err) {
                    console.warn("HEIC conversion failed, fallback to raw", err);
                }
            }
            return { file, url: URL.createObjectURL(file) };
        };

        if (files.length > 1) {
            const newImages = await Promise.all(Array.from(files).map(convertFile));
            setListing((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages],
            }));
        } else {
            const data = await convertFile(files[0]);
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
        console.log('upload new staycation to database')
        try {
            const formData = new FormData();

            // Append raw listing object (without file objects)
            const { images, ...listingWithoutFiles } = listing;
            formData.append("listing", JSON.stringify(listingWithoutFiles));
            formData.append("hostId", user.id);
            formData.append("email", user.email);

            // Append files separately
            if (images.length > 10) return alert("Tối đa 10 hình");
            images.forEach(img => {
                if (img.file)
                    console.log(img.file.size)
                formData.append("images", img.file);
            });

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/listing/create-new`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("Listing created successfully");

            return res.data;
        } catch (err) {
            console.error("Upload failed", err);
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
                zalo: { url: null, verified: false, code: Math.floor(100000 + Math.random() * 900000).toString() },
                facebook: { url: null, verified: false, code: Math.floor(100000 + Math.random() * 900000).toString() },
                instagram: { url: null, verified: false, code: Math.floor(100000 + Math.random() * 900000).toString() },
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
