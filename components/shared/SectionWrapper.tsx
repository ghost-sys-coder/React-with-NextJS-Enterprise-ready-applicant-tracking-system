import React from 'react'

interface SectionWrapperProps {
    children: React.ReactNode;
    className: string;
    sectionId?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
    className, children, sectionId
}) => {
    return (
        <section className={`min-h-screen max-w-[1200px] mx-auto ${className}`} id={sectionId}>
            {children}
        </section>
    )
}

export default SectionWrapper;