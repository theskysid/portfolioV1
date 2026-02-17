import { motion } from 'framer-motion';
import '../styles/BentoGrid.css';

export const BentoGrid = ({ className, children }) => {
    return (
        <div className={`bento-grid ${className || ''}`}>
            {children}
        </div>
    );
};

export const BentoItem = ({ className, title, description, header, icon, children }) => {
    return (
        <motion.div
            className={`bento-item glass-panel ${className || ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
        >
            {header}
            <div className="bento-content">
                {icon && <div className="bento-icon">{icon}</div>}
                {title && <h3 className="bento-title">{title}</h3>}
                {description && <p className="bento-description">{description}</p>}
                {children}
            </div>
        </motion.div>
    );
};
