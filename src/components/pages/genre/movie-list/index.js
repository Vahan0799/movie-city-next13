import React from 'react';
import MediaCard from '@/components/media-card';
import styles from './index.module.scss';

const Index = props => {
    const {results} = props;

    return (
        <section className={styles.listResults}>
            {results && results.map((item, index) =>
                <MediaCard
                    detailed
                    key={index}
                    media={item}
                    delay={index}
                />
            )}
        </section>
    )
}

export default Index;
