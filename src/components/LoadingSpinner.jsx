import { motion } from 'framer-motion';

export const LoadingSpinner = () => (
    <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(4px)'
    }}>
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{
                width: '3rem',
                height: '3rem',
                border: '4px solid #e5e7eb', // gray-200
                borderTopColor: '#000000', // t-black
                borderRadius: '50%'
            }}
        />
    </div>
);